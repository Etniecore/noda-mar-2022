const {Schema, model} = require('mongoose');

const userSchema = new Schema({//db schema for user
    name: {type: String, trim: true, required: true},
    age: {type: Number, default: 18},
    email: {type: String, required: true, lowercase: true, trim: true},
    password: {type: String, required: true},
    cars: {
        type: [Schema.Types.ObjectId],
        ref: 'car',
        select: false
    }
}, {timestamps: true, versionKey: false});

module.exports = model('user', userSchema)