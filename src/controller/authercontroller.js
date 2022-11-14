const authorModels = require("../model/newblogauthor");
const authorblog = require("../model/newblog");
const newblog=require("../model/newblog")
//const jwt = require("jsonwebtoken")
// const {
//   isValid,
//   isValid2,
//   isValidEmail,
//   isValidPassword,
//   isValidBody
// } = require('../utils/validator')

const creatAuthor = async function(req,res){
 try{
    let data = req.body;
    let {firstname,lastname,title,emailId,password}=data;
    if(!firstname||!lastname||!title||!emailId||!password){
        res.status(400).send({msg:"all fields are mandatory"})
    }
//    let verifyEmail=regex.test(email)
//    if(!verifyEmail){
//     return res.status(400).send({status:false,msg:"invalid email"})
//    }
    
    let savedata =await authorModels.create(data);
    res.status(201).send({msg: savedata});

 }
 catch(err) {
    res.status(500).send({msg:err.message})
 }
};

const createblog =async function(req,res){
    try{
        let data = req.body;
        let { title, body, userId, tags, category, subcategory} = data;
    
        if (!title || !body || !userId || !tags || !category ||!subcategory) {
                res.status(400).send("All fields are mandatory")
        }
    let savedata=await authorblog.create(data);
    res.status(201).send({msg:savedata});
}catch(err){                                                                            
    res.status(500).send(err.message) 
  }
};

const creatnewblog =async function(req,res){
    // try{
    //     let data=req.query.userId
    //     let data1=req.query.category
    //     let data2=req.query.tags
    //     let data3=req.query.subcategory
    //     if(userId!==ObjectId){
    //         res.status(401).send({msg:"not a valid Id"})
    //     }
    //     let userDetails=await authorModels.findById({userId});
    // res.status(200).send({msg :userDetails})
    // }
    // catch(err){
    //     res.status(500).send({msg:err.message})
    // }
    try {
        const data = req.query
        const {userId} = data
        if(!data){
            return res.status(400).send({status : false, msg : 'Data is required to find blog'})
        }
        const findBlog = await authorModels.findById({ _id: userId } )
        // || { category: category } || { tag: tag } || { subCategory: subCategory })
         return res.status(200).send({ status: true, data: findBlog })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
};


module.exports.creatAuthor=creatAuthor;
module.exports.createblog=createblog
module.exports.creatnewblog=creatnewblog
















//let data=req.query.userId;
//if(data){
    //if(!isValidId(data)){
//yjdk
   // }
//}