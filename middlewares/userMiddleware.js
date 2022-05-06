import database from "../database.js"

export async function validateSession(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token)
        return res
            .status(404)
            .send("You must pass an authorization token in the request header")

    const session = await database.collection("sessions").findOne({ token })
    if (!session) return res.status(404).send("This session doesn't exist")

    const user = await database
        .collection("users")
        .findOne({ _id: session.userId })

    if (!user) return res.status(404).send("Couldn't find user")

    delete user.password

    res.locals.user = user

    next()
}
