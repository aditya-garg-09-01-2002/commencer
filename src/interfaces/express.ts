import { Request, Response } from "express";
import { UserProps } from "./user";

export interface UserRequest extends Request{
    userID ?: string
    name ?: string
    user ?: UserProps | null
}

export interface UserResponse extends Response{
    
}