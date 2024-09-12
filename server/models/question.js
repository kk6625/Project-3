const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      optionText: String,
      isCorrect: Boolean
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);