const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    chats:[{
        type:mongoose.Schema.Types.String,
        ref:'Chat'
    }]
}) 
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'sec123');

    user.tokens = user.tokens.concat({token})
    await user.save();

    return token;
}
userSchema.methods.toJSON = function() {
    const user =this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
userSchema.statics.findByCredentials = async function(username, password) {
    const user = await User.findOne({username}).populate('chats').exec();
    if(!user) {
          throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Unable to login password');
    return user;
}
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})
userSchema.index({username:'text'})

const User = mongoose.model('User', userSchema);


module.exports = {
    User
}