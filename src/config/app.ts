import dotenv from "dotenv"

dotenv.config()

let environment : string | undefined = process.env.COMMENCER_ENVIRONMENT

if(!(environment==="DEVELOPMENT"||environment==="DEVELOPMENT"||environment==="DEVELOPMENT")){
    console.log("No Environment was set in .env file. Please confirm if you have run initialisation command.\n\nrefer - README for more info\n\nDefault environment is been set as DEVELOPMENT => not production ready")
    environment = "DEVELOPMENT"
}


export const port : string = process.env.APP_PORT as string

export function isDevelopmentEnv(){
    return !isNotDevelopmentEnv() && environment !== "DEVELOPMENT"
}

export function isNotDevelopmentEnv():boolean{

    // if an environment is production or testing, it is not a development environment

    return (
        isProductionEnv()||
        isTestingEnv()
    )
}

export function isProductionEnv(){
    return environment === "PRODUCTION"
}

export function isTestingEnv(){
    return environment === "Testing"
}