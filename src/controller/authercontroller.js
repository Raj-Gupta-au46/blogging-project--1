const authorModels = require("../model/newblogauthor");
const authorblog = require("../model/newblog");
const { update } = require("../model/newblog");
const newblog = require("../model/newblog");
const newblogauthor = require("../model/newblogauthor");
const moment = require("moment")


const creatAuthor = async function (req, res) {
    try {
        let data = req.body;
        let { firstname, lastname, title, emailId, password } = data;
        if (!firstname || !lastname || !title || !emailId || !password) {
            res.status(400).send({ msg: "all fields are mandatory" })
        }
        //    let verifyEmail=regex.test(email)
        //    if(!verifyEmail){
        //     return res.status(400).send({status:false,msg:"invalid email"})
        //    }

        let savedata = await authorModels.create(data);
        res.status(201).send({ msg: savedata });

    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
};

const createblog = async function (req, res) {
    try {
        let data = req.body;
        let { title, body, userId, tags, category, subcategory } = data;

        if (!title || !body || !userId || !tags || !category || !subcategory) {
            res.status(400).send("All fields are mandatory")
        }
        let savedata = await authorblog.create(data);
        res.status(201).send({ msg: savedata });
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const creatnewblog = async function (req, res) {

    try {
        const data = req.query
        const userId = data.userId1
        if (!data) {
            return res.status(400).send({ status: false, msg: 'Data is required to find blog' })
        }
        const findBlog = await newblog.findOne({ _id: userId })
        console.log(findBlog);

        // || { category: category } || { tag: tag } || { subCategory: subCategory })
        return res.status(200).send({ status: true, data: findBlog })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
};

const updateauthdata = async function (req, res) {
    try {
        let data = req.params.userId;
        let data1 = req.body;


        if (!data) {
            return res.status(404).send({ msg: "user not found" })
        }

        if (data1 == 0) {
            res.status(400).send({ msg: "bad request" })
        }

        let updateData = await newblog.findByIdAndUpdate({ _id: data }, data1, { new: true })

        return res.status(200).send({ updateData })
    }
    catch (err) {
        return res.status(500).send({ msg: "server error" })
    }
}



const deleteAuthor = async function (req, res) {
    const blogId = req.params.userId
    let blog = await newblog.findById(blogId)
    if (!blog) {
        return res.status(400).send({ status: false, msg: "blogId is not found" })
    }
    if (blog.isDeleted == true) {
        return res.status(400).send({ status: false, msg: "blog does not exist" })
    }
    let markDeleted = await newblog.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true, deletedAt: moment().format() } }, { new: true })
    res.status(200).send({ status: true, data: markDeleted })
}




const delBySpecificField = async function (req, res) {
    try {
        let data = req.query
        if (data == 0) {
            return res.status(400).send({ status: false, msg: "incorrect request" })
        }
        if (data.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "block does not exist" })
        }
        let result = await newblog.findOneAndUpdate(data, { $set: { isDeleted: true } }, { new: true })
        res.status(200).send({ msg: result })
    }
    catch (err) {
        return res.status(500).send({ msg: result })
    }
}




module.exports.updateauthdata = updateauthdata
module.exports.creatAuthor = creatAuthor;
module.exports.createblog = createblog
module.exports.creatnewblog = creatnewblog
module.exports.delBySpecificField = delBySpecificField
module.exports.deleteAuthor = deleteAuthor















