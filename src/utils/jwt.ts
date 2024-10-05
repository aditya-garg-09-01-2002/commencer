import { SessionJwtPayload, UserJwtPayload } from "../interfaces/jwt";
import jwt from "jsonwebtoken"

export function generateUserJwt(userId:string,userJwtKey:string):string{
    return generateJwt(
        {userId:userId},
        userJwtKey,
        {expiresIn:"2d"}
    )
}
export function generateSessionJwt(sessionId:string,sessionJwtKey:string):string{
    return generateJwt(
        {sessionID:sessionId},
        sessionJwtKey,
        {expiresIn:"2d"}
    )
}
function generateJwt(data:UserJwtPayload|SessionJwtPayload,key:string,options:{[key:string]:string}):string{
    return jwt.sign(data,key,options)
}