import CommentsDAO from "../dao/commentsDAO.js"

export default class CommentsController {
    static async apiPostComment(req, res, next) {
        try {
            const itemId = req.body.item_id
            const comment = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
                userimg: req.body.user_img
            }
            const date = new Date()

            const commentResponse = await CommentsDAO.addComment(
                itemId,
                userInfo,
                comment,
                date,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateComment(req, res, next) {
        try {
            const commentId = req.body.comment_id
            const text = req.body.text
            const date = new Date()

            const commentResponse = await CommentsDAO.updateComment(
                commentId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = commentResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (commentResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update comment - user may not be original poster",
                )
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteComment(req, res, next) {
        try {
            console.log(req)
            const commentId = req.query.id
            const userId = req.body.user_id
            console.log(commentId)
            const commentResponse = await CommentsDAO.deleteComment(
                commentId,
                userId,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

}