var express = require('express');
var router = express.Router();
var geocode = require('../utils/geocode');
var forecast = require('../utils/forecast');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  try {
    const geoCode = await geocode(req.query.address);
    const foreCast = await forecast(geoCode.latitude, geoCode.longitude);
    res.send({
      location: geoCode.location,
      temperature: foreCast.temperature,
      summary: foreCast.summary
    })
  } catch (error) {
    return res.send({ error })
  }
})


module.exports = router;
