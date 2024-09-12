const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  title: { type: String, required: true },
  questions: [{ 
    text: String, 
    options: [String], 
    correctOption: Number 
  }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;