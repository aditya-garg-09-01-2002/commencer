import { APP_NAME } from "../config/app"
import { getTransporter } from "../config/mail"
import { isEmptyStr } from "./dataFormat"

export async function sendOtp(userId:string,otpHash:string,idType:string){
    if(idType === "mobile"){
        await messageOtp(userId,otpHash)
    }
    else if(idType === "email"){
        await mailOtp(userId,otpHash)
    }
}

async function messageOtp(userId:string,otpHash:string){
    console.log("Currently sending otp on mobile is not supported")
    console.log("Please consider setting up mailing otp as an alternative")
    console.log("Please help our github repo if you know how to do this stuff")
}

async function mailOtp(userId:string,otpHash:string){
    await sendMail([userId],isEmptyStr(APP_NAME)?`Verification code for ${APP_NAME}`:"Verification Code",`<div>${otpHash}</div>`)    
}

export async function sendMail(recipients:string[],subject:string,html:string){
  try {
    const results = await Promise.all(
      recipients.map(async (recipient) => {
        try {
          const transporter=getTransporter()
          await transporter.sendMail({
            to: recipient,
            subject: subject,
            html:html
          });
          return { recipient: recipient, sent: true };
        } catch (error:any) {
          console.log(error)
          return { recipient: recipient, sent: false, error: error.message };
        }
      })
    );
    return results;
  } catch (error) {
    throw new Error("Failed to send emails");
  }
}
