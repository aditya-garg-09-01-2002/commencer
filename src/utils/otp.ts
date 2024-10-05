import { hash } from "bcrypt";

export default async function generateOTP():Promise<{otp:string,hash:string}>{
    const min = 100000
    const max = 999999
    const otp = Math.floor(Math.random() * ( max - min + 1)) + min
    const otpStr = otp.toString()
    const otpHash = await hash(otpStr,12)

    return {otp:otpStr,hash:otpHash}

}