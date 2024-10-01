import { Request, Response } from "express";
import { database } from "../../config/database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { isProductionEnv } from "../../config/app";
import {uuid as v4} from "uuidv4"
import { SessionJwtPayload, UserJwtPayload } from "../../interfaces/jwt";
import { SessionJwt, UserJwt } from "../../config/jwt";

export default async function Login(req:Request,res:Response){
    try{
        const {userId,password} = req.body
        const user = await database.user.findUnique({where:{userId:userId},include:{profile:true}})
        if(user === null){
            res.status(404).json({message:"User not found with the provided User ID!!!\nMove Ahead to Create a New Account?"})
            return ;
        }
        else{
            const matchUser = await bcrypt.compare(password,user.passwordHash)
            if(matchUser){
                const sessionID = v4()
                const userJwtTokenData : UserJwtPayload = {
                    userId:userId,
                    name:user.profile?.name as string,
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
                return ;
            }
            else{
                res.status(401).json({fetched:false,message:"User ID and Password does not match!!!\nPlease Try Again."})
                return ;
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}