import express from "express";
const router=express.Router();

import {isValidSession} from "../../middlewares/session/isValidSession"

router.post("/create-group", isValidSession);

export default router;
