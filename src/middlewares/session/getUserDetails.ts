import { NextFunction } from "express";
import { UserRequest, UserResponse } from "../../interfaces/express";
import jwt from "jsonwebtoken"
import { UserJwt } from "../../config/jwt";
import { UserJwtPayload } from "../../interfaces/jwt";
import { isEmptyStr } from "../../utils/dataFormat";

export default async function getUserDetails(req:UserRequest,res:UserResponse,next:NextFunction){
    try{
        const userJwtToken:string|undefined = req.params.userJwtToken
        if(userJwtToken===undefined){
            res.status(404).json({message:"User data not found!!!\nKindlyLogin Again"})
        }
        else{
            const jwtTokenData = jwt.verify(userJwtToken,UserJwt.key) as UserJwtPayload
            if(isEmptyStr(jwtTokenData.userId)){
                res.status(401).json({fetched:false,message:"User Details not found!!!\nKindly Login again"})
            }
            else{
                req.userID = jwtTokenData.mobile
                req.name = jwtTokenData.name
                next()
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}