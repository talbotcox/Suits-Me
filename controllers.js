var plates = require('./models')

module.exports = {
  // plates controller
  platesController: {
    all: function(req, res) {
      res.json(plates)
    }
  }
}
