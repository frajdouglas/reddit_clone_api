const { selectCommentsByArticle, insertComment, deleteComment } = require('../models/comments.model')
const { handleCustomErrors } = require('./errors.controller')

exports.getCommentsByArticle = (req, res, next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION getCommentsByArticle")
    const { article_id } = req.params

    selectCommentsByArticle(article_id)
        .then((rows) => {
            res.status(200).send({ comments: rows })
        })
        .catch(next)
}

exports.addComment = (req, res, next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION addComment")
    const { article_id } = req.params
    const { username } = req.body
    const { body } = req.body

    insertComment(article_id, username, body)
        .then((databaseResponse) => {
            res.status(201).send({ addedComment: databaseResponse })
        })
        .catch(next)
}


exports.removeComment = (req, res, next) => {
    console.log("IN THE COMMENTS CONTROLLERS FILE IN THE FUNCTION removeComment")
    const { comment_id } = req.params
    deleteComment(comment_id)
        .then(() => {
            res.status(204).send()
        })
        .catch(next)
}