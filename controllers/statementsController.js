import { ObjectId } from "mongodb"

import database from "../database.js"

export async function getStatements(req, res) {
    const { user } = res.locals

    const statements = await database
        .collection("statements")
        .find({ userId: user._id })
        .toArray()

    console.log(statements)

    res.send(statements)
}

export async function postNewStatementEntry(req, res) {
    const { user } = res.locals

    const { description, value, type } = req.body
    // TODO insert time when posting

    const newEntry = { userId: user._id, description, value, type }

    try {
        const result = await database
            .collection("statements")
            .insertOne(newEntry)

        if (result.acknowledged) return res.status(201).send(newEntry)
    } catch (error) {
        return res.status(500).send("Couldn't insert new entry")
    }
}

export async function deleteStatementEntry(req, res) {
    const { entryId } = req.params

    try {
        const result = await database
            .collection("statements")
            .findOneAndDelete({ _id: new ObjectId(entryId) })

        if (!result.value) return res.status(404).send("Entry doesn't exist")
        else return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function editStatementEntry(req, res) {
    const { entryId } = req.params
    const { description, value, type } = req.body

    const entry = await database
        .collection("statements")
        .findOne({ _id: new ObjectId(entryId) })

    if (!entry) return res.status(404).send("Entry doesn't exist")

    try {
        const result = await database
            .collection("statements")
            .updateOne(
                { _id: entry._id },
                { $set: { description, value, type } }
            )
        console.log(result)

        if (result.modifiedCount === 1 && result.matchedCount === 1)
            return res.sendStatus(200)
        else if (result.matchedCount === 1 && result.modifiedCount === 0)
            return res.status(400).send("Data must be different to update")
        else return res.sendStatus(400)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}
