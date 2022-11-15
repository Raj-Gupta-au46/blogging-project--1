const express=require('express')
const router=express.Router();
const authermodel=require("../model/newblog.js")
const blogmodel=require("../model/newblogauthor.js")
const controller=require("../controller/authercontroller")

router.post("/creatAuthor",controller.creatAuthor)
router.post("/createblog",controller.createblog)
router.get("/createnewblog",controller.creatnewblog)
router.put("/updateauthdata/:userId",controller.updateauthdata)
router.delete("/deleteAuthor/:userId",controller.deleteAuthor)
router.delete("/delBySpecificField",controller.delBySpecificField)



module.exports=router;