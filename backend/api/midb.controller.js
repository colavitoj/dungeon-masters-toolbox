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
        } else if (req.query.id) {
            filters.id = req.query.id
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
            console.log(req)
            const itemId = req.body.item_id
            const description = req.body.description
            const itemname = req.body.itemname
            const itemslot = req.body.itemslot
            const effect = req.body.effect

            const userInfo = {
                _id: req.body.user_id,
                name: req.body.name,
                userimg: req.body.user_img

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


            const itemId = req.body.item_id
            const description = req.body.description
            const itemname = req.body.itemname
            const itemslot = req.body.itemslot
            const effect = req.body.effect
            const date = new Date()
            const user_id = req.body.user_id

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
            const itemResponse = await MidbDao.deleteItem(
                itemId,
                userId,
            )
            res.json({ status: 'Success' })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiGetItemById(req, res, next) {

        try {

            let id = req.query.id || {}
            let item = await MidbDao.getItemByID(id)
            if (!item) {
                res.status(404).json({ error: "No item found" })
                return
            }
            res.json(item)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
    static async apiGetItemslots(req, res, next) {
        try {
            let itemslots = await MidbDao.getItemslots()
            res.json(itemslots)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}
