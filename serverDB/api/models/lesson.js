const mongoose = require("mongoose");
const config = require('../../connection');

const lessonSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
      type: String
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Lesson", lessonSchema);
var Lesson = mongoose.model("Lesson", lessonSchema); 

module.exports.getLessonById = function (id, callback){
  Lesson.findById(id, callback);
}

module.exports.getLessonByName = function (lesson, callback){
  const query = {lesson: lesson};
  Lesson.findOne(query, callback);
}

module.exports.addLesson = function (newLesson, callback){
      newLesson.save(callback);
      console.log("added lesson  (model)");
}



