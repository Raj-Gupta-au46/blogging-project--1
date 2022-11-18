const { response } = require('express')
const jwt = require('jsonwebtoken')
const newblog = require('../model/newblog')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(404).send({ status: false, msg: "token is required" })
        }
        let decodedToken = jwt.verify(token, "BloggingProject-01")
        if (!decodedToken) {
            return res.status(401).send({ msg: "request denied" })
        }
        req["x-api-key"] = decodedToken
        //console.log( req["x-api-key"])
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
}

const autherisatioin = async function (req, res, next) {
    // let userEmail = req.body.email
    //     let userPassword = req.body.password
    // let token = jwt.sign({ authorId: userEmail, password: userPassword }, "BloggingProject-01")
    // res.status(201).send({ status: true, msg: token })
    // console.log(token)

    // let decodedToken = jwt.verify(token, "BloggingProject-01")
    // if (!decodedToken) {
    //     return res.status(401).send({ status: false, msg: "request denied" })
    // }
    // let userDetail = req.params.authorId
    // let tokenVerify = decodedToken.authorId
    // if (userDetail != tokenVerify) {
    //     return res.status(400).send({ msg: "user is unauthorised" })
    // }
    let authorId = req["x-api-key"].authorId

    console.log(authorId)

    let authoridFromQuery = req.query.authorId
    let blogId = req.params.authorId
    console.log(blogId)
    console.log(authoridFromQuery)

    if (blogId) {
        let blog = await newblog.findById(blogId)
        if (!blog) {
            return res.status(404).send({ status: false, msg: "blog not found" })
        }
        if (blog.authorId != authorId) {
            return res.status(403).send({ status: false, msg: "unauthorised" })
        } else {
            next()
        }

    }

    if (authoridFromQuery) {
        let blog = await newblog.findById(authoridFromQuery)
        if (!blog) {
            return res.status(404).send({ status: false, msg: "blog not found" })
        }
        if (blog.authorId != authorId) {
            return res.status(403).send({ status: false, msg: "unauthorised" })
        } else {
            next()
        }

    }
}


module.exports.authentication = authentication
module.exports.autherisatioin = autherisatioin