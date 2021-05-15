const mongoose = require("mongoose");
const config = require('../../connection');

const quizSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  question: {
    type: String,
    required: true,
  },
  right_answear: {
      type: String,
      required: true
  },
  wrong_answear1: {
    type: String,
    required: true
  },
  wrong_answear2: {
    type: String,
    required: true
  },
  wrong_answear3: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Quiz", quizSchema);
var Lesson = mongoose.model("Quiz", quizSchema); 

module.exports.getQuestionById = function (id, callback){
  Lesson.findById(id, callback);
}

module.exports.getQeustionByName = function (lesson, callback){
  const query = {lesson: lesson};
  Lesson.findOne(query, callback);
}

module.exports.addQuiz = function (newLesson, callback){
      newLesson.save(callback);
      console.log("added quiz  (model)");
}



