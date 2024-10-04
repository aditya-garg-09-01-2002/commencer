import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { database } from "../../config/database";
import { UserRequest, UserResponse } from "../../interfaces/express";

export default async function removeUser(req:UserRequest,res:UserResponse){
    try{
        const {userId} = req.body
        await database.user.delete({where:{userId:userId}})
        res.status(201).json({fetched:true,message:"User Successfully removed"})
    }catch(error){
        console.log(error)
        if(error instanceof PrismaClientKnownRequestError && error.code == 'P2025'){
            res.status(400).json({fetched:false,message:"User does not exists"})
        }
        else{
            res.status(500).json({fetched:false,message:"Internal Server Error"})
        }
    }
}