# LeetCode to GitHub Automator

A Chrome Extension (Manifest V3) that automatically detects when you submit a problem on LeetCode, checks if your solution was **Accepted**, and pushes your code directly to your GitHub repository for solved leetcode problems.

---

## Features

* **Automatic Detection**: Listens for submit button clicks and uses a `MutationObserver` to track the submission status in real-time.
* **Smart Filtering**: Ignores rejected solutions (`Wrong Answer`, `Time Limit Exceeded`, etc.) and only triggers on `Accepted` results.
* **Background Worker Processing**: Leverages Manifest V3 service workers (`chrome.runtime.sendMessage`) to safely communicate with external APIs without blocking the main browser thread.
* **GitHub Integration**: Automatically pushes your accepted solution and submission details to your designated GitHub repository.

---

## Directory Structure

```text
leetcode-github-extension/
├── manifest.json
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── content/
│   └── content.js          # Listens for clicks & monitors DOM with MutationObserver
├── background/
│   └── service_worker.js   # Handles GitHub API calls & background workflows
├── popup/
│   ├── popup.html          # UI for user settings (e.g., GitHub Token, Repo Name)
│   └── popup.js
└── README.md