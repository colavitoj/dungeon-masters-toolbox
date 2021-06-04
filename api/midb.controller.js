import MidbDao from "../dao/midbDAO.js"

export default class MidbController {
    static async apiGetItems(req, res, next) {
        const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.itemname) {
            filters.itemname = req.query.itemname
        } else if (req.query.description) {
            filters.description = req.query.description
        } else if (req.query.effect) {
            filters.effect = req.query.effect
        } else if (req.query.itemslot) {
            filters.itemslot = req.query.itemslot
        }


        const { itemsList, totalNumItems } = await MidbDao.getItems({
            filters,
            page,
            itemsPerPage,
        })

        let response = {
            items: itemsList,
            page: page,
            filters: filters,
            entries_per_page: itemsPerPage,
            total_results: totalNumItems,
        }
        res.json(response)
    }

    static async apiPostItem(req, res, next) {
        try {
            const itemId = req.body.item_id
            const description = req.body.description
            const itemname = req.body.itemname
            const itemslot = req.body.itemslot
            const effect = req.body.effect

            const userInfo = {
                _id: req.body.user_id,
                name: req.body.name,

            }
            const date = new Date()

            const ItemResponse = await MidbDao.addItem(
                itemId,
                userInfo,
                description,
                itemname,
                itemslot,
                effect,
                date,
            )
            res.json({ status: 'Success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateItem(req, res, next) {
        try {
            //could be problematic here - moved from .text to individual req.body items
            const itemId = req.body.item_id
            const description = req.body.description
            const itemname = req.body.itemname
            const itemslot = req.body.itemslot
            const effect = req.body.effect
            const date = new Date()

            const itemResponse = await MidbDao.updateItem(
                itemId,
                req.body.user_id,
                description,
                itemname,
                itemslot,
                effect,
                date,
            )

            var { error } = itemResponse
            if (error) {
                res.status(400).json({ error })
            }
            if (itemResponse.modifiedCount === 0) {
                throw new Error(
                    "Unable to update item - encountered error.",
                )
            }
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }

    static async apiDeleteItem(req, res, next) {
        try {
            const itemId = req.query.id
            const userId = req.body.user_id
            console.log(itemId)
            const itemResponse = await MidbDao.deleteIteM(
                itemId,
                userId,
            )
            res.json({ status: 'Success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}