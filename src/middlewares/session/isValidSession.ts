import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { SessionJwt } from "../../config/jwt";
import { SessionJwtPayload } from "../../interfaces/jwt";
import { SessionCookie } from "../../config/cookie";
import { isEmptyStr } from "../../utils/dataFormat";

export default function isValidSession(req:Request,res:Response,next:NextFunction){
    try{    
        const sessionJwtHeaders:string|string[]|undefined = req.headers[SessionJwt.name.toLowerCase()]
        const sessionJwtToken:string|undefined = Array.isArray(sessionJwtHeaders) ? sessionJwtHeaders[0] : sessionJwtHeaders
        const sessionIDFromSessionCookie = req.signedCookies[SessionCookie.name]
        if(sessionJwtToken === undefined || isEmptyStr(sessionJwtToken) || isEmptyStr(sessionIDFromSessionCookie)){
            res.status(401).json({message:"Session credentials not found",fetched:false})
        }
        else{
            const jwtTokenData = jwt.verify(sessionJwtToken,SessionJwt.key) as SessionJwtPayload
            if(sessionIDFromSessionCookie === jwtTokenData.sessionID){
                next()
            }
            else{
                res.status(403).json({fetched:false,message:"Invalid Session!!!\nKindly Login Again"})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}