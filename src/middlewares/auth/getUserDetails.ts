import { NextFunction } from "express";
import { UserRequest, UserResponse } from "../../interfaces/express";
import jwt from "jsonwebtoken"
import { UserJwt } from "../../config/jwt";
import { UserJwtPayload } from "../../interfaces/jwt";
import { isEmptyStr } from "../../utils/dataFormat";
import { database } from "../../config/database";
import { UserProps } from "../../interfaces/user";

async function getUserDetails(req:UserRequest,res:UserResponse,next:NextFunction,userId:string|undefined|null){
    try{
        if(isEmptyStr(userId)){
            res.status(404).json({fetched:false,message:"User ID could not be fetched."})
        }
        else{
            req.userID = userId as string
            const user = await database.user.findUnique({where:{userId:req.userID}, include:{profile:true}})
            if(!user){
                res.status(404).json({fetched:false,message:"User not registered!!!\nKindly consider registering user."})
            }
            else{
                req.user = user as UserProps;
                next()
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getUserDetailsFromJwt(req:UserRequest,res:UserResponse,next:NextFunction){
    try{    
        const userJwtHeaders:string|string[]|undefined = req.headers[UserJwt.name.toLowerCase()]
        const userJwtToken:string|undefined = Array.isArray(userJwtHeaders) ? userJwtHeaders[0] : userJwtHeaders
        if(userJwtToken===undefined){
            res.status(404).json({message:"User data not found!!!\nKindly Login Again"})
        }
        else{
            const jwtTokenData = jwt.verify(userJwtToken,UserJwt.key) as UserJwtPayload
            if(isEmptyStr(jwtTokenData.userId)){
                res.status(401).json({fetched:false,message:"User Details not found!!!\nKindly Login again"})
            }
            else{
                getUserDetails(req,res,next,jwtTokenData.userId)
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getUserDetailsFromAPIBody(req:UserRequest,res:UserResponse,next:NextFunction){
    try{
        const userId:string|undefined = req.body.userId
        await getUserDetails(req,res,next,userId)
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}