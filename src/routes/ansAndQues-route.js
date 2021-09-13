'use strict';

const express = require('express');
const router = express.Router();

const {answers , questions} = require('../models/index')
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');



router.post('/question', bearerAuth, permissions('ask'), async (req, res, next) => {
    let ques = req.body;
    try {
        const questionRecord = await questions.create(ques);
        const output = {
            question : questionRecord
        }
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
  });

  router.post('/answer', bearerAuth, permissions('answer'), async (req, res, next) => {
    let ans = req.body;
    try {
        const answerRecord = await answers.create(ans);
        const output = {
            answer : answerRecord
        }
        res.status(201).json(output);
    } catch (e) {
        next(e.message)
    }
  });
  

  module.exports = router;