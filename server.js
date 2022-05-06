import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { registerUser, signInUser } from "./controllers/authController.js"

console.log(signInUser)

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.post("/sign-up", registerUser)

app.post("/sign-in", signInUser)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})