import { Router } from "express"

import { signInUser, registerUser } from "./../controllers/authController.js"
import { validateNewUserData, validateUserData } from "../schemas/userSchema.js"

const authRouter = Router()

authRouter.post("/sign-up", validateNewUserData, registerUser)

authRouter.post("/sign-in", validateUserData, signInUser)

export default authRouter
