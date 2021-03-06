const Lesson = require('../models/lesson');
const express = require("express");
var mongoose = require("mongoose");
const router = express.Router();
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/getlessons', (req, res, next) =>{
	console.log("tried at least to find lesson0.")
    Lesson.find()
    .select("_id name description content")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        lesson: docs.map((doc) => {
          console.log('jbhj');
          console.log(doc._id);
          console.log(doc.name);
          console.log(doc.description);
          console.log(doc.content);
          return {
            _id: doc._id,
            name: doc.name,
            description: doc.description,
            content: doc.content,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/lesson/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

});

router.delete("/:lessonId", (req, res, next) =>{
  console.log("tries to delete something")
  const id = req.params.lessonId;
  var objectId = mongoose.Types.ObjectId;
  if (objectId.isValid(new objectId(id))) {
    Lesson.deleteOne({_id: id })
    .exec()
    .then((result) => {
        res.status(200).json({
          message: "Successfully deleted by id",
          request: {
            type: "GET",
            url: "http://localhost:3000/user",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    console.log("You passed a lesson");
  }
})


router.post('/add-lesson', (req, res, next) =>{
		let newLesson = new Lesson({
			name: req.body.name,
			description: req.body.description,
			content: req.body.content,
			
		});
		Lesson.addLesson(newLesson,(err,user) =>{
			if(err){
				res.json({success: false, msg: 'Lesson already exists'});
			}
			else{
				res.json({success: true, msg: 'Saved ok'});
			}
		});
	});

module.exports = router;
