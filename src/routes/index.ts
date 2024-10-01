import express, { Router } from "express"
import userRoutes from "./user"
import loggedInRoutes from "./loggedIn"
import publicRoutes from "./loggedOut"
import { isValidSession } from "../middlewares/session"
const router:Router=express.Router()


router.use("/auth",userRoutes)
router.use("/logged-in",isValidSession,loggedInRoutes)
router.use("/public-routes",publicRoutes)

export default router