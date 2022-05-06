import bcrypt from "bcrypt"
import { passwordStrength } from "check-password-strength"
import Joi from "joi"
import { v4 as uuid } from "uuid"

import database from "./../database.js"

const newUserSchema = Joi.object({
    name: Joi.string()
        .pattern(/^[a-zA-ZãÃÇ-Üá-ú ]*$/i)
        .required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^\S{6,20}$/)
        .required(),
})

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^\S{6,20}$/)
        .required(),
})

export async function registerUser(req, res) {
    const { name, email, password } = req.body

    try {
        await newUserSchema.validateAsync(req.body, { abortEarly: false })
    } catch (e) {
        res.status(400).send(e.details.map((error) => error.message))
        return
    }

    try {
        const user = await database
            .collection("users")
            .findOne({ email: email })

        if (user)
            return res
                .status(409)
                .send("This email has already been registered")
    } catch (error) {}

    const passwordStrenght = passwordStrength(password).value
    if (passwordStrenght === "Too weak" || passwordStrenght === "Weak") {
        res.status(406).send(
            "The password must be stronger. Try to use capital letters, numbers and/or special characters."
        )
        return
    }

    const encryptedPassword = bcrypt.hashSync(password, 10)

    try {
        await database
            .collection("users")
            .insertOne({ name, email, password: encryptedPassword })
    } catch (error) {}

    res.send(req.body)
}

export async function signInUser(req, res) {
    const { email, password } = req.body

    try {
        await userSchema.validateAsync(req.body)
    } catch (e) {
        return res.send(e.details.map((error) => error.message))
    }

    try {
        const user = await database.collection("users").findOne({ email })
        const isPasswordRight = bcrypt.compareSync(password, user.password)

        if (!user || !isPasswordRight)
            return res.status(401).send("Wrong e-mail or password")

        const token = uuid()

        try {
            await database
                .collection("sessions")
                .insertOne({ userId: user._id, token })

            return res.send(token)
        } catch (e) {
            console.log(e)

            return res.status(500).send("Couldn't add session")
        }
    } catch (e) {
        return res.sendStatus(401)
    }
}
