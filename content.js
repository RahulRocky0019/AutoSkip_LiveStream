// Prevent multiple script executions using a more robust approach
(function () {
	"use strict";

	// Create a more specific identifier for this script instance
	const scriptId = "autoSkipLiveStream_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);

	// Check if extension is already running on this page
	if (window.autoSkipLiveStreamExtension && window.autoSkipLiveStreamActive) {
		// Silently skip if already running
		return;
	}

	// Mark this instance as active
	window.autoSkipLiveStreamExtension = scriptId;
	window.autoSkipLiveStreamActive = true;

	// Extension enabled state
	let extensionEnabled = true;
	let extensionContextValid = true;

	// Function to check if Chrome extension APIs are available
	function isExtensionContextValid() {
		try {
			return !!(chrome && chrome.runtime && chrome.runtime.id && chrome.storage);
		} catch (e) {
			return false;
		}
	}

	// Initial context validation
	if (!isExtensionContextValid()) {
		extensionContextValid = false;
		return;
	}

	// Load settings from storage with context validation
	async function loadSettings() {
		// Double-check context validity
		if (!extensionContextValid || !isExtensionContextValid()) {
			extensionContextValid = false;
			return;
		}

		try {
			const result = await chrome.storage.sync.get({ enabled: true });
			extensionEnabled = result.enabled;
			// Extension settings loaded successfully
		} catch (error) {
			if (error.message.includes("Extension context invalidated") || error.message.includes("Extension has been reloaded")) {
				extensionContextValid = false;
				// Silently handle context invalidation - this is expected behavior
				return;
			} else {
				console.error("Error loading settings:", error);
			}
		}
	}

	// Listen for settings updates from popup with context validation
	try {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			if (!extensionContextValid || !isExtensionContextValid()) {
				extensionContextValid = false;
				return;
			}

			if (message.type === "TOGGLE_EXTENSION") {
				extensionEnabled = message.enabled;
				// Extension toggle received
			}
		});
	} catch (error) {
		// Chrome API not available or context invalidated
		extensionContextValid = false;
	}

	// Optional: Filter out YouTube's internal CORS errors from console (cosmetic only)
	const originalError = console.error;
	console.error = function (...args) {
		const message = args.join(" ");
		if (
			!message.includes("googleads.g.doubleclick.net") &&
			!message.includes("CORS policy") &&
			!message.includes("pagead/viewthroughconversion")
		) {
			originalError.apply(console, args);
		}
	};

	let hasSkipped = false;
	let lastVideoId = "";

	function getCurrentVideoId() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get("v");
	}

	function isLiveStream() {
		// Primary method: Check for the live badge in the video player
		const liveBadge = document.querySelector(".ytp-live-badge");
		if (liveBadge && liveBadge.offsetParent !== null) {
			return true;
		}

		// Secondary method: Check the time display for "LIVE" text
		const timeDisplay = document.querySelector(".ytp-time-display");
		if (timeDisplay) {
			const timeText = timeDisplay.textContent.trim();
			// Only consider it live if it explicitly shows "LIVE" and not a duration
			if (timeText === "LIVE" || (timeText.includes("LIVE") && !timeText.includes(":"))) {
				return true;
			}
		}

		// Tertiary method: Check for live indicator in video info
		const liveIndicator = document.querySelector(".ytp-live");
		if (liveIndicator && window.getComputedStyle(liveIndicator).display !== "none") {
			return true;
		}

		// Check for "LIVE" text in the video title area (be more specific)
		const titleArea = document.querySelector("#info-contents, .watch-main-col");
		if (titleArea) {
			const liveBadgeInTitle = titleArea.querySelector("[class*='live'], [class*='LIVE']");
			if (liveBadgeInTitle && liveBadgeInTitle.textContent.includes("LIVE")) {
				return true;
			}
		}

		return false;
	}

	function skipToNextVideo() {
		// Try different selectors for the next button
		const nextSelectors = [".ytp-next-button", 'button[aria-label*="Next"]', '.ytp-button[aria-label*="Next"]', "a.ytp-next-button"];

		let nextButton = null;
		for (const selector of nextSelectors) {
			nextButton = document.querySelector(selector);
			if (nextButton && !nextButton.disabled) {
				break;
			}
		}

		if (nextButton && !nextButton.disabled) {
			nextButton.click();
			hasSkipped = true;

			// Set a timeout to reset the skip flag
			setTimeout(() => {
				hasSkipped = false;
			}, 5000);

			return true;
		} else {
			// Alternative: Try to find and click on a suggested video
			const suggestedVideo = document.querySelector('#related a[href*="/watch"]');
			if (suggestedVideo) {
				suggestedVideo.click();
				hasSkipped = true;
				setTimeout(() => {
					hasSkipped = false;
				}, 5000);
				return true;
			}

			// Last resort: Navigate to YouTube home
			window.location.href = "https://www.youtube.com";
			return true;
		}
	}

	function checkForLiveStream() {
		// Check if extension context is still valid
		if (!extensionContextValid) {
			return;
		}

		// Check if extension is enabled
		if (!extensionEnabled) {
			return;
		}

		const currentVideoId = getCurrentVideoId();

		// Only proceed if we have a valid video ID
		if (!currentVideoId) {
			return;
		}

		// Reset skip flag if we're on a new video
		if (currentVideoId !== lastVideoId) {
			hasSkipped = false;
			lastVideoId = currentVideoId;
		}

		// Don't check if we've already skipped this video
		if (hasSkipped) {
			return;
		}

		// More relaxed player readiness check for faster detection
		const player = document.querySelector("#movie_player, .html5-video-player");

		if (!player) {
			return;
		}

		if (isLiveStream()) {
			skipToNextVideo();
		}
	}

	// Wait for page to load before starting checks - optimized for speed
	async function initializeExtension() {
		// Load settings first
		await loadSettings();

		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", () => {
				setTimeout(() => {
					setInterval(checkForLiveStream, 1500); // Faster checking - every 1.5 seconds
				}, 2000); // Reduced initial delay to 2 seconds
			});
		} else {
			setTimeout(() => {
				setInterval(checkForLiveStream, 1500); // Faster checking - every 1.5 seconds
			}, 2000); // Reduced initial delay to 2 seconds
		}
	}

	// Initialize the extension
	initializeExtension();

	// Enhanced navigation detection for YouTube's SPA behavior and browser navigation - optimized
	let currentUrl = window.location.href;
	let urlCheckInterval = setInterval(() => {
		if (!extensionContextValid) {
			clearInterval(urlCheckInterval);
			return;
		}

		const newUrl = window.location.href;
		if (newUrl !== currentUrl) {
			currentUrl = newUrl;

			// Reset state for new video
			hasSkipped = false;
			lastVideoId = "";

			// Force reload settings in case they changed (with context validation)
			loadSettings();

			// Immediate check for faster response
			setTimeout(() => {
				checkForLiveStream();
			}, 800); // Faster initial check

			// Follow-up check for reliability
			setTimeout(() => {
				checkForLiveStream();
			}, 2000);
		}
	}, 300); // More frequent URL checking for faster detection

	// Also listen for browser navigation events (back/forward buttons) - optimized
	window.addEventListener("popstate", function (event) {
		if (!extensionContextValid) return;

		// Reset state
		hasSkipped = false;
		lastVideoId = "";

		// Force reload settings
		loadSettings();

		// Multiple checks for faster and more reliable detection
		setTimeout(() => {
			checkForLiveStream();
		}, 1000); // Fast initial check

		setTimeout(() => {
			checkForLiveStream();
		}, 3000); // Reliable follow-up check
	});

	// Listen for YouTube's custom navigation events - optimized
	document.addEventListener("yt-navigate-finish", function (event) {
		if (!extensionContextValid) return;

		// Reset state
		hasSkipped = false;
		lastVideoId = "";

		// Fast initial check
		setTimeout(() => {
			checkForLiveStream();
		}, 500); // Very fast for YouTube's internal navigation

		// Follow-up check
		setTimeout(() => {
			checkForLiveStream();
		}, 1500);
	});

	// Cleanup function for when leaving the page - enhanced
	window.addEventListener("beforeunload", function () {
		extensionContextValid = false;
		if (urlCheckInterval) {
			clearInterval(urlCheckInterval);
		}
		window.autoSkipLiveStreamActive = false;
	});

	// Also cleanup if the page becomes hidden (navigating away) - enhanced
	document.addEventListener("visibilitychange", function () {
		if (document.hidden) {
			// Page is being hidden, might be navigating away
			setTimeout(() => {
				if (document.hidden) {
					extensionContextValid = false;
					window.autoSkipLiveStreamActive = false;
				}
			}, 5000); // Give some time in case user comes back quickly
		}
	});

	// Listen for extension context invalidation
	try {
		if (typeof chrome !== "undefined" && chrome.runtime && isExtensionContextValid()) {
			chrome.runtime.onConnect.addListener(() => {
				// Extension context is being renewed
				extensionContextValid = true;
			});
		}
	} catch (error) {
		// Silently handle any Chrome API errors
		extensionContextValid = false;
	}
})(); // Close the IIFE
