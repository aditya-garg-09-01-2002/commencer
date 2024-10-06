import dotenv from "dotenv"

dotenv.config()

interface cookieProps {
    name : string
    key : string
}

export const SessionCookie : cookieProps = {
    name : process.env.COMMENCER_SESSION_COOKIE_NAME as string,
    key : process.env.COMMENCER_SESSION_COOKIE_KEY as string
}


//set default