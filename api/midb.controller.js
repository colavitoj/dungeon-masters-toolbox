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
}