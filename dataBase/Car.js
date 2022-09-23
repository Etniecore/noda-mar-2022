const {Schema, model} = require('mongoose');

const carSchema = new Schema({//db schema for cars
    model: {type: String, trim: true, required: true},
    year: {type: Number, required: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps:true,
    versionKey:false
})

module.exports = model('car', carSchema);