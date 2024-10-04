import { Request, Response } from "express";
import { database } from "../../config/database";
import { uuid } from "uuidv4";
import { hash } from "bcrypt";
import { sendOtp } from "../../utils/communication";

export default async function registerUser(req:Request,res:Response){
    try{
        const {userId,name} = req.body;
        const idType = req.params.idType
        const user = await database.user.findUnique({where:{userId:userId}})
        if(!user){
            const otp = uuid()
            const otpHash = await hash(otp,12)
            const newUser = await database.user.create({data:{
                userId:userId, 
                profile:{
                    create:{
                        name:name 
                    }
                },
                otp:{
                    create:{
                        otpHash:otpHash
                    }
                }
            }})
            res.status(200).json({fetched:true,message:"User successfully registered.\nKindly verify using mail."})
            sendOtp(userId,otp,idType)
        }
        else{
            if(!user.passwordHash){
                res.status(401).json({fetched:false,message:"User registered but password never set!!!\nKindly set password first."})
            }
            else{
                res.status(403).json({fetched:false,message:"User already exits!!!\nMove to Login."})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}