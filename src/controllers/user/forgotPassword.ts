import { compare, hash } from "bcrypt";
import { database } from "../../config/database";
import { Request, Response } from "express";

export default async function forgotPassword(req:Request,res:Response){
    try{
        const {otp,password,userId} = req.body
        const user = await database.user.findUnique({where:{userId:userId},include:{otp:true}})
        if(!user){
            res.status(404).json({fetched:false,message:"User not registered.\nKindly please register first."})
        }
        else{
            if(!user.passwordHash){
                res.status(400).json({fetched:false,message:"User email verification not completed.\nKindly first verify your email."})
            }
            else if(!user.otp){
                res.status(400).json({fetched:false,message:"OTP not requested for changing password.\nKindly request an OTP first."})
            }
            else{
                const otpHash = user.otp.otpHash;
                const matchOtp = await compare(otp,otpHash);
                if(matchOtp){
                    const passwordHash = await hash(password,12)
                    await database.$transaction([
                        database.user.update({where:{userId:userId},data:{passwordHash:passwordHash}}),
                        database.otp.delete({where:{userId:userId}})
                    ])
                    res.status(201).json({fetched:true,message:"Your password has been changed password successfully."})
                }
                else{
                    res.status(400).json({fetched:true,message:"You have entered wrong OTP.\nKindly try again."})
                }
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}