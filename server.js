import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import authRouter from "./routes/authRouter.js"
import statementsRouter from "./routes/statementsRouter.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use(statementsRouter)
app.get("/", (req, res) => {
    res.send("Online")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`)
})
