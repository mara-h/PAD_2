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
//const checkAuth = require("../middleware/check-auth");
//const usersController = require("../controllers/user");
// maybe req database?

/*
patch request should look like
[
	{ "propName": "admin", "value": "1"},
	{ "propName": "password", "value": "pass"}
]
*/

/*router.get("/", checkAuth, usersController.user_get_all);

router.post("/login", usersController.user_login);

router.post("/register", usersController.user_register);

router.get("/:userId", checkAuth, usersController.users_get_id);

//router.patch("/:userId", checkAuth, usersController.user_patch);

//router.delete("/:userId", checkAuth, usersController.user_delete);
*/

router.post('/register', (req, res, next) =>{
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		repassword: req.body.repassword
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

	User.getUserByUsername( username, (err, user) => {
		if(err) throw err;
		if(!user){
			console.log("get user by username !user ");
			return res.json({success: false, msg: 'user not found'});
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			console.log("a intrat in compare password getubpsw routes ");

			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({user}, config.secret,{
					expiresIn: 604800 // 1 week
				});
				res.json({
					success: true,
					token: 'JWT' + token,
					user:{
						id: user._id,
						username: user.username,
						email: user.email
					}
				});
			}
			else {
				return res.json({ success: false, msg: 'Wrong password'});
			}
		});
	});
});


router.get('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user})
});
module.exports = router;