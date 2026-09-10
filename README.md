# LeetCode to GitHub Automator 🚀

Automatically archive your LeetCode triumphs! This Chrome extension detects when you solve a problem and have it **Accepted**, then instantly pushes your solution to a GitHub repository as a beautifully formatted Markdown file. 

Stop manual copying and pasting. Keep your GitHub activity streak alive and your solutions organized effortlessly.

---

## Features

- **Zero-Effort Archiving**: Automatically triggers the push only when your submission is "Accepted".
- **Secure Token Management**: Configure your GitHub Personal Access Token directly through the extension popup—no need to mess with `.env` files or scripts.
- **Smart Formatting**: Your solutions are pushed as `.md` files, including the problem name and code blocks for better readability on GitHub.
- **UTF-8 Support**: Handles special characters and symbols in your code perfectly using Base64 encoding.
- **Background Processing**: Powered by a Manifest V3 Service Worker, ensuring your LeetCode experience remains fast and uninterrupted.

---

## Installation & Setup

Since this is a custom extension, you'll need to load it in Developer Mode.

### 1. Load the Extension
1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top right corner.
4. Click **Load unpacked** and select the `leetcode-github-extension` folder.

### 2. Configure GitHub Access
1. Create a **GitHub Personal Access Token (PAT)**:
   - Go to GitHub $\rightarrow$ Settings $\rightarrow$ Developer Settings $\rightarrow$ Personal Access Tokens $\rightarrow$ Tokens (classic).
   - Grant the `repo` scope (this allows the extension to create/update files in your repositories).
2. Click the extension icon in your browser toolbar.
3. Paste your token into the setup field and click **Save**.

### 3. Start Solving!
- Solve a problem on LeetCode.
- Click **Submit**.
- Once you see the **"Accepted"** status, the extension will automatically push the solution to your repository.

---

## How It Works

The extension operates through a three-part architecture:

1. **Content Script (`scripts/get_solved_question.js`)**: 
   - Monitors the LeetCode DOM for the "Submit" button.
   - Waits for the "Accepted" submission result.
   - Extracts the problem title and the code you wrote.
   - Sends a message to the background worker.

2. **Background Service Worker (`background/background_script.js`)**:
   - Listens for push requests.
   - Retrieves your stored GitHub token from `chrome.storage.local`.
   - Encodes the content to Base64.
   - Communicates with the GitHub REST API to create or update the file in your repo.

3. **Popup UI (`popup/popup.js`)**:
   - Provides a simple interface to set and update your GitHub authentication token.

---

## Repository Structure

```text
leetcode-github-extension/
├── manifest.json            # Extension manifest (V3)
├── background/
│   └── background_script.js # Service Worker: Handles GitHub API integration
├── scripts/
│   └── get_solved_question.js # Content script: DOM extraction logic
└── popup/
    ├── popup.html           # Setup UI
    ├── popup.js             # Token storage logic
    └── popup.css            # Styling
```

---

## Important Notes

- **DOM Dependencies**: This extension relies on LeetCode's current HTML structure. If LeetCode updates their website layout, the content script may need updates to locate the submit button or result status.
- **Security**: Your token is stored in `chrome.storage.local`, which is private to your browser profile. Never share your token with anyone.

---

**Happy Coding! 💻**
