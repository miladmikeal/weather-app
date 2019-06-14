const request = require('request');
require('dotenv/config');

const forecast = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.darksky.net/forecast/b3a93dc889aa70f1b0b8d8a18c7cb619/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to weather service.");
      } else if (body.error) {
        reject(body.error);
      } else {
        resolve({
          temperature: body.currently.temperature,
          summary: body.daily.data[0].summary
        });
      }
    });
  })
};


module.exports = forecast;