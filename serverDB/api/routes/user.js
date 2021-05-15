const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Lesson = require('../models/lesson');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../connection');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', (req, res, next) =>{
	if(req.body.password === req.body.repassword){
		let newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			repassword: req.body.repassword,
			
		});
		User.addUser(newUser,(err,user) =>{
			if(err){
				res.json({success: false, msg: 'Username already exists or email is not valid'});
			}
			else{
				res.json({success: true, msg: 'register ok'});
			}
		});
	}
	else{
		return res.json({success: false, msg: 'Passwords do not match'});
	}
});

router.post('/login', (req, res, next) =>{
	console.log("tried at least to find login.")
	const username = req.body.username;
	const password = req.body.password;
	const isAdmin = req.body.isAdmin;
	
	User.getUserByUsername( username, (err, user) => {
		if(err) throw err;
		if(!user){
			console.log("get user by username !user ");
			res.status(401);
			return res.json({success: false, msg: 'user not found'});
			
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			console.log("a intrat in compare password getubpsw routes ");
			if(err) throw err;

			if(isMatch){
				var userData = {
					id: user._id,
					username: user.username,
					email: user.email
				}
				let token = jwt.sign(userData, config.secret, { expiresIn: 604800})
				res.status(200).json({
					token: token,
					username: user.username,
					isAdmin: user.isAdmin
				});
			}
			else {
				res.status(401);
				return res.json({ success: false, msg: 'Wrong password'});
			}
		});
	});
});

router.post('/lessons', (req, res, next) =>{
	console.log("tried at least to find lesson0.")
    Lesson.find()
    .select("_id name description content")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        lesson: docs.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
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

router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user})
});

module.exports = router;