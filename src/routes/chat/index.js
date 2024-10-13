import express from "express";
const router=express.Router();

import {isValidSession} from "../../middlewares/session/isValidSession"

router.post("/create-group", isValidSession);

// router.post("/register-user",registerUser)
// router.post("/login",getUserDetailsFromAPIBody,verifyPassword,login)
// router.post("/logout",isValidSession,logout)
// router.get("/forgot-password",forgotPassword)
// router.get("/change-password",isValidSession,getUserDetailsFromJwt,verifyPassword,changePassword)
// router.put("/resend-otp",resendOtp)
// router.put("/set-password",verifyOtp,setPassword)
// router.put("/reset-password",verifyOtp,resetPassword)
// router.delete("/remove-user",isValidSession,getUserDetailsFromJwt,verifyPassword,removeUser)

export default router;