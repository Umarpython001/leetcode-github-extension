# LeetCode to GitHub Automator 🚀

A Chrome Extension (Manifest V3) that automatically pushes your accepted LeetCode solutions to a GitHub repository. No more manual copying and pasting of your solutions—keep your GitHub activity streak alive effortlessly!

---

## 🎯 Project Goal

The goal of this project is to automate the process of archiving solved LeetCode problems. When a user submits a solution that is marked as **Accepted**, the extension automatically captures the code and pushes it as a `.md` file to a specified GitHub repository using the GitHub REST API.

## ✨ Features

* **Automatic Capture**: Seamlessly grabs the solution code once a problem is solved.
* **GitHub API Integration**: Uses the GitHub Contents API to create or update files in your repository.
* **UTF-8 Base64 Encoding**: Ensures that special characters in your code are correctly preserved when pushed to GitHub.
* **Background Processing**: Utilizes a Manifest V3 Service Worker to handle network requests without interrupting your LeetCode experience.
* **Developer-First Setup**: Simple configuration via a local environment file.

---

## 🛠️ Setup Instructions (Developer Mode)

Since this extension uses a private GitHub token, it is designed to be cloned and configured locally.

### Prerequisites
- **Node.js** installed on your machine.
- A **GitHub Personal Access Token (PAT)** with `repo` scope permissions.
- A GitHub repository created to store your solutions (e.g., `leetcode-problem-solutions`).

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   cd leetcode-github-extension
   ```

2. **Configure Your Secrets**
   Create a file named `.env` in the root directory and add your GitHub token:
   ```env
   TOKEN="your_github_personal_access_token_here"
   ```

3. **Sync Environment to Extension**
   Run the sync script to generate the configuration file that the browser can read:
   ```bash
   node sync_env.js
   ```
   *This creates `background/config.js` which contains your token.*

4. **Load the Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the `leetcode-github-extension` folder.

---

## 📂 Directory Structure

```text
leetcode-github-extension/
├── manifest.json            # Extension configuration
├── background/
│   ├── background_script.js # Service Worker: Handles GitHub API calls
│   └── config.js            # Generated: Stores your token (git-ignored)
├── scripts/
│   └── get_solved_question.js # Content script: Extracts solution from DOM
├── popup/
│   └── popup.html           # Extension popup UI
├── sync_env.js              # Node.js script to sync .env to config.js
└── .env                     # Local secrets (git-ignored)
```

## ⚠️ Security Note
Your GitHub token is stored in `background/config.js` after running the sync script. This file is added to `.gitignore` to ensure you never accidentally push your token to a public repository. **Never commit your `.env` or `config.js` files.**
