import { Router } from "express"
import {
    getStatements,
    postNewStatementEntry,
    deleteStatementEntry,
    editStatementEntry,
} from "./../controllers/statementsController.js"
import { validateSession } from "./../middlewares/userMiddleware.js"
import { validateNewstatementData } from "../schemas/statementsSchema.js"

const statementsRouter = Router()

statementsRouter.get("/statements", validateSession, getStatements)
statementsRouter.post(
    "/statements",
    validateSession,
    validateNewstatementData,
    postNewStatementEntry
)
statementsRouter.delete(
    "/statements/:entryId",
    validateSession,
    deleteStatementEntry
)
statementsRouter.put(
    "/statements/:entryId",
    validateSession,
    editStatementEntry
)

export default statementsRouter
