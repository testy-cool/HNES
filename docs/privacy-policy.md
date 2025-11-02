# Privacy Policy

Hacker News Enhancement Suite (HNES) operates entirely on your device. The extension never transmits, sells, or shares any user data with third parties.

## Data Collection and Usage
- The extension stores comment metadata, inline reply states, user tags, and similar preferences in Chrome’s extension storage (`chrome.storage.local`).
- This information exists solely to power read-status indicators, tagging, and other interface features while you browse news.ycombinator.com and related mirrors.
- No analytics, telemetry, or external network requests are performed beyond normal Hacker News traffic initiated by you.

## Data Sharing
- HNES does not transfer any data off your device.
- HNES does not interact with advertising networks or third-party services.

## Data Retention and Removal
- All stored data is kept locally until you clear it.
- To remove data, either:
  - uninstall the extension via `chrome://extensions`, or
  - open `chrome://extensions`, click “Details” on HNES, choose “Site access” → “Clear data,” and confirm.

## Permissions
HNES requests host permissions for Hacker News domains (`news.ycombinator.com`, `.net`, `.org`, `hackerne.ws`, and `hckrnews.com`) so it can restyle pages and surface inline features. It also requests the `storage` and `unlimitedStorage` permissions to keep user tags and unread indicators available for heavy readers without hitting Chrome’s quota.

## Contact
For questions or concerns, open an issue on the project repository at https://github.com/<your-username>/HNES.
