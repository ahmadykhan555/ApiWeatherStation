const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first: String,
    email: { type:String, unique:true },
    password: String
},{timestamps:true});

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) { return next()};
    bcrypt.hash(user.password, 10).then(hashedPassword => {
        console.log('hashed: ', hashedPassword);
        next();
    })

});

module.exports = mongoose.model('user', userSchema);