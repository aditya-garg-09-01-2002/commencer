import dotenv from "dotenv"
import {google} from 'googleapis'
import nodemailer from 'nodemailer'
import { isEmptyStr } from "../utils/dataFormat";

dotenv.config()

let CLIENT_ID:string|undefined= process.env.MAIL_CLIENT_ID;
let CLIENT_SECRET:string|undefined= process.env.MAIL_CLIENT_SECRET;
let REDIRECT_URI:string|undefined= process.env.MAIL_REDIRECT_URI;
let REFRESH_TOKEN:string|undefined=process.env.MAIL_REFRESH_TOKEN;
let SERVICE:string|undefined=process.env.MAIL_SERVICE;
let SENDER_MAIL:string|undefined=process.env.SENDER_MAIL;
let auth:{user:string|undefined}={user:SENDER_MAIL };

if(isEmptyStr(CLIENT_ID)||isEmptyStr(CLIENT_SECRET)||isEmptyStr(REDIRECT_URI)||isEmptyStr(SERVICE)||isEmptyStr(SENDER_MAIL)||isEmptyStr(auth.user)){
    console.log("Mailing environment variables not set!!!\nMake sure you setup your mailing server info")
}

export function getTransporter(){
  let transporter;  
  
  try{
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
  
    oAuth2Client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        REFRESH_TOKEN = tokens.refresh_token;
      }
    })
  
    transporter = nodemailer.createTransport({
        service: SERVICE,
        auth: {
          type: 'OAuth2',
          user: auth.user,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
        },
    });
    return transporter
  }
  catch(error)
  {
    throw new Error("Mailing Configuration Error")
  }
}