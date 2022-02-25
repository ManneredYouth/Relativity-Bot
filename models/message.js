const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    }
})

const MessageModel = mongoose.model('message', MessageSchema)
module.exports = MessageModel