# Auto Skip Live Stream

![Extension Icon](icons/icon128.png)

**Professional Chrome Extension for YouTube Live Stream Management**

_Automatically detects and skips YouTube live streams, seamlessly continuing your video queue for an uninterrupted viewing experience._

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Available-4285F4?style=flat&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/auto-skip-live-stream/[EXTENSION_ID])
[![Version](https://img.shields.io/badge/Version-1.0.0-2ea44f?style=flat)](https://github.com/RahulRocky0019/AutoSkip_LiveStream/releases)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat)](LICENSE.md)

---

## 🎨 User Interface Preview

**Three professionally designed themes to enhance your experience:**

<table>
<tr>
<td width="33%" align="center">
<strong>Dark Theme (Default)</strong><br>
<sub>Modern • Professional • Eye-comfortable</sub><br><br>
<img src="images/Screenshot%201%20-%201280_800.png" alt="Dark Theme Interface" width="280"/>
</td>
<td width="33%" align="center">
<strong>Light Theme</strong><br>
<sub>Clean • Minimalist • Accessible</sub><br><br>
<img src="images/Screenshot%202%20-%201280_800.png" alt="Light Theme Interface" width="280"/>
</td>
<td width="33%" align="center">
<strong>Retro Theme</strong><br>
<sub>Terminal-inspired • Unique • Stylized</sub><br><br>
<img src="images/Screenshot%203%20-%201280_800.png" alt="Retro Theme Interface" width="280"/>
</td>
</tr>
</table>

## ✨ Key Features

-   **🎯 Intelligent Live Stream Detection**: Advanced multi-method detection system for reliable identification
-   **⚡ Smart Navigation Engine**: Utilizes YouTube's native navigation with intelligent fallback mechanisms
-   **🎮 One-Click Control**: Intuitive toggle switch with instant enable/disable functionality
-   **🎨 Professional Theming**: Three carefully crafted themes for optimal user experience
-   **🚀 Performance Optimized**: Lightweight architecture with minimal system resource usage
-   **🌐 Browser Integration**: Seamless compatibility with Chrome navigation and YouTube's SPA architecture

## 📦 Installation & Setup

### 🌟 Chrome Web Store (Recommended)

<div align="center">

[![Install from Chrome Web Store](https://img.shields.io/badge/Install%20Now-Chrome%20Web%20Store-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://chrome.google.com/webstore/detail/auto-skip-live-stream/[EXTENSION_ID])

**One-click installation with automatic updates**

</div>

_Note: Please replace the placeholder URL with your actual Chrome Web Store listing once published_

### 🛠️ Development Installation

For developers or advanced users who prefer manual installation:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/RahulRocky0019/AutoSkip_LiveStream.git
    cd AutoSkip_LiveStream
    ```

2. **Access Chrome Extensions**

    - Navigate to `chrome://extensions/` in your Chrome browser

3. **Enable Developer Mode**

    - Toggle the "Developer mode" switch in the top-right corner

4. **Load Extension**

    - Click "Load unpacked" and select the cloned extension directory

5. **Verification**
    - The extension icon should appear in your Chrome toolbar

## 🚀 Usage Guide

### Quick Start

1. **YouTube Navigation**: Browse to any YouTube video page
2. **Automatic Monitoring**: Extension begins live stream detection immediately
3. **Manual Control**: Access settings via the extension icon for customization
4. **Seamless Experience**: Live streams are automatically bypassed to maintain viewing flow

### Configuration Options

| Setting              | Description                    | Options              |
| -------------------- | ------------------------------ | -------------------- |
| **Extension Status** | Toggle functionality on/off    | Enabled / Disabled   |
| **Theme Selection**  | Customize interface appearance | Dark / Light / Retro |

#### Theme Specifications

-   **Dark Theme**: Modern interface optimized for reduced eye strain
-   **Light Theme**: Clean, accessible design for bright environments
-   **Retro Theme**: Terminal-inspired aesthetic with unique visual effects

## 🔧 Technical Architecture

### Detection Methodology

The extension employs a comprehensive multi-layer detection system:

| Detection Layer       | Target Elements    | Implementation            |
| --------------------- | ------------------ | ------------------------- |
| **Player Interface**  | Live status badges | DOM element analysis      |
| **Temporal Display**  | Time indicators    | Text pattern matching     |
| **Metadata Analysis** | Video information  | Content classification    |
| **Title Recognition** | Video titles       | Live badge identification |

### Navigation Strategy

Upon live stream detection, the system executes a prioritized navigation sequence:

```
Live Stream Detected
        ↓
   Search for Next Button
        ↓
   [Found] → Click Next Button → Success
        ↓
   [Not Found] → Analyze Suggested Videos
        ↓
   [Found] → Navigate to Suggestion → Success
        ↓
   [Not Found] → Fallback to YouTube Home → Success
```

## 🔒 Privacy & Security

### Privacy Commitment

| Aspect              | Implementation                          | Verification                        |
| ------------------- | --------------------------------------- | ----------------------------------- |
| **Data Collection** | Zero user data collected or transmitted | [Privacy Policy](PRIVACY_POLICY.md) |
| **Storage Model**   | Local Chrome storage exclusively        | Source code review                  |
| **Domain Access**   | Restricted to YouTube.com only          | Manifest permissions                |
| **Transparency**    | Open source codebase                    | Public repository                   |
| **Compliance**      | Chrome Web Store privacy standards      | Official documentation              |

## 📁 Files Included

**Core Extension Files:**

-   `manifest.json` - Extension configuration
-   `background.js` - Service worker for extension management
-   `content.js` - Main logic for live stream detection
-   `popup.html` & `popup.js` - Extension popup interface
-   `icons/` - Extension icons (16px, 48px, 128px)

**Documentation:**

-   `README.md` - This file with complete documentation
-   `PRIVACY_POLICY.md` - Chrome Web Store compliant privacy policy
-   `LICENSE.md` - MIT license for open source distribution

**Preview Assets:**

-   `Screenshot 1-3.png` - Theme screenshots (1280×800)
-   `Small promo tile.png` - Chrome Web Store promotional tile (440×280)
-   `Marquee promo tile.png` - Chrome Web Store marquee tile (1400×560)
-   `icon_v1` files - High resolution extension icons

## ⚙️ Technical Specifications

| Specification        | Details                         | Benefits                        |
| -------------------- | ------------------------------- | ------------------------------- |
| **Manifest Version** | 3.0 (Latest Standard)           | Enhanced security & performance |
| **Permission Model** | Minimal required access         | Improved user privacy           |
| **Architecture**     | Service Worker + Content Script | Modern, efficient design        |
| **Performance**      | Lightweight footprint           | Minimal system impact           |
| **Compatibility**    | Chrome Extensions API           | Stable, long-term support       |

## 🆘 Support & Troubleshooting

### Common Solutions

| Issue                    | Resolution                  | Additional Notes             |
| ------------------------ | --------------------------- | ---------------------------- |
| Extension not responding | Refresh YouTube page        | Resolves temporary conflicts |
| Settings not persisting  | Toggle extension off/on     | Reinitializes storage        |
| Interface not appearing  | Check for extension updates | Ensures latest compatibility |

**Get Help:**

-   [Report Issues on GitHub](https://github.com/RahulRocky0019/AutoSkip_LiveStream/issues)
-   [Email Support](mailto:rahul.rocky0019@gmail.com)
-   [Rate on Chrome Web Store](https://chrome.google.com/webstore/detail/auto-skip-live-stream/[EXTENSION_ID])

## 🤝 Contributing

This is an open-source project! Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📅 Version History

-   **v1.0.0** (July 2025):
    -   Initial release with core functionality
    -   Three customizable themes (Dark, Light, Retro)
    -   Smart live stream detection
    -   Chrome Web Store ready with all compliance documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

**⭐ Star this repository if you find it useful!**

Made with ❤️ for a better YouTube experience

[Privacy Policy](PRIVACY_POLICY.md) | [Chrome Web Store](https://chrome.google.com/webstore/detail/auto-skip-live-stream/[EXTENSION_ID]) | [Report Issues](https://github.com/RahulRocky0019/AutoSkip_LiveStream/issues)
