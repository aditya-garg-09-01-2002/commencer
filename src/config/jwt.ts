import dotenv from "dotenv"

dotenv.config()

interface jwtProps {
    name : string
    key : string
}

export const SessionJwt : jwtProps = {
    name : process.env.SESSION_JWT_NAME as string,
    key : process.env.SESSION_JWT_KEY as string
}

export const UserJwt : jwtProps = {
    name : process.env.USER_JWT_NAME as string,
    key : process.env.USER_JWT_KEY as string
}

//set default