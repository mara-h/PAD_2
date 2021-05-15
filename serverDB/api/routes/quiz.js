const Quiz = require('../models/quiz');
const express = require("express");
const router = express.Router();
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/getquiz', (req, res, next) =>{
	console.log("tried at least to find quizzes.")
    Quiz.find()
    .select("_id question right_answear wrong_answear1 wrong_answear2 wrong_answear3")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        quiz: docs.map((doc) => {
          return {
            _id: doc._id,
            question: doc.question,
            right_answear: doc.right_answear,
            wrong_answear1: doc.wrong_answear1,
            wrong_answear2: doc.wrong_answear2,
            wrong_answear3: doc.wrong_answear3,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/quiz/" + doc._id,
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


router.post('/add-quiz', (req, res, next) =>{
		let newQuiz = new Quiz({
			question: req.body.question,
            right_answear: req.body.right_answear,
			wrong_answear1: req.body.wrong_answear1,
			wrong_answear2: req.body.wrong_answear2,
            wrong_answear3: req.body.wrong_answear3,
			
		});
		Quiz.addQuiz(newQuiz,(err,quiz) =>{
			if(err){
				res.json({success: false, msg: 'Lesson already exists'});
			}
			else{
				res.json({success: true, msg: 'Saved ok'});
			}
		});
	});

module.exports = router;
