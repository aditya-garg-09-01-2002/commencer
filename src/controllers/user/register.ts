import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { database } from "../../config/database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function registerUser(req:Request,res:Response){
    try{
        const {userId,password,name} = req.body;
        const passwordHash = await bcrypt.hash(password,12)
        const newUser = await database.user.create({data:{
            userId:userId,
            passwordHash:passwordHash,
            profile:{
                create:{
                    name:name
                }
            }
        }})
        res.status(200).json({fetched:true,message:"User successfully registered."})
    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code == "P2002"){
                res.status(401).json({fetched:false,message:"User already exists!!!\nKindly move to login."})
            }
            else{
                console.log(error)
                res.status(400).json({fetched:false,message:"Error registering user.\nKindly Report."})
            }
        }
        else{
            console.log(error)
            res.status(500).json({fetched:false,message:"Internal Server Error"})
        }
    }
}