// Load settings when popup opens
document.addEventListener("DOMContentLoaded", async () => {
	await loadSettings();
	setupEventListeners();
	updateStatusIndicator();
});

let currentEnabled = true;
let currentTheme = "dark";

async function loadSettings() {
	try {
		const result = await chrome.storage.sync.get({
			enabled: true,
			theme: "dark",
		});
		currentEnabled = result.enabled;
		currentTheme = result.theme;

		// Update UI with loaded settings
		document.getElementById("enabled").checked = currentEnabled;
		document.getElementById("themeSelect").value = currentTheme;

		// Apply theme
		applyTheme(currentTheme);
	} catch (error) {
		console.error("Error loading settings:", error);
	}
}

function setupEventListeners() {
	// Main enable/disable toggle
	document.getElementById("enabled").addEventListener("change", async (e) => {
		currentEnabled = e.target.checked;
		await saveSettings();
		updateStatusIndicator();
	});

	// Theme selector
	document.getElementById("themeSelect").addEventListener("change", async (e) => {
		currentTheme = e.target.value;
		applyTheme(currentTheme);
		await saveSettings();
	});
}

function applyTheme(theme) {
	// Remove all theme classes
	document.body.classList.remove("dark", "light", "retro");

	// Apply new theme (dark is default, so only add class if not dark)
	if (theme !== "dark") {
		document.body.classList.add(theme);
	}
}

function updateStatusIndicator() {
	const statusIndicator = document.getElementById("statusIndicator");
	const statusText = document.getElementById("statusText");

	if (currentEnabled) {
		statusIndicator.className = "status enabled";
		statusText.textContent = "✅ Extension is Active";
	} else {
		statusIndicator.className = "status disabled";
		statusText.textContent = "⏸️ Extension is Disabled";
	}
}

async function saveSettings() {
	try {
		await chrome.storage.sync.set({
			enabled: currentEnabled,
			theme: currentTheme,
		});

		// Notify content scripts about settings change
		try {
			const tabs = await chrome.tabs.query({ url: "*://*.youtube.com/*" });
			for (const tab of tabs) {
				chrome.tabs
					.sendMessage(tab.id, {
						type: "TOGGLE_EXTENSION",
						enabled: currentEnabled,
					})
					.catch(() => {
						// Ignore errors - content script might not be injected yet
					});
			}
		} catch (error) {
			console.error("Error messaging tabs:", error);
		}
	} catch (error) {
		console.error("Error saving settings:", error);
	}
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
	// Space bar to toggle enable/disable
	if (e.code === "Space") {
		e.preventDefault();
		const enabledToggle = document.getElementById("enabled");
		enabledToggle.checked = !enabledToggle.checked;
		enabledToggle.dispatchEvent(new Event("change"));
	}
});
