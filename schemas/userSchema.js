import Joi from "joi"

// SCHEMAS
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

// VALIDATION FUNCTIONS
export async function validateUserData(req, res, next) {
    try {
        await userSchema.validateAsync(req.body)
    } catch (e) {
        return res.status(400).send(e.details.map((error) => error.message))
    }

    next()
}

export async function validateNewUserData(req, res, next) {
    try {
        await newUserSchema.validateAsync(req.body, { abortEarly: false })
    } catch (e) {
        res.status(400).send(e.details.map((error) => error.message))
        return
    }

    next()
}
