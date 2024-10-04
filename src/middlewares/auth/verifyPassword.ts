import bcrypt from "bcrypt"
import { NextFunction } from "express";
import { UserRequest, UserResponse } from "../../interfaces/express";

export default async function verifyPassword(req:UserRequest,res:UserResponse,next:NextFunction){
    try{
        const user = req.user
        const {password} = req.body
        if(!user?.passwordHash){
            res.status(403).json({fetched:false,message:"Password was never set!!!\nKindly set the password first."})
        }
        else{
            const matchPassword = await bcrypt.compare(password,user.passwordHash)
            if(matchPassword){
                next();
            }
            else{
                res.status(403).json({fetched:false,message:"Wrong Password.\nKindly try again."})
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({fetched:false,message:"Error verifying Password"})
    }
}