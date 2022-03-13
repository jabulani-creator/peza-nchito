import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true,'please provide email'],
        unique: true,
        validate:{
            validator: validator.isEmail,
            message:'Please provide valid email'
            }
    },
    password: {
        type: String,
        required: [true,'please provide password'],
        minlength: 6,
        select: false,
    },
    lastName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'lastname'
    },
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: 'my city'
    }
})

userSchema.methods.createJWT = function(){
    const user = this
    return jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })

}
userSchema.pre('save', async function() {
 const user = this

  if(!user.isModified('password')) return
 const salt = await bcrypt.genSalt(10)
 user.password = await bcrypt.hash(user.password, salt)
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// userSchema.methods.toJSON = function(){
//     const user = this
//     const userObject = user.toObject()
//     delete userObject.password
//     return userObject
// }

export default mongoose.model('User', userSchema)