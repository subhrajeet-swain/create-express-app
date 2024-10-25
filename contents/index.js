const app_js = `
// Main application entry point
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//routes import
const { userRoutes } = require('./routes/index');
//routes declaration
app.use("/api/v1/user", userRoutes);

module.exports = {
    app
}`

const index_js = `
// Application start file
const dotenv = require("dotenv");
const { app } = require("./app.js");
const { connectDB } = require("./configs/db.config.js");
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log('⚙️ Server is running at port: ', port);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })`

const git_ignore = `
/vendor
/node_modules
/public/storage
Homestead.yaml
Homestead.json
.env
.logs.log
*.txt
error_log
.lock*
*.csv
.htaccess
.DS_Store
`

const dotenv = `
# Environment variables sample
PORT=8000
MONGODB_URI="mongodb://localhost:27017/"
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

STRIPE_SECRET_KEY=your_secret_key
`

const dbconfig_js = `
const mongoose = require('mongoose');
const { dbName } = require('../constants');

exports.connectDB = async () => {
    try {
        await mongoose.connect(\`\${process.env.MONGODB_URI}/\${dbName}\`, {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
`
const dbindex_js = `
const { connectDB } = require("./db.config");
// const { stripe } = require("./stripe.config");

module.exports = {
    connectDB,
    // stripe
};`

const stripeconfig_js = `// exports.stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);`

const dbname_js = `exports.dbName = "your-database-name";`

const constant_index_js = `
const { dbName } = require("./dbName");

module.exports = {
    dbName
};`

const user_controller_js = `
const { createUser, getUserById, deleteUserById } = require("../models");
const { asyncHandler } = require("../utils");
const { validateUserData } = require("../validators/index");

// Create a new user
exports.createUser = asyncHandler(async (req, res) => {
    const userDetails = req.body;
    // Validate here the req.body using a schema validator like ajv, joi or express validator
    validateUserData(userDetails);

    const newUser = await createUser(userDetails);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, newUser, "User registered Successfully")
    )
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);
    if (!newUser) {
        throw new ApiError(500, "Something went wrong while fetching the user")
    }
    return res.status(201).json(
        new ApiResponse(200, user, "User found Successfully")
    )

});

// Delete user by ID
exports.deleteUserById = asyncHandler(async (req, res) => {
    const deletedUser = await deleteUserById(req.params.id);
    if (!deletedUser) {
        throw new ApiError(500, "Something went wrong while fetching the user")
    }
    return res.status(201).json(
        new ApiResponse(200, user, "User found Successfully")
    )
});
`

const controller_index_js = `
const { createUser, getUserById, deleteUserById } = require("./user.controller");

module.exports = {
    createUser,
    getUserById,
    deleteUserById
}`

const cron_jobs_js = `
// Cron jobs are scheduled tasks that run at specific intervals in the background, commonly used for maintenance or repetitive tasks.Users can schedule commands the OS will run these commands automatically according to the given time.It is usually used for system admin jobs such as backups, logging, sending newsletters, subscription emails and more.

// Creating a cron job which runs on specified time 10 am
// exports.scheduleCronJob = cron.schedule("00 10 * * *", function () {
//     console.log("running a task everyday at 10 am");
// });`

const jobs_index = `
const { scheduleCronJob } = require("./cron.jobs");

// module.exports = {
//     scheduleCronJob
// };`

const config_loaders_js = `
// const _ = require('lodash');

// // Example configuration validation in a loader
// const config = {
//     port: process.env.PORT,
//     databaseUrl: process.env.MONGODB_URI,
// };

// function validateConfig(config) {
//     if (_.isEmpty(config.port)) {
//         throw new Error('PORT is required');
//     }
//     if (!_.isString(config.databaseUrl)) {
//         throw new Error('DATABASE_URL must be a string');
//     }
// }

// validateConfig(config);`

module.exports = {
    app_js,
    index_js,
    git_ignore,
    dotenv,
}