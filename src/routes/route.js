const express=require('express')
const router=express.Router();
const authermodel=require("../model/newBlogauthor")
const blogmodel=require("../model/newblog")
const controller=require("../controller/autherontroller")
const middleware=require("../Middleware/auth")

router.post("/creatAuthor",controller.creatAuthor)
router.post("/createblog",middleware.authentication,controller.createblog)
router.get("/getBlog",middleware.authentication,controller.getBlog)
//router.put("/updateauthdata/:authorId",middleware.authentication,middleware.autherisatioin,controller.updateauthdata)
router.delete("/deleteAuthor/:authorId",middleware.authentication,middleware.autherisatioin,controller.deleteAuthor)
router.delete("/delBySpecificField",middleware.authentication,middleware.autherisatioin,controller.delBySpecificField)
router.post("/loginUser",controller.loginUser)



module.exports=router;