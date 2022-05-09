import { ObjectId } from "mongodb"
import dayjs from "dayjs"

import database from "../database.js"

export async function getStatements(req, res) {
    const { user } = res.locals

    try {
        const statements = await database
            .collection("statements")
            .find({ userId: user._id })
            .toArray()

        res.send(statements)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function postNewStatementEntry(req, res) {
    const { user } = res.locals

    const { description, value, type } = req.body

    const date = dayjs().format("DD/MM")

    const trimmedDescription = description?.trim()

    const valueAsNumber = parseFloat(value).toFixed(2)

    if (valueAsNumber <= 0.0)
        return res.status(400).send("Value must be higher than 0.00")

    const descriptionContent =
        trimmedDescription?.length > 0 ? trimmedDescription : "Sem descrição"

    const newEntry = {
        userId: user._id,
        description: descriptionContent,
        value: valueAsNumber,
        type,
        date,
    }

    try {
        const result = await database
            .collection("statements")
            .insertOne(newEntry)

        if (result.acknowledged) return res.status(201).send(newEntry)
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function deleteStatementEntry(req, res) {
    const { entryId } = req.params
    const { user } = res.locals

    if (!ObjectId.isValid(entryId))
        return res.status(400).send("Invalid statement ID pattern")

    try {
        const statement = await database
            .collection("statements")
            .findOne({ _id: new ObjectId(entryId) })

        if (!statement) return res.status(404).send("Entry not found")

        const userIdFromStatement = statement.userId.toString()
        const userIdFromSession = user._id.toString()

        if (userIdFromStatement !== userIdFromSession)
            return res.status(401).send("This entry doesn't belong to the user")

        try {
            const result = await database
                .collection("statements")
                .deleteOne({ _id: new ObjectId(entryId) })

            if (result.deletedCount > 0)
                return res.status(200).send("Successfully deleted")
            else return res.status(400).send("Couldn't delete statement")
        } catch (error) {
            return res.status(500).send(error)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function editStatementEntry(req, res) {
    const { entryId } = req.params
    const { description, value, type } = req.body
    const { user } = res.locals

    const trimmedDescription = description?.trim()

    const valueAsNumber = parseFloat(value).toFixed(2)

    if (value === "" || valueAsNumber <= 0.0)
        return res.status(400).send("Value must be higher than 0.00")

    const descriptionContent =
        trimmedDescription.length > 0 ? trimmedDescription : "Sem descrição"

    const editedEntry = {
        description: descriptionContent,
        value: valueAsNumber,
        type,
    }

    if (!ObjectId.isValid(entryId))
        return res.status(400).send("Invalid statement ID pattern")

    try {
        const statement = await database
            .collection("statements")
            .findOne({ _id: new ObjectId(entryId) })

        if (!statement) return res.status(404).send("Entry not found")

        const userIdFromStatement = statement.userId.toString()
        const userIdFromSession = user._id.toString()

        if (userIdFromStatement !== userIdFromSession)
            return res.status(401).send("This entry doesn't belong to the user")

        try {
            const result = await database
                .collection("statements")
                .updateOne({ _id: statement._id }, { $set: editedEntry })

            if (result.modifiedCount === 1 && result.matchedCount === 1)
                return res.status(200).send("Successfully updated")
            else if (result.matchedCount === 1 && result.modifiedCount === 0)
                return res.status(400).send("Data must be different to update")
            else return res.sendStatus(400)
        } catch (error) {
            return res.status(500).send(error)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}
