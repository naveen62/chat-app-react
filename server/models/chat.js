const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    friends:[],
    chat:[{
        from:String,
        text:String,
        created:String
    }],
    unique:String

})
const Chat = mongoose.model('Chat', chatSchema);

module.exports = {
    Chat
}