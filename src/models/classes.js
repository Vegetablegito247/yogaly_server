const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tutor: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Classes = mongoose.model('Class', classSchema);
module.exports = Classes;