import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { SessionJwt } from "../../config/jwt";
import { SessionJwtPayload } from "../../interfaces/jwt";

export default function isValidSession(req:Request,res:Response,next:NextFunction){
    try{    
        const sessionJwtToken:string|undefined = req.params.sessionJwtToken
        const sessionIDFromSessionCookie = req.signedCookies["Session-ID"]
        if(sessionJwtToken === undefined){
            throw new Error("JWT Token not found")
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