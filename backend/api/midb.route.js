import express from 'express'
import MidbController from "./midb.controller.js"
import CommentsController from './comments.controller.js'
import jwt from 'express-jwt'
import jwtAuthz from 'express-jwt-authz'
import jwksRsa from 'jwks-rsa'





const deleteScope = jwtAuthz(['delete:items'], {
    customScopeKey: 'permissions',
    checkAllScopes: true
});
const updateScope = jwtAuthz(['update:items'], {
    customScopeKey: 'permissions',
    checkAllScopes: true
});
const addScope = jwtAuthz(['add:items'], {
    customScopeKey: 'permissions',
    checkAllScopes: true
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-68wzb9bz.us.auth0.com/.well-known/jwks.json`
    }),

    audience: 'localhost:5000/api/v1/midb',
    issuer: [`https://dev-68wzb9bz.us.auth0.com/`],
    algorithms: ['RS256']
});


const router = express.Router()

router.route("/items").get(MidbController.apiGetItems)
router.route("/item").get(MidbController.apiGetItemById)
router.route("/itemslots").get(MidbController.apiGetItemslots)






router
    .route("/items")
    .post(checkJwt, addScope, MidbController.apiPostItem)
    .put(checkJwt, updateScope, MidbController.apiUpdateItem)
    .delete(checkJwt, deleteScope, MidbController.apiDeleteItem)

router
    .route("/comment")
    .post(CommentsController.apiPostComment)
    .put(CommentsController.apiUpdateComment)
    .delete(CommentsController.apiDeleteComment)


export default router