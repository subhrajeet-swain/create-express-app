#!/usr/bin/env node

const { generateStructure } = require("../lib/generateFolders");

async function init() {
    console.log("Generating structure for a fresh Node.js project...");
    await generateStructure();
}

init();
