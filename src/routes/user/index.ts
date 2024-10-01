import express, { Router } from "express"
import { isValidSession } from "../../middlewares/session"
import { Login, Logout } from "../../controllers/user"
const router:Router=express.Router()

router.post("/register-user")
router.post("/login",Login)
router.post("/logout",isValidSession,Logout)
router.put("/change-password")
router.put("/forgot-password")
router.get("/send-otp/mobile")
router.get("/send-otp/email")
router.post("/verify-otp")
router.delete("/remove-user")

export default router
