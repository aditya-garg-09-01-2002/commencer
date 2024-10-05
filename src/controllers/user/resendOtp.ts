import { Request, Response } from "express";
import { database } from "../../config/database";
import { sendOtp } from "../../utils/communication";
import generateOTP from "../../utils/otp";

export default async function resendOtp(req:Request,res:Response){
    try{
        const {userId,idType} = req.body
        const otp = await database.otp.findUnique({where:{userId:userId}})
        if(otp && otp.otpHash){
            const genOtp = await generateOTP()
            await database.otp.update({where:{userId:userId},data:{otpHash:genOtp.hash}})
            res.status(201).json({fetched:true,message:"OTP sent successfully."})
            sendOtp(userId,genOtp.otp,idType)
        }
        else{
            res.status(400).json({fetched:false,message:"OTP can't be resend before requesting it for the first time."})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}