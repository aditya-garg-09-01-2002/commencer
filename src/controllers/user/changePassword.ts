import { compare, hash } from "bcrypt";
import { database } from "../../config/database";
import { UserRequest, UserResponse } from "../../interfaces/express";

export default async function changePassword(req:UserRequest,res:UserResponse){
    try{
        const userId = req.userID
        const {newPassword} = req.body
        const newPasswordHash = await hash(newPassword,12)
        await database.$transaction([
            database.user.update({where:{userId:userId},data:{passwordHash:newPasswordHash}}),
            database.otp.delete({where:{userId:userId}})
        ])
        res.status(201).json({fetched:true,message:"Your password has been changed password successfully."})
    }catch(error){
        console.log(error)
        res.status(500).json({fetched:false,message:"Internal Server Error"})
    }
}