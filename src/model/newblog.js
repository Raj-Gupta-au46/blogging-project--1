const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const newBlog = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            body: String
        },
        userId: {
            type: ObjectId,
            ref: "NewUser"
        },
        tags: [String],
        category: {
            type: String,
            require: true

        },
        subcategory: {
            type: [String],
            createdAt: String,
            updateAt: String,
            deletedAt: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        publishedAt: String,
        isPublished: {
            type: Boolean,
            default: false
        },


    },




    { timestamp: true }
)




module.exports = mongoose.model("Newblogs", newBlog);