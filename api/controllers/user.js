
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            { id: user[0]._id, username: user[0].username },
            process.env.__JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: hash,
        admin: 0,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Successfuly creating the user",
            createdUser: {
              _id: result._id,
              username: result.username,
              email: result.email,
              request: {
                type: "GET",
                url: "http://localhost:3000/api/user/" + result._id,
              },
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};
exports.user_get_all = (req, res, next) => {
  User.find()
    .select("_id username email password admin")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        user: docs.map((doc) => {
          return {
            _id: doc._id,
            username: doc.username,
            email: doc.email,
            password: doc.password,
            admin: doc.admin,
            request: {
              type: "GET",
              url: "http://localhost:3000/api/user/" + doc._id,
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
};
exports.users_get_id = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          _id: doc._id,
          username: doc.username,
          email: doc.email,
          password: doc.password,
          admin: doc.admin,
        });
      } else {
        res.status(404).json({
          message: "No valid entry found",
        });
      }
    })
    .catch((err) => {
      console.log("Error occurred whilist fetching data", err);
      res.status(500).json({
        error: err,
      });
    });
};
