import { Request, Response } from "express";
import { database } from "../../config/database";
import { hash } from "bcrypt";

export async function setPassword(req:Request,res:Response){
    try{
        const {userId,password} = req.body
        const passwordHash = await hash(password,12)
        const user = await database.user.findUnique({where:{userId:userId}})
        if(!user?.passwordHash){
            await database.$transaction([
                database.user.update({where:{userId:userId},data:{passwordHash:passwordHash}}),
                database.otp.delete({where:{userId:userId}})
            ])
            res.status(201).json({fetched:true,message:"User password successfully set!!!"})
        }
        else{
            res.status(400).json({fetched:false,message:"User password already set.\nKindly consider changing it."})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}

export async function resetPassword(req:Request,res:Response){
    try{
        const {userId,password} = req.body
        const passwordHash = await hash(password,12)
        const user = await database.user.findUnique({where:{userId:userId}})
        if(!user?.passwordHash){
            res.status(400).json({fetched:false,message:"User password was never set.\nKindly consider setting it first."})
        }
        else{
            await database.$transaction([
                database.user.update({where:{userId:userId},data:{passwordHash:passwordHash}}),
                database.otp.delete({where:{userId:userId}})
            ])
            res.status(201).json({fetched:true,message:"User password successfully changed!!!"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}