const request = require('request');
require('dotenv/config');

const forecast = (latitude, longitude, callback) => {
  const url = `${process.env.DARK_SKY}${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        summary: body.daily.data[0].summary
      });
    }
  });
};

module.exports = forecast;