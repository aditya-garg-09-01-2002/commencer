export function sendOtp(userId:string,otpHash:string,idType:string){
    if(idType === "mobile"){
        messageOtp(userId,otpHash)
    }
    else if(idType === "email"){
        mailOtp(userId,otpHash)
    }
}

function messageOtp(userId:string,otpHash:string){

}

function mailOtp(userId:string,otpHash:string){

}