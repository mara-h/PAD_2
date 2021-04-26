const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require('../../connection'); //?

const userSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { 
    type: String, 
    required: true }
});

module.exports = mongoose.model("User", userSchema);
var User = mongoose.model("User", userSchema); //?

module.exports.getUserById = function (id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback){
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback){
  bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(newUser.password,salt, (err, hash) =>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
      console.log("added user  (model)");
    });
  });
}

module.exports.comparePassword = function (candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
    console.log("Conmpared psw model")
  });
}


