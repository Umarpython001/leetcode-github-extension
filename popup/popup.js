document.addEventListener("DOMContentLoaded", async () => {
  const { githubToken } = await chrome.storage.local.get("githubToken");

  if (githubToken) {
    // Already have a token — show the real UI
    // document.getElementById("description").textContent = githubToken //This line is for debugging purposes, you might want to remove it in production
    document.getElementById("mainView").style.display = "block";
  } else {
    // No token yet — show the one-time setup form
    document.getElementById("setupView").style.display = "block";
  }
});

document.getElementById("saveBtn")?.addEventListener("click", () => {
  const token = document.getElementById("tokenInput").value.trim();
  chrome.storage.local.set({ githubToken: token }, () => {
    // Switch views immediately after saving, no reload needed
    document.getElementById("setupView").style.display = "none";
    document.getElementById("mainView").style.display = "block";
  });
});

