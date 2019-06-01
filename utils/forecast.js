const request = require('request');


const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/b3a93dc889aa70f1b0b8d8a18c7cb619/${latitude},${longitude}`;

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