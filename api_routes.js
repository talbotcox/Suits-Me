var ctrls = require('./controllers');
var apiRouter = require('express').Router();

apiRouter.route('/plates')
  .get(ctrls.platesController.all)


module.exports = apiRouter
