import { Request, Response } from "express";
import { SessionCookie } from "../../config/cookie";

export default async function Logout(req:Request,res:Response){
    try{
        res.clearCookie(SessionCookie.name)
        res.status(200).json({fetched:true,message:"Successfully Logged Out!!!"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error",fetched:false})
    }
}