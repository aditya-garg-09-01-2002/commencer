import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { isProductionEnv } from "../../config/app";
import {uuid as v4} from "uuidv4"
import { SessionJwtPayload, UserJwtPayload } from "../../interfaces/jwt";
import { SessionJwt, UserJwt } from "../../config/jwt";

export default async function Login(req:Request,res:Response){
    try{
        const {userId} = req.body
        const sessionID = v4()
        const userJwtTokenData : UserJwtPayload = {
            userId:userId,
        }
        const sessionJwtTokenData : SessionJwtPayload = {
            sessionID : sessionID
        }
        const jwtOptions = {
            expiresIn:"2d"
        }
        const userJwtToken = jwt.sign(userJwtTokenData,UserJwt.key,jwtOptions)
        const sessionJwtToken = jwt.sign(sessionJwtTokenData,SessionJwt.key,jwtOptions)
        res.cookie("Session-ID",sessionID,{
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