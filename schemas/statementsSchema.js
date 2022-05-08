import Joi from "joi"

// SCHEMAS
const newStatementEntrySchema = Joi.object({
    value: Joi.number().required(),
    description: Joi.any(),
    type: Joi.valid("withdraw", "deposit").required(),
    userId: Joi.any(),
})

// VALIDATION FUNCTIONS
export async function validateNewstatementData(req, res, next) {
    try {
        await newStatementEntrySchema.validateAsync(req.body)
    } catch (e) {
        return res.status(400).send(e.details.map((error) => error.message))
    }

    next()
}
