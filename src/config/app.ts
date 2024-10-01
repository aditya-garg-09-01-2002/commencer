import dotenv from "dotenv"

dotenv.config()

const environment : string | undefined = process.env.ENVIRONMENT
export const port : string = process.env.PORT as string

export function isDevelopmentEnv(){
    return !isNotDevelopmentEnv() && environment !== "Development"
}

export function isNotDevelopmentEnv():boolean{

    // if an environment is production or testing, it is not a development environment

    return (
        isProductionEnv()||
        isTestingEnv()
    )
}

export function isProductionEnv(){
    return environment === "Production"
}

export function isTestingEnv(){
    return environment === "Testing"
}