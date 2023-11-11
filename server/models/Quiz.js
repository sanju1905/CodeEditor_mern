const mongoose = require('mongoose');
const {Schema} = mongoose;

const QuizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true,
        
    },option2: {
        type: String,
        required: true,
        
    },option3: {
        type: String,
        required: true,
        
    },option4: {
        type: String,
        required: true,
        
    },
    answer: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('Quiz', QuizSchema); //quiz is model name