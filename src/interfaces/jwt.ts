import { JwtPayload } from "jsonwebtoken"

export interface SessionJwtPayload extends JwtPayload{
    sessionID:string
}

export interface UserJwtPayload extends JwtPayload{
    userId:string
}