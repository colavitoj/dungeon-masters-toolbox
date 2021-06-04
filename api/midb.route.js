import express from 'express'
import MidbController from "./midb.controller.js"

const router = express.Router()

router.route("/").get(MidbController.apiGetItems)

export default router