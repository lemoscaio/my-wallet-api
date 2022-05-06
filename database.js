import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const client = new MongoClient(process.env.MONGO_URI)
let database
try {
    await client.connect()
    database = client.db(process.env.DATABASE)
} catch (error) {
    console.log(error)
}

export default database
