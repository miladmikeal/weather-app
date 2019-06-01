var express = require('express');
var router = express.Router();
var geocode = require('../utils/geocode');
var forecast = require('../utils/forecast');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, { temperature, summary }) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        location,
        temperature,
        summary
      });
    });
  });
});

module.exports = router;
