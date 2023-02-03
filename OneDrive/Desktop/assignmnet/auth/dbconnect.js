const { default: mongoose } = require("mongoose")


const dbCoonect = async()=>{
    return await mongoose.connect('mongodb://127.0.0.1:27017/myapp')
}

module.exports = dbCoonect