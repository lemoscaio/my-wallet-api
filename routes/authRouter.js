import { Router } from "express"

import { signInUser, registerUser } from "./../controllers/authController.js"
import { validateSession } from "./../middlewares/userMiddleware.js"

const authRouter = Router()

authRouter.post("/sign-up", registerUser)

authRouter.post("/sign-in", signInUser)

export default authRouter
