const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../connection');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', (req, res, next) =>{
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		repassword: req.body.repassword,
		
	});

	User.addUser(newUser,(err,user) =>{
		if(err){
			res.json({success: false, msg: 'Failed to register user'});
		}
	});
});

router.post('/login', (req, res, next) =>{
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

				/*res.json({
					success: true,
					//token: 'JWT' + token,
					//user:{
						id: user._id,
						username: user.username,
						email: user.email
					//}
					*.
				});
				//console.log(token, user.username, user.email);

				/*res.status(200).send({
					accessToken: token,
					id: user._id,
					username: user.username,
					*/
			}
			else {
				res.status(401);
				return res.json({ success: false, msg: 'Wrong password'});
			}
		});
	});
});


router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user})
});
module.exports = router;