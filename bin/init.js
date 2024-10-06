#!/usr/bin/env node

const {execSync} = require("child_process")
const fs = require("fs")
const path = require("path")

let currentDir = process.cwd()

let rootDir = process.cwd()

while(!fs.existsSync(path.join(currentDir,'node_modules'))){
    rootDir = path.resolve(currentDir,'..');
    if(currentDir == rootDir){
        console.log("Cannot determine directory root.\nKindly move to root folder.")
        break;
    }
    else{
        currentDir = rootDir
    }
}

const getEnvFilePath = () => path.resolve(rootDir,'.env');

const getGitignoreFilePath = () => path.resolve(rootDir,'.gitignore')

function installDependencies(){
    console.log("Installing dependencies...");
    execSync('npm install', { stdio: 'inherit' });
    console.log('Dependencies installation complete')
}

function createEnvFile(envFilePath){
    if (!fs.existsSync(envFilePath)) {
        fs.writeFileSync(envFilePath,'')
        console.log('.env file created.');
    }
}

function addEnvVariables(environmentVariables,envFilePath){
    const content = fs.readFileSync(envFilePath,'utf-8')

    fs.appendFileSync(envFilePath, `
    #Currently Commencer works with mysql only, lookout for newer version to work with them.
    `);

    const alreadyPresentVariables = []

    Object.keys(environmentVariables).forEach(variable_name=>{
        let variable_value = environmentVariables[variable_name]
        if(!content.includes(variable_name)){
            if(variable_value === undefined || typeof variable_value === "string"){
                variable_value = `"${variable_value}"`
            }
            fs.appendFileSync(envFilePath,`\n${variable_name}=${variable_value}\n`)
        }
        else{
            alreadyPresentVariables.push(variable_name)
        }
    })
    if(alreadyPresentVariables.length){
        console.log(alreadyPresentVariables.length+" are already present in the .env file, please make sure is/they has/have correct value(s).")
        alreadyPresentVariables.forEach(variable_name=>console.log(variable_name))
    }
}

function setGitHubCommitTemplate(){
    execSync('git config commit.template .gitmessage.txt', { stdio: 'inherit' });
}

function createGitignore(){
    const gitignoreFilePath = getGitignoreFilePath()
    if(!fs.existsSync(gitignoreFilePath)){
        fs.writeFileSync(gitignoreFilePath,'')
        console.log(".gitignore file created")
    }
    const content = fs.readFileSync(gitignoreFilePath,'utf-8')
    if(!content.includes('.env')){
        fs.appendFileSync(gitignoreFilePath,`\n.env\n`)
    }
    if(!content.includes('node_modules')){
        fs.appendFileSync(gitignoreFilePath,`\nnode_modules\n`)
    }
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
        APP_NAME : "your-app-name",
        MAIL_CLIENT_ID: "your-mail-client-id",
        MAIL_CLIENT_SECRET: "your-mail-client-secret",
        MAIL_REDIRECT_URI: "your-mail-redirect-uri",
        MAIL_REFRESH_TOKEN:"your-mail-refresh-token",
        MAIL_SERVICE: "your-mail-service #currently gmail is supported, for other services, kindly look forward to updated versions, if you can help with this, kindly contribute to our github repository",
        SENDER_MAIL:"your-sender-mail",
    }
    
    addEnvVariables(environmentVariables,envFilePath)
    
    setGitHubCommitTemplate()

    createGitignore()
    
    console.log("Initialization complete!");
    
}
catch(error){
    console.log("Error while installation, please report us with error so we can help resolve issue.")
    console.log(error)
}


