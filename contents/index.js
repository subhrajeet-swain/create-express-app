const app_js = `// Main application entry point
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

const index_js = `// Application start file
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

const git_ignore = `/vendor
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

const dotenv = `# Environment variables sample
PORT=8000
MONGODB_URI="mongodb://localhost:27017/"
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

STRIPE_SECRET_KEY=your_secret_key
`

const dbconfig_js = `// Database configuration
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
const dbindex_js = `// Configs index file
const { connectDB } = require("./db.config");
// const { stripe } = require("./stripe.config");

module.exports = {
    connectDB,
    // stripe
};`

const stripeconfig_js = `// exports.stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);`

const dbname_js = `// Define your DB names
exports.dbName = "your-database-name";`

const constant_index_js = `// Constants index file
const { dbName } = require("./dbName");

module.exports = {
    dbName
};`

const user_controller_js = `const { UserService } = require("../services");
const { asyncHandler } = require("../utils");
const { validateUserData } = require("../validators/index");

// Create a new user
exports.createUser = asyncHandler(async (req, res) => {
    const userDetails = req.body;
    // Validate here the req.body using a schema validator like ajv, joi or express validator
    validateUserData(userDetails);

    const newUser = await UserService.signup(userDetails);
    return res.status(201).json(
        new ApiResponse(200, newUser, "User registered Successfully")
    )
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res) => {
    const user = await UserService.getUser(req.params.id);
    return res.status(201).json(
        new ApiResponse(200, user, "User found Successfully")
    )

});

// Delete user by ID
exports.deleteUserById = asyncHandler(async (req, res) => {
    const deletedUser = await UserService.deleteUserById(req.params.id);
    return res.status(201).json(
        new ApiResponse(200, deletedUser, "User found Successfully")
    )
});
`

const controller_index_js = `// Controllers index file
const { createUser, getUserById, deleteUserById } = require("./user.controller");

module.exports = {
    createUser,
    getUserById,
    deleteUserById
}`

const cron_jobs_js = `// Cron jobs
// Cron jobs are scheduled tasks that run at specific intervals in the background, commonly used for maintenance or repetitive tasks.Users can schedule commands the OS will run these commands automatically according to the given time.It is usually used for system admin jobs such as backups, logging, sending newsletters, subscription emails and more.

// Creating a cron job which runs on specified time 10 am
// exports.scheduleCronJob = cron.schedule("00 10 * * *", function () {
//     console.log("running a task everyday at 10 am");
// });`

const jobs_index = `// Jobs index file
const { scheduleCronJob } = require("./cron.jobs");

// module.exports = {
//     scheduleCronJob
// };`

const config_loaders_js = `// Config loader
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

const loaders_index_js = `// Loaders index file
// loaders folder contains Lodash routes, configurations, and is responsible for validating configurations`

const auth_middleware_js = `// Authentication middleware
// exports.verifyToken = asyncHandler(async (req, _, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

//         // console.log(token);
//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }

//         req.user = user;
//         next()
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }

// })`

const multer_middleware_js = `// Multer middleware
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// exports.upload = multer({ storage });`

const middleware_index_js = `// Middlewares index file
//const { verifyToken } = require("./auth.middleware");
//const { upload } = require("./multer.middleware");

//module.exports = {
//    verifyToken,
//    upload
//}`

const model_seeders_js = `// Data seeders
`

const user_model_js = `const { Schema } = require("mongoose");
const { ApiError } = require("../utils/index");

const UserModel = new Schema({
    username: String,
    phone: String,
    email: String,
    address: String,
});

exports.existingUser = async (username, email) => {
    await UserModel.findOne({
        $or: [{ username }, { email }]
    });
    return true; // User with email or username already exists
}

exports.createUser = async (userDetails) => {
    const newUser = await UserModel.create(userDetails);
    return newUser;
}

exports.getUserById = async (id) => {
    const user = await UserModel.findById(id);
    return user;
}

exports.deleteUserById = async (id) => {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    return deletedUser;
}
`

const model_index_js = `// Models index file
const { createUser, deleteUserById, getUserById } = require("./user.model");

module.exports = {
    createUser,
    getUserById,
    deleteUserById,
};
`

const user_routes_js = `// User routes
const express = require("express");
const { createUser, getUserById, deleteUserById } = require("../controllers");

const router = new express.Router();

router
    .route("")
    .post(createUser);

router
    .route("/:id")
    .get(getUserById)
    .delete(deleteUserById);

module.exports = router;`

