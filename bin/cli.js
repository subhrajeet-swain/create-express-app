#!/usr/bin/env node

const { generateStructure } = require("../lib/generateFolders");
const { exec } = require("child_process");

async function init() {
    console.log("Generating structure for a fresh Node.js project...");

    await generateStructure();

    console.log("Installing dependencies: express, mongoose, dotenv...");

    // Run npm install command to install express, mongoose, and dotenv
    exec("npm install express mongoose dotenv", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing dependencies: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`npm install stderr: ${stderr}`);
            return;
        }
        console.log(stdout);
        console.log("Dependencies installed successfully!");
    });
}

init();
