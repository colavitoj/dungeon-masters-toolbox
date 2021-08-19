import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let comments

export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return
        }
        try {
            comments = await conn.db(process.env.MIDB_NS).collection("Comments")
            console.log("Connection established with Comments")
        } catch (e) {
            console.error(
                `Unable to establish a connection to commentDAO: $(e)`,
            )
        }

    }

    static async addComment(itemId, user, comment, date) {
        try {
            const commentDoc = {
                name: user.name,
                user_img: user.userimg,
                user_id: user._id,
                date: date,
                text: comment,
                item_id: ObjectId(itemId),

            }

            return await comments.insertOne(commentDoc)
        } catch (e) {
            console.error(`Unable to post comment: ${e}`)
            return { error: e }
        }
    }

    static async updateComment(commentId, userId, text, date) {
        try {
            const updateResponse = await comments.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update comment: ${e}`)
            return { error: e }
        }
    }

    static async deleteComment(commentId, userId) {

        try {
            const deleteResponse = await comments.deleteOne({
                _id: ObjectId(commentId),
                user_id: userId,
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete comment: ${e}`)
            return { error: e }
        }
    }











}