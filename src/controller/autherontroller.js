
const newblog = require("../model/newblog");
const newblogauthor = require("../model/newBlogauthor");
const moment = require("moment")
const jwt = require("jsonwebtoken")
const validators = require("validators");


const authors = async function (req, res) {
    try {
        let data = req.body;
        let { fname, lname, title, email, password } = data;
        if (!fname || !lname || !title || !email || !password) {
            return res.status(400).send({ msg: "all fields are mandatory" })
        }
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

        let verifyEmail = regex.test(email)
        if (!verifyEmail) {
            return res.status(400).send({ status: false, msg: "invalid email type" })
        }
        let regex1 = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/
        let verifypassword = regex1.test(password)
        if (!verifypassword) {
            return res.status(400).send({ status: false, msg: "invalid password type" })
        }

        let unique = await newblogauthor.findOne({ email: email })
        if (unique) {
            return res.status(400).send({ status: false, msg: "email should be unique" })
        }

        let savedata = await newblogauthor.create(data);
        return res.status(201).send({ msg: savedata });

    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }
};

const blogs = async function (req, res) {
    try {
        let data = req.body;
        let { title, body, authorId, tags, category, subcategory } = data;

        if (!title || !body || !authorId || !tags || !category || !subcategory) {
            return res.status(400).send("All fields are mandatory")
        }
        if (newblog.isPublished == true) {
            newblog.publishedAt = { timestamp: true };

        }
        let savedata = await newblog.create(data);
        return res.status(201).send({ msg: savedata });
    } catch (err) {
        return res.status(500).send(err.message)
    }
};

const getblogs = async function (req, res) {

    try {
        const data = req.query
        const authorId = data.authorId1
        if (!data) {
            return res.status(400).send({ status: false, msg: 'Data is required to find blog' })
        }
        const findBlog = await newblog.findOne({ _id: authorId })
        console.log(findBlog);


        return res.status(200).send({ status: true, data: findBlog })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
};


// const updateblogs = async function (req, res) {
//     try {
//         let data = req.params.authorId;
//         let data1 = req.body;
//         let { title, body, category, tags, subcategory } = data1
//         console.log(data);
//         console.log(data1);
//         if (!data) {
//             return res.status(404).send({ msg: "user not found" })
//         }

//         if (Object.entries(data1) == 0) {
//             res.status(400).send({ msg: "bad request" })

//         }
//         let obj = {}

//         obj["$addToSet"] = {};

//         if ((Object.entries(title).length >= 0)) {

//             let data1 = await newblog.findByIdAndUpdate({ _id: data }, { $set: { title } }, { new: true })
//             obj.data1
//             obj.title = title

//             return res.status(200).send({ status: true, msg: data1 })
//         }
//         if (body || category || tags || subcategory) {
//             let data1 = await newblog.findOneAndUpdate({ _id: authorId }, { $push: { body, category, tags, subcategory } }, { new: true })

//         }
//         if (category) {
//             obj["$addToSet"]

//         }
//         let data2 = await newblog.findOneAndUpdate({ _id: authorId }, obj)
//         return res.status(200).send({ status: true, msg: data2 })


//     }
//     catch (err) {
//         return res.status(500).send({ msg: "server error" })
//     }
// }


// const updateblogs = async function (req, res) {
//     try {
//         let blogId = req.params.blogId;
//         let blogData = req.body;
//         let updateBlog = await BlogModel.findOneAndUpdate(
//             { _id: blogId, isDeleted: false }    
//             {
//                 $set: { title: blogData.title, body: blogData.body, isPublished: true, publishedAt: new Date() }  //want to update or push
//                 $push: { tags: blogData.tags, subcategory: blogData.subcategory }
//             }
//         }
        
//             }

//             { new: true })

//         if (!updateBlog) {
//             return res.status(404).send({ msg: 'Blog not found' })
//         }
//         return res.status(200).send({ status: true, msg: updateBlog })

//     } catch (err) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }
// };

const updateblogs = async function (req, res) {
	try {
		// Getting blogId from path params
		const blogId = req.params.blogId;
		// Incoming modifiedBody object from middleware in req.modifiedBody which we are storing in updateData
		const updateData = req.body;
        let {title,body,tags,subcategory} = updateData
		//Creating a dynamic object for storing key and value pairs incoming from body
		let obj = {};

		const ifPublished = await newblog.findOne({_id:blogId});
        console.log(ifPublished);
		if (ifPublished.isPublished == false) {
			obj.isPublished = true;
			obj.publishedAt = new Date();
		}
		// "$addToSet" adds only those elements that are not already present
		obj["$addToSet"] = {};

		if (title) obj.title = title;
		if (body) obj.body = body;
		if (tags) obj["$addToSet"]["tags"] = [...tags];
		if (subcategory)
			obj["$addToSet"]["subcategory"] = { $each: [...subcategory] };

		// Providing the obj as the updation we want in findByIdAndUpdate
		const updatedBlog = await newblog
			.findByIdAndUpdate(blogId, obj, {
				new: true,
			})
			.populate("authorId");
		res
			.status(200)
			.send({ status: true, msg: "Successfully updated", data: updatedBlog });
	} catch (err) {
        console.log(err);
		res.status(500).send({ status: false, msg: err });
	}
};




const deletebyparams = async function (req, res) {
    try {
        let authorId = req.params.newblog


        await newblog.findOneAndUpdate({ _id: authorId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        res.status(200).send({ status: true, data: "deleted successfully" })
    }
    catch (err) {
        return res.status(500).send({ status: true, msg: err.message })
    }
}




const delBySpecificField = async function (req, res) {
    try {
        let data = req.query

        if (Object.entries(data).length == 0) {
            return res.status(400).send({ status: false, msg: "incorrect request" })
        }
        if (data.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "block does not exist" })
        }


        let result = await newblog.findOneAndUpdate({ data: data }, { $set: { isDeleted: true } }, { new: true })
        console.log(result)
        return res.status(200).send({ status: true, msg: result })

    }
    catch (err) {
        return res.status(500).send({ msg: err.msg })
    }
}





const login = async function (req, res) {
    try {
        let userEmail = req.body.email
        let userPassword = req.body.password
        let userDetail = await newblogauthor.findOne({ email: userEmail, password: userPassword })
        if (!userDetail) {
            res.status(400).send({ msg: "username or password doesn't match " })
        }
        let token = jwt.sign({ authorId: userDetail._id }, "BloggingProject-01")
        res.status(201).send({ status: true, msg: token })
        console.log(token)
    }
    catch (err) {
        return res.status(500).send({ msg: err.message })
    }

}




module.exports.updateblogs = updateblogs
module.exports.authors = authors;
module.exports.blogs = blogs;
module.exports.getblogs = getblogs;
module.exports.deletebyparams = deletebyparams;
module.exports.delBySpecificField = delBySpecificField;
module.exports.login = login;





