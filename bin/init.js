#!/usr/bin/env node

const {execSync, exec} = require("child_process")
const fs = require("fs")
const path = require("path")

function installDependencies(){
    console.log("Installing dependencies...");
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installation complete')
}

const getEnvFilePath = () => path.join(__dirname, '../'+'.env');

function createEnvFile(envFilePath){
    if (!fs.existsSync(envFilePath)) {
        fs.writeFileSync(envFilePath,'')
        console.log('.env file created.');
    }
}

function addEnvVariables(environmentVariables){
    const content = fs.readFileSync(envFilePath,'utf-8')

    fs.appendFileSync(envFilePath, `
    #Currently Commencer works with mysql only, lookout for newer version to work with them.
    `);

    Object.keys(environmentVariables).forEach(variable_name=>{
        const variable_value = environmentVariables[variable_name]
        if(!content.includes(variable_name)){
            fs.appendFileSync(envFilePath,`\n${variable_name}=${variable_value}\n`)
        }
        else{
            console.log(`${variable_name} is already present in .env file, please make sure it has a valid value`)
        }
    })
}

function setGitHubCommitTemplate(){
    execSync('git config commit.template .gitmessage.txt', { stdio: 'inherit' });
}

function deployPrisma(){
    execSync('npx prisma generate',{stdio:'inherit'})
    execSync('npx prisma migrate deploy',{stdio:'inherit'})
}

try{

    console.log("Starting initialization...");
    
    installDependencies()
    
    // Example: Create an .env file if it doesn’t exist 
    const envFilePath = getEnvFilePath()
    createEnvFile(envFilePath)
    
    const environmentVariables = {
        COMMENCER_DATABASE_URL:"mysql://<database_user>:<database_password>@<database_host>:<database_port>/<database_name>?schema=public",
        APP_PORT : 9000,
        COMMENCER_SESSION_JWT_NAME:"your_session_jwt_name",
        COMMENCER_SESSION_JWT_KEY:"your_session_jwt_key",
        COMMENCER_SESSION_COOKIE_NAME:"your_session_cookie_name",
        COMMENCER_SESSION_COOKIE_KEY:"your_session_cookie_key",
        COMMENCER_USER_JWT_NAME:"your_user_jwt_name",
        COMMENCER_USER_JWT_KEY:"your_user_jwt_key",
        COMMENCER_ENVIRONMENT : "DEVELOPMENT  #acceptable values = {DEVELOPMENT, PRODUCTION, TESTING}" ,
    }
    
    addEnvVariables(environmentVariables)
    
    setGitHubCommitTemplate()
    
    deployPrisma()
    
    console.log("Initialization complete!");
    
}
catch(error){
    console.log("Error while installation, please report us with error so we can help resolve issue.")
    console.log(error)
}


