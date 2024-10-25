const fs = require('fs-extra');
const path = require('path');
const { app_js, index_js, git_ignore, dotenv, dbconfig_js, dbindex_js, dbname_js, constant_index_js, user_controller_js, controller_index_js, cron_jobs_js, jobs_index, config_loaders_js, loaders_index_js, multer_middleware_js, auth_middleware_js, middleware_index_js, model_seeders_js, user_model_js, model_index_js, user_routes_js, routes_index_js, stripe_services_js, inventory_services_js, services_index_js, utils_apiError_js, utils_apiResponse_js, utils_asynchandler_js, utils_generateToken_js, utils_index_js, validators_user_js, validators_index_js, user_services_js } = require("../contents");

// Function to create the required folder structure
async function generateStructure() {
    console.log("Generating file structure...");

    const projectDir = process.cwd();  // Current working directory

    const readmeFile = `## Project Structure
    public / temp                  # Contains static assets like images
    src /                          # Main source code directory.

| --config /                   # Configuration - related files libe db and payment configurations.
| --constants /                # Constants like db name and other fixed constraints.
| --controllers /              # Contains individual controllers.Handles incoming requests and generates responses.
    | --user.controller.js     # Controls user - related requests.
| --docs /                     # Swagger documentation for API endpoints.
| --jobs /                     # Background jobs or scheduled tasks.
| --middlewares /              # Custom Express middlewares.
| --loaders /                  # Lodash routes and configurations; also validates configurations.
| --models /                   # Database models; ORM files for the data layer.
   | --seeders /               # MongoDB custom seeders.
| --routes /                   # Defines API routes.
| --services /                 # Contains business logic and service functions
| --utils /                    # Utility classes and functions.
   | --ApiError.js /           # API error class.
   | --ApiResponse.js /        # API response class.
   | --asyncHandler.js /       # Higher order function to wrap asynchronous functions and handle potential errors gracefully
   | --generateToken.js /      # Access and refresh tokens.
| --validators /               # Schema validation functions like Joi / AJV.
| --app.js                     # Express app setup.
| --server.js                  # Entry point for the application.`

    // Define the new folders and subfolders
    const folders = [
        'public/temp',
        'src/configs',
        'src/constants',
        'src/controllers',
        'src/docs',
        'src/jobs',
        'src/loaders',
        'src/middlewares',
        'src/models',
        'src/routes',
        'src/services',
        'src/utils',
        'src/validators'
    ];

    // Define the initial files to be created
    const files = {
        [path.join(projectDir, 'src', 'configs', 'db.config.js')]: `${dbconfig_js}`,
        [path.join(projectDir, 'src', 'configs', 'index.js')]: `${dbindex_js}`,
        [path.join(projectDir, 'src', 'constants', 'dbName.js')]: `${dbname_js}`,
        [path.join(projectDir, 'src', 'constants', 'index.js')]: `${constant_index_js}`,
        [path.join(projectDir, 'src', 'controllers', 'user.controller.js')]: `${user_controller_js}`,
        [path.join(projectDir, 'src', 'controllers', 'index.js')]: `${controller_index_js}`,
        [path.join(projectDir, 'src', 'docs', 'swagger.docs.js')]: `// Swagger docs`,
        [path.join(projectDir, 'src', 'docs', 'index.js')]: `// Docs index file`,
        [path.join(projectDir, 'src', 'jobs', 'cron.jobs.js')]: `${cron_jobs_js}`,
        [path.join(projectDir, 'src', 'jobs', 'index.js')]: `${jobs_index}`,
        [path.join(projectDir, 'src', 'loaders', 'config.loader.js')]: `${config_loaders_js}`,
        [path.join(projectDir, 'src', 'loaders', 'index.js')]: `${loaders_index_js}`,
        [path.join(projectDir, 'src', 'middlewares', 'auth.middleware.js')]: `${auth_middleware_js}`,
        [path.join(projectDir, 'src', 'middlewares', 'multer.middleware.js')]: `${multer_middleware_js}`,
        [path.join(projectDir, 'src', 'middlewares', 'index.js')]: `${middleware_index_js}`,
        [path.join(projectDir, 'src', 'models', 'user.model.js')]: `${user_model_js}`,
        [path.join(projectDir, 'src', 'models', 'seeders.js')]: `${model_seeders_js}`,
        [path.join(projectDir, 'src', 'models', 'index.js')]: `${model_index_js}`,
        [path.join(projectDir, 'src', 'routes', 'user.routes.js')]: `${user_routes_js}`,
        [path.join(projectDir, 'src', 'routes', 'index.js')]: `${routes_index_js}`,
        [path.join(projectDir, 'src', 'services', 'inventory.services.js')]: `${inventory_services_js}`,
        [path.join(projectDir, 'src', 'services', 'user.services.js')]: `${user_services_js}`,
        [path.join(projectDir, 'src', 'services', 'index.js')]: `${services_index_js}`,
        [path.join(projectDir, 'src', 'utils', 'ApiError.js')]: `${utils_apiError_js}`,
        [path.join(projectDir, 'src', 'utils', 'ApiResponse.js')]: `${utils_apiResponse_js}`,
        [path.join(projectDir, 'src', 'utils', 'asyncHandler.js')]: `${utils_asynchandler_js}`,
        [path.join(projectDir, 'src', 'utils', 'generateToken.js')]: `${utils_generateToken_js}`,
        [path.join(projectDir, 'src', 'utils', 'index.js')]: `${utils_index_js}`,
        [path.join(projectDir, 'src', 'validators', 'user.validator.js')]: `${validators_user_js}`,
        [path.join(projectDir, 'src', 'validators', 'index.js')]: `${validators_index_js}`,
        [path.join(projectDir, 'src', 'app.js')]: `${app_js}`,
        [path.join(projectDir, 'src', 'index.js')]: `${index_js}`,
        [path.join(projectDir, '.env')]: `${dotenv}`,
        [path.join(projectDir, '.gitignore')]: `${git_ignore}`,
        [path.join(projectDir, 'README.md')]: `${readmeFile}`,
    };

    // Create the directories
    for (let folder of folders) {
        await fs.ensureDir(path.join(projectDir, folder));
    }

    // Create the files
    for (let filePath in files) {
        await fs.outputFile(filePath, files[filePath]);
    }

    console.log('File structure created successfully!');
}

module.exports = { generateStructure };
