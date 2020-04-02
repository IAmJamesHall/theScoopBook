const express = require('express');
const router = express.Router();
const { User } = require('../models');


const { asyncHandler } = require('../bin/helpers');
  
  // GET currently authenticated user
  router.get('/', asyncHandler( async(req, res) => {
    if (res.locals.user) {
      res.json(res.locals.user);
    } else {
      res.status(401).end();
    }
  }));

  // POST new user
  router.post('/', asyncHandler( async(req, res) => {
    if (res.locals.user.adminPermissions) { //must be admin
      try {
        User.create(req.body);
        res.status(204).end();
      } catch (error) {
        res.status(400).end();
      }
    } else { //unauthorized
      res.status(401).end();
    }
  }));

  
  module.exports = router;