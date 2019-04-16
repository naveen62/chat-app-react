const express = require('express');
const router = express.Router();
const {
    User
} = require('../models/user');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    // User.create(req.body).then((user) => {
    //     res.status(201).json(user);
    // }).catch((err) => {
    //     res.status(500).send(err);
    // })
})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.send({
            user,
            token
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
})
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
})
router.post('/logoutall',auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(err) {
        res.status(500).send()
    }
})
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('chats').exec();
        res.send({
            user,
            token:req.token,
            chats:user.chats
        });
    } catch(e) {

    }
})
router.patch('/me',auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body).length > 0 && Object.keys(req.body);
        const allowedUpdates = ['name', 'username', 'age', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) return res.status(400).send({
            error: 'Invalid updates'
        });
        const user = req.body;
        // const userUpdated = await User.findByIdAndUpdate(id, user, {
        //     new: true,
        //     runValidators: true
        // });
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
        const userUpdated = await req.user.save();
        res.send(userUpdated);
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
})
router.delete('/me',auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) res.status(404).send()
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
})
router.get('/search/:name', auth, async (req, res) => {
    console.log(req.params.name);
    try {
        const searchUsers = await User.findOne({username:req.params.name});
        res.send(searchUsers);
    } catch(e) {
        console.log(e)
    }

})

module.exports = router