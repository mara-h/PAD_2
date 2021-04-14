const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const usersController = require("../controllers/user");

/*

patch request should look like

[
	{ "propName": "admin", "value": "1"},
	{ "propName": "password", "value": "pass"}
]

*/

router.get("/", checkAuth, usersController.user_get_all);

router.post("/login", usersController.user_login);

router.post("/register", usersController.user_register);

router.get("/:userId", checkAuth, usersController.users_get_id);

//router.patch("/:userId", checkAuth, usersController.user_patch);

//router.delete("/:userId", checkAuth, usersController.user_delete);

module.exports = router;
