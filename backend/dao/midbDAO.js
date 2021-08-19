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
            console.log("Connection established with Items")
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
                query = { "itemname": new RegExp(filters['itemname'], 'i') }
            } else if ("description" in filters) {
                query = { "description": { $eq: filters['description'] } }
            } else if ("effect" in filters) {
                query = { "effect": { $eq: filters['effect'] } }
            } else if ("itemslot" in filters) {
                query = { "itemslot": { $eq: filters['itemslot'] } }
            } else if ("id" in filters) {
                console.log(filters.id)
                console.log(ObjectId(filters.id))
                query = { "_id": { $eq: ObjectId(filters.id) } }



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
    static async getItemByID(id) {
        try {

            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "Comments",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$item_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "comments",
                    },
                },
                {
                    $addFields: {
                        comments: "$comments",
                    },
                },
            ]
            return await midb.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getItemByID: ${e}`)
            throw e
        }
    }




    static async addItem(itemId, user, description, itemname, itemslot, effect, date) {
        try {
            const itemDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                itemname: itemname,
                description: description,
                effect: effect,
                itemslot: itemslot,
                item_id: ObjectId(itemId)
            }
            return await midb.insertOne(itemDoc)
        } catch (e) {
            console.error(`Unable to post new item: ${e}`)
            return { error: e }
        }
    }

    static async updateItem(itemId, userId, description, itemname, itemslot, effect, date) {
        try {

            const updateResponse = await midb.updateOne(
                { user_id: userId, _id: ObjectId(itemId) },
                { $set: { itemname: itemname, description: description, effect: effect, itemslot: itemslot, date: date } },
            )

            return updateResponse

        } catch (e) {
            console.error(`Unable to update this item: ${e}`)
            return { error: e }
        }
    }

    static async deleteItem(itemId, userId) {
        try {
            const deleteResponse = await midb.deleteOne({
                _id: ObjectId(itemId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete this item: ${e}`)
            return { error: e }
        }
    }
    static async getItemslots() {
        let itemslots = []
        try {
            itemslots = await midb.distinct("itemslot")
            return itemslots
        } catch (e) {
            console.error(`Unable to get item by slot, ${e}`)
            return itemslots
        }
    }


}