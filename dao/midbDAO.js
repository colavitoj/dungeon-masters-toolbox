import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let midb

export default class MidbDao {
    static async injectDB(conn) {
        if (midb) {
            return
        }
        try {
            midb = await conn.db(process.env.MIDB_NS).collection("Items")
            console.log("Connection established")
        } catch (e) {
            console.error(
                `Unable to establish a connection to midbDAO: $(e)`,
            )
        }

    }


    static async getItems({
        filters = null,
        page = 0,
        itemsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ('itemname' in filters) {
                query = { $text: { $search: filters['itemname'] } }
            } else if ("description" in filters) {
                query = { "description": { $eq: filters['description'] } }
            } else if ("effect" in filters) {
                query = { "effect": { $eq: filters['effect'] } }
            } else if ("itemslot" in filters) {
                query = { "itemslot": { $eq: filters['itemslot'] } }
            }

        }

        let cursor

        try {
            cursor = await midb
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { itemsList: [], totalNumItems: 0 }
        }


        const displayCursor = cursor.limit(itemsPerPage).skip(itemsPerPage * page)

        try {
            const itemsList = await displayCursor.toArray()
            const totalNumItems = await midb.countDocuments(query)

            return { itemsList, totalNumItems }
        } catch (e) {
            console.error(
                `Unable to convert to array or encountered problem while counting documents, ${e}`
            )
            return { itemslist: [], totalNumItems: 0 }
        }

    }


    static async addItem(itemId, user, itemname, description, effect, itemslot, date) {
        try {
            const itemDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                itemname: itemname,
                description: description,
                effect: effect,
                itemslot: itemslot,
                item_id: ObjectId(itemId),
            }
            return await Items.insertOne(itemDoc)
        } catch (e) {
            console.error(`Unable to post new item: ${e}`)
            return { error: e }
        }
    }

    static async updateItem(item)


}