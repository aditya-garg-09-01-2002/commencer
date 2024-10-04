import bcrypt from "bcrypt"
import { NextFunction, Request, Response } from "express";
import { database } from "../../config/database";

export default async function verifyOtp(req:Request,res:Response,next:NextFunction){
    try{
        const {userId,otp} = req.body
        const storedOtp = await database.otp.findUnique({where:{userId:userId}})
        if(!storedOtp){
            res.status(500).json({fetched:false,message:"No OTP sent!!!\nKindly request an OTP first."})
        }
        else{
            const matchOTP = await bcrypt.compare(otp,storedOtp.otpHash)
            if(matchOTP){
                next();
            }
            else{
                res.status(403).json({fetched:false,message:"Wrong OTP.\nKindly try again."})
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).json({fetched:false,message:"Error verifying OTP"})
    }
}