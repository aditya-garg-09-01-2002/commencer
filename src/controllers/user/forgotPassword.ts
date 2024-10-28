import { database } from "../../config/database";
import { UserRequest, UserResponse } from "../../interfaces/express";
import { sendOtp } from "../../utils/communication";
import generateOTP from "../../utils/otp";

export default async function forgotPassword(req:UserRequest,res:UserResponse){
    try{
        const user = req.user
        const profile = await database.profile.findUnique({where:{userId:req.userID}})
        const {idType} = req.body
        if(!user?.passwordHash){
            res.status(400).json({fetched:false,message:"User verification not completed.\nKindly first verify user first."})
        }
        else{
            const otpExists = await database.otp.findMany({where:{userId:user.userId}})
            if(otpExists){
                res.status(403).json({fetched:false,message:"OTP already sent!!!\nKindly use resend OTP."})
            }
            else{
                const genOtp = await generateOTP()
                await database.otp.create({data:{
                    userId:user.userId,
                    otpHash:genOtp.hash
                }})
                res.status(201).json({fetched:true,message:"OTP sent successfully."})
                sendOtp(user.userId,genOtp.otp,idType,profile!.name)
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}