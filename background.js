// Keep track of injected tabs with more detailed information
const tabStates = new Map();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const currentState = tabStates.get(tabId) || {};

	// Handle navigation away from YouTube
	if (changeInfo.url && !changeInfo.url.includes("youtube.com/watch")) {
		tabStates.delete(tabId);
		return;
	}

	// Handle YouTube video page loading - inject on URL change or when page completes loading
	if (tab.url && tab.url.includes("youtube.com/watch")) {
		const shouldInject =
			changeInfo.status === "complete" || // Page fully loaded
			(changeInfo.url && changeInfo.url.includes("youtube.com/watch")) || // URL changed to YouTube watch page
			changeInfo.status === "loading"; // Also try on loading status for faster injection

		// Check if this is a new navigation (URL changed or first time)
		const isNewNavigation = !currentState.lastUrl || currentState.lastUrl !== tab.url;

		if (shouldInject && (isNewNavigation || !currentState.injected)) {
			// Update state
			tabStates.set(tabId, {
				lastUrl: tab.url,
				injected: true,
				lastInjectionTime: Date.now(),
			});

			// Add a small delay to ensure page is ready for script injection
			setTimeout(() => {
				chrome.scripting
					.executeScript({
						target: { tabId: tabId },
						files: ["content.js"],
					})
					.catch((error) => {
						// Reset state on failure
						tabStates.delete(tabId);
					});
			}, 200);
		} else if (shouldInject) {
			// Update URL even if not injecting
			tabStates.set(tabId, {
				...currentState,
				lastUrl: tab.url,
			});
		}
	}
});

// Clean up tracking when tabs are removed
chrome.tabs.onRemoved.addListener((tabId) => {
	tabStates.delete(tabId);
});

// Handle extension startup - inject into existing YouTube tabs
chrome.runtime.onStartup.addListener(() => {
	chrome.tabs.query({ url: "*://*.youtube.com/watch*" }, (tabs) => {
		tabs.forEach((tab) => {
			if (tab.id && !tabStates.has(tab.id)) {
				tabStates.set(tab.id, {
					lastUrl: tab.url,
					injected: true,
					lastInjectionTime: Date.now(),
				});

				chrome.scripting
					.executeScript({
						target: { tabId: tab.id },
						files: ["content.js"],
					})
					.catch((error) => {
						tabStates.delete(tab.id);
					});
			}
		});
	});
});

// Handle browser action (extension icon) clicks to ensure injection
chrome.action.onClicked.addListener((tab) => {
	if (tab.url && tab.url.includes("youtube.com/watch")) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["content.js"],
		});
	}
});
