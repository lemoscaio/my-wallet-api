import database from "../database.js"

export async function validateSession(req, res, next) {
    const { authorization } = req.headers

    const regexResult = authorization?.match(/^(Bearer )/g)
    if (!regexResult) 
        return res
            .status(400)
            .send("You must pass an authorization token in the request header") //WORKING

    const token = authorization?.replace("Bearer ", "")

    if (!token)
        return res
            .status(400)
            .send("You must pass an authorization token in the request header") //WORKING

    const session = await database.collection("sessions").findOne({ token })
    if (!session) return res.status(404).send("User not logged in. Invalid session token") //WORKING

    const user = await database
        .collection("users")
        .findOne({ _id: session.userId })

    if (!user) return res.status(404).send("Couldn't find user related to this session") //WORKING

    delete user.password

    res.locals.user = user

    next()
}
