import { Request, Response } from "express";
import { isProductionEnv } from "../../config/app";
import { v4 } from "uuid";
import { SessionJwt, UserJwt } from "../../config/jwt";
import { SessionCookie } from "../../config/cookie";
import { generateSessionJwt, generateUserJwt } from "../../utils/jwt";

export default async function Login(req:Request,res:Response){
    try{
        const {userId} = req.body
        const sessionID = v4()
        const userJwtToken = generateUserJwt(userId,UserJwt.key)
        const sessionJwtToken = generateSessionJwt(sessionID,SessionJwt.key)
        res.cookie(SessionCookie.name,sessionID,{
            maxAge : 1000*60*60*24*2,
            signed : true,
            httpOnly : true,
            secure : isProductionEnv(),
            sameSite : isProductionEnv() ? "none" : "lax"
        })
        res.status(200).json({fetched:true,message:"You have successfully logged in!!!",[UserJwt.name]:userJwtToken,[SessionJwt.name]:sessionJwtToken})
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}