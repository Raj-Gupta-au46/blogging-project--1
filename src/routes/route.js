const express = require('express')
const router = express.Router();
const authermodel = require("../model/newBlogauthor")
const blogmodel = require("../model/newblog")
const controller = require("../controller/autherontroller")
const middleware = require("../Middleware/auth")

router.post("/authors", controller.authors)
router.post("/blogs", middleware.authentication, controller.blogs)
router.get("/blogs", middleware.authentication, controller.getblogs)
router.put("/blogs/:blogId", middleware.authentication, middleware.autherisatioin, controller.updateblogs)
router.delete("/blogs/:blogId", middleware.authentication, middleware.autherisatioin, controller.deletebyparams)
router.delete("/blogs", middleware.authentication, middleware.autherisatioin, controller.delBySpecificField)
router.post("/login", controller.login)



module.exports = router;