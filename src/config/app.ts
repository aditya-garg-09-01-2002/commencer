import dotenv from "dotenv"

dotenv.config()

const environment : string | undefined = process.env.COMMENCER_ENVIRONMENT
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