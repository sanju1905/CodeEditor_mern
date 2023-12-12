const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuesSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    question: {
        type: String,
        required: true
    },

    video: {
        type: String,
        required: true,
        
    },
    code: {
        type: String,
        required: true,
        
    }
});
module.exports = mongoose.model('Ques', QuesSchema); //quiz is model name