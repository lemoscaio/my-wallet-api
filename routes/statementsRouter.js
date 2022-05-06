import { Router } from "express"
import { validateSession } from "./../middlewares/userMiddleware.js"
import {
    getStatements,
    postNewStatementEntry,
    deleteStatementEntry,
    editStatementEntry,
} from "./../controllers/statementsController.js"

const statementsRouter = Router()

statementsRouter.get("/statements", validateSession, getStatements)
statementsRouter.post("/statements", validateSession, postNewStatementEntry)
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
