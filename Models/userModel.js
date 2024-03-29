const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    pass:{type:String,required:true},
    email:{type:String,required:true},
},{
    versionKey:false
})

const UserModel = mongoose.model("blog",userSchema) // user is collection name and it should be singuler.

module.exports = {
    UserModel
}