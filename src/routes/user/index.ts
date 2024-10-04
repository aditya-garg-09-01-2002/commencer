import express, { Router } from "express"
import { isValidSession } from "../../middlewares/session"
import { changePassword, forgotPassword, login, logout, registerUser, removeUser, resendOtp, resetPassword, setPassword } from "../../controllers/user"
import { getUserDetailsFromAPIBody, getUserDetailsFromJwt, verifyOtp, verifyPassword } from "../../middlewares/auth"
const router:Router=express.Router()

router.post("/register-user",registerUser)
router.post("/login",getUserDetailsFromAPIBody,verifyPassword,login)
router.post("/logout",isValidSession,logout)
router.get("/forgot-password",forgotPassword)
router.get("/change-password",isValidSession,getUserDetailsFromJwt,verifyPassword,changePassword)
router.put("/resend-otp",resendOtp)
router.put("/set-password",verifyOtp,setPassword)
router.put("/reset-password",verifyOtp,resetPassword)
router.delete("/remove-user",isValidSession,getUserDetailsFromJwt,verifyPassword,removeUser)

export default router
