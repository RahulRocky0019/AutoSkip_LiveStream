# Auto Skip Live Stream

A Chrome extension that automatically detects and skips YouTube live streams, taking you to the next video in your playlist or queue.

## Features

-   ✅ **Automatic Live Stream Detection**: Detects multiple types of live content indicators
-   ✅ **Smart Navigation**: Uses YouTube's next button, suggested videos, or fallback options
-   ✅ **Easy Toggle**: Simple on/off switch in the popup
-   ✅ **Theme Customization**: Choose from Dark, Light, or Retro themes
-   ✅ **Fast Performance**: Optimized for quick detection and minimal resource usage
-   ✅ **Browser Navigation Support**: Works with back/forward buttons and YouTube's internal navigation

## Installation

### From Chrome Web Store (Recommended)

_[Coming Soon]_

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your browser toolbar

## How to Use

1. **Navigate to YouTube**: Go to any YouTube video page
2. **Extension Auto-Starts**: The extension automatically monitors for live streams
3. **Toggle if Needed**: Click the extension icon to enable/disable or change themes
4. **Enjoy**: Live streams will be automatically skipped to the next video

## Settings

-   **Enable/Disable**: Toggle the extension on/off
-   **Theme Selection**: Choose between:
    -   **Dark**: Modern dark theme (default)
    -   **Light**: Clean light theme
    -   **Retro**: Terminal-style green theme with special effects

## How It Works

The extension uses multiple detection methods to identify live streams:

-   Live badges in the video player
-   "LIVE" text in time display
-   Live indicators in video information
-   Live badges in video title areas

When a live stream is detected, it will:

1. Try to click the "Next" button
2. Fall back to suggested videos if no next button
3. Navigate to YouTube home as last resort

## Privacy

-   **No Data Collection**: The extension doesn't collect or transmit any user data
-   **Local Storage Only**: Settings are stored locally using Chrome's sync storage
-   **YouTube Only**: The extension only works on YouTube.com domains

## Technical Details

-   **Manifest Version**: 3 (Latest Chrome extension standard)
-   **Permissions**: Only accesses YouTube pages and Chrome storage
-   **Performance**: Lightweight with minimal memory footprint
-   **Compatibility**: Works with Chrome's navigation and YouTube's single-page app architecture

## Support

If you encounter any issues:

1. Try refreshing the YouTube page
2. Toggle the extension off and on
3. Check if the extension needs to be updated

## Version History

-   **v1.0.0**: Initial release with core functionality and theme system

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for a better YouTube experience
