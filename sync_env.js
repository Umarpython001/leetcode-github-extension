// Import the built-in 'fs' (File System) module to allow reading and writing files on the disk
const fs = require('fs');
// Import the built-in 'path' module to handle and transform file paths across different operating systems (Windows vs Mac/Linux)
const path = require('path');

// __dirname is a special Node.js variable that gives the absolute path to the directory where this script is located.
// path.join() combines these parts into a single valid path: "C:\Users\...\.env"
const envPath = path.join(__dirname, '.env');

// This creates the path to the target file where we will store the token for the browser extension to use.
// It points to the 'background' folder and creates a file named 'config.js'.
const configPath = path.join(__dirname, 'background', 'config.js');

// We use a try...catch block to handle any errors (like the .env file being missing) without crashing the script.
try {
    // fs.readFileSync() reads the entire content of the .env file.
    // 'utf8' tells Node.js to read the file as a text string rather than raw binary data.
    const envContent = fs.readFileSync(envPath, 'utf8');

    // This is a Regular Expression (Regex) used to find the TOKEN in the text.
    // It looks for the exact text 'TOKEN="' followed by any characters (.+), ending with another quote '"'.
    // The parentheses (.+) create a "capturing group" so we can extract just the value inside the quotes.
    const tokenMatch = envContent.match(/TOKEN="(.+)"/);

    // If tokenMatch is null, it means the regex didn't find a line that looks like TOKEN="something"
    if (!tokenMatch) {
        // We "throw" an error to jump straight to the 'catch' block below
        throw new Error("TOKEN not found in .env file");
    }

    // tokenMatch[0] is the whole matched string (e.g., 'TOKEN="my_secret_token"')
    // tokenMatch[1] is just the first capturing group (e.g., 'my_secret_token')
    const token = tokenMatch[1];

    // We create a string that looks like valid JavaScript code.
    // This string will be written into the config.js file.
    // We use backticks (`) for a template literal so we can easily include the token variable.
    const configContent = `// Generated file - do not edit manually
const token = "${token}";
const commitMessage = "Push solution from LeetCode Extension";
`;

    // fs.writeFileSync() creates the config.js file (or overwrites it if it already exists)
    // with the JavaScript code we just created in configContent.
    fs.writeFileSync(configPath, configContent);

    // Let the user know that the process finished successfully.
    console.log("Successfully synced .env to background/config.js");
} catch (error) {
    // If any line inside the 'try' block failed, the script jumps here.
    // We print the specific error message so the user knows why it failed (e.g., "File not found").
    console.error("Error syncing env:", error.message);
}
