// background/service_worker.js

//importScripts() is a special built-in function specifically for Service Workers. It tells the browser: "Before you run the rest of this script, go find this other file and execute it first."
importScripts('config.js');
// Listen for messages from other parts of the extension (e.g., popup or content scripts)
chrome.runtime.onMessage.addListener((received)=>{

    // Check if the message is a request to push a solution to GitHub
    if (received.action == "PUSH_TO_GITHUB"){

        // Extract the solution code and the desired filename from the received message
        const file_content = received.solution_str;
        const file_name = received.file_name

        // Prepare the payload to be sent to the push handler
        const payload = {
            code: file_content,
            file_name: file_name
        }

        // Call the handleGitHubPush function to perform the API request
        handleGitHubPush(payload)
        .then(
            (message) => {
                // Log the successful response from the GitHub API
                console.log(message)
            }
        )
        .catch((error) => {
            // Log any errors that occurred during the push process
            console.log(error)
        })
    }
});

/**
 * Handles the asynchronous process of pushing a file to a GitHub repository
 * @param {Object} data - The payload containing code and filename
 */
async function handleGitHubPush(data){

    // Construct the GitHub API endpoint for the specific repo and file
    // Repository: umarpython001/leetcode-problem-solutions
    const url = `https://api.github.com/repos/${"umarpython001"}/${"leetcode-problem-solutions"}/contents/${data.file_name}.md`;

    // GitHub API requires file content to be Base64 encoded
    // We convert the UTF-8 string to Base64 to ensure correct encoding of special characters
    const base64Content = btoa(unescapedUtf8ToBase64(data.code));

    // Perform a PUT request to create or update the file in the repository
    // This is the core action that creates the file and adds the content
    const response = await fetch(url, {
        method: "PUT",
        headers: {
        "Authorization": `Bearer ${token}`, // Use the GitHub Personal Access Token for authentication
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
        message: commitMessage, // The commit message for the change
        content: base64Content   // The Base64 encoded content of the file
        })
    });

    // Parse the JSON response from the API
    const data = await response.json();
    // If the response is not successful (e.g., 404, 401), throw an error
    if (!response.ok) {
        throw new Error(data.message || "Failed to push to GitHub");
    }

    // Return the API response data on success
    return data
}

/**
 * Helper function to handle UTF-8 characters when encoding to Base64.
 * btoa() only supports Latin-1, so this ensures that special characters
 * (like emojis or symbols in code) are encoded correctly.
 */
function unescapedUtf8ToBase64(str) {
    return unescape(encodeURIComponent(str));
}