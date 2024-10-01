import { Request, Response } from "express";

export interface UserRequest extends Request{
    userID ?: string
    name ?: string
}

export interface UserResponse extends Response{
    
}