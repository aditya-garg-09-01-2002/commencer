import { Request, Response } from "express";
import { database } from "../../config/database";
import { uuid } from "uuidv4";
import { hash } from "bcrypt";
import { sendOtp } from "../../utils/communication";

export default async function resendOtp(req:Request,res:Response){
    try{
        const {userId,idType} = req.body
        const otp = await database.otp.findUnique({where:{userId:userId}})
        if(otp && otp.otpHash){
            const newOtp = uuid()
            const otpHash = await hash(newOtp,12)
            await database.otp.update({where:{userId:userId},data:{otpHash:otpHash}})
            res.status(201).json({fetched:true,message:"OTP sent successfully."})
            sendOtp(userId,otpHash,idType)
        }
        else{
            res.status(400).json({fetched:false,message:"OTP can't be resend before requesting it for the first time."})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}