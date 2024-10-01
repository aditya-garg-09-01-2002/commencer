import { Request, Response } from "express";

export default async function Logout(req:Request,res:Response){
    try{
        res.clearCookie("Session-ID")
        res.status(200).json({fetched:true,message:"Successfully Logged Out!!!"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}