const routes_index_js = `// Routes index file
const userRoutes = require("./user.routes");

module.exports = {
    userRoutes
}`

const user_services_js = `const { createUser, getUserById, deleteUserById } = require("../models");

exports.UserService = {
    async signup(user) {
        const existingUser = await existingUser(user.username, user.email);

        if (existingUser) {
            throw new ApiError(400, "User with email or username already exists")
        }
        const userRecord = await createUser(user);
        return { user: userRecord };
    },

    async getUser(userId) {
        const user = await getUserById(userId);
        if (!user) {
            throw new ApiError(404, "User not found")
        }
        return user;
    },

    async deleteUserById(userId) {
        const deletedUser = await deleteUserById(userId);
        if (!deletedUser) {
            throw new ApiError(409, "User not found or already deleted")
        }
        return { message: "User deleted successfully" };
    }
}

`

const inventory_services_js = `// Inventory services
//Checking the inventory for some products or orders`

const services_index_js = `const { UserService } = require("./user.services");

// Services is used for any external services required, for example, contacting any third pary APIs, verifying inventory, payment sevices, ect.
module.exports = {
    UserService
}`

const utils_apiError_js = `//ApiError
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}`

const utils_apiResponse_js = `//Api response
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}`

const utils_asynchandler_js = `//Higher order functions
exports.asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((err) => {
                // Set the status code to indicate an error
                console.error(err);
                res.status(500).json({
                    success: false,
                    error: 'Internal server error',
                    message: err.message
                });
            });
    };
};`

const utils_generateToken_js = `//Generating tokens
// const jwt = require("jsonwebtoken");
// const { RefreshToken } = require("../models/RefreshTokenModel");

// exports.generateAccessToken = (userId) => {
//     const token = jwt.sign({
//         id: userId,
//     }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

//     return token;
// };


// // Function to generate refresh token
// exports.generateRefreshToken = async (userId) => {
//     try {
//         const refreshToken = jwt.sign({
//             id: userId
//         }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
//         await RefreshToken.findOneAndDelete({ userId: userId });
//         await new RefreshToken({ userId, refreshToken: refreshToken }).save();
//         return refreshToken;
//     } catch (error) {
//         console.error('Error generating refresh token:', error);
//         throw new Error('Unable to generate refresh token');
//     }
// };`

const utils_index_js = `// Utils index file
const { ApiError } = require("./apiError");
const { ApiResponse } = require("./apiResponse");
const { asyncHandler } = require("./asyncHandler");
const { generateAccessToken, generateRefreshToken } = require("./generateToken");

module.exports = {
    asyncHandler,
    generateAccessToken,
    generateRefreshToken,
    ApiResponse,
    ApiError
}`

const validators_user_js = `// User input validation
// const Ajv = require("ajv");
// const ajv = new Ajv();

// const userSchema = {
//     type: "object",
//     properties: {
//         username: { type: "string" },
//         phone: {
//             type: "string",
//             pattern: "^[0-9]{10}$" // Optional: Basic pattern for a 10-digit phone number
//         },
//         email: {
//             type: "string",
//             format: "email" // Using the built-in email format validation
//         },
//         address: { type: "string" }
//     },
//     required: ["username", "email"], // Specify required fields
//     additionalProperties: false // Disallow extra fields
// };

// const validateUser = ajv.compile(userSchema);

// // Validate user data
// exports.validateUserData = (data) => {
//     const valid = validateUser(data);
//     if (!valid) {
//         const errors = validateUser.errors.map(error => ({
//             field: error.instancePath,
//             message: error.message,
//         }));
//         throw new ApiError(400, "Validation Error", errors);
//     }
// };`

const validators_index_js = `// Validators index file
const { validateUserData } = require("./user.validator");

module.exports = {
    validateUserData
}`

module.exports = {
    app_js,
    index_js,
    git_ignore,
    dbconfig_js,
    dbindex_js,
    stripeconfig_js,
    dbname_js,
    constant_index_js,
    user_controller_js,
    controller_index_js,
    cron_jobs_js,
    jobs_index,
    config_loaders_js,
    loaders_index_js,
    auth_middleware_js,
    multer_middleware_js,
    middleware_index_js,
    model_seeders_js,
    user_model_js,
    model_index_js,
    user_routes_js,
    routes_index_js,
    user_services_js,
    inventory_services_js,
    services_index_js,
    utils_apiError_js,
    utils_apiResponse_js,
    utils_asynchandler_js,
    utils_generateToken_js,
    utils_index_js,
    validators_user_js,
    validators_index_js,
    dotenv,
}
