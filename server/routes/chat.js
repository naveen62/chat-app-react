const {Chat} = require('../models/chat')
const {User} = require('../models/user');
const express = require('express');
const Router = express();
const auth = require('../middleware/auth');
const uniqid = require('uniqid');

Router.post('/new',auth, async (req, res) => {
    try {
        const chatUser = await User.findOne({username:req.body.name});
        if(chatUser) {
            console.log('test enter')
            const chat = await Chat.create({
                friends:[req.user.username, chatUser.username],
                chat:[],
                unique: uniqid()
            })
        const user1 = await User.findOneAndUpdate({username:req.body.name},{
            $push:{chats: chat._id}
        }, {new:true})
        const user2 = await User.findOneAndUpdate({username:req.user.username},{
            $push:{chats: chat._id}
        }, {new:true})              
        res.send(chat);
        } else {
            throw new Error()
        }     
    } catch(e) {
        res.send({
            err:true
        })
    }
})
module.exports = Router