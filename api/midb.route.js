import express from 'express'
import MidbController from "./midb.controller.js"

const router = express.Router()

router.route("/").get(MidbController.apiGetItems)
// router.route("/id:id").get(MidbController.apiGetItemById)
router.route("/itemslots").get(MidbController.apiGetItemslots)






router
    .route("/items")
    .post(MidbController.apiPostItem)
    .put(MidbController.apiUpdateItem)
    .delete(MidbController.apiDeleteItem)

export default router