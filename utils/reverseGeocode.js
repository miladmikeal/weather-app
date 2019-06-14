const request = require('request');
require('dotenv/config');

const geocode = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}.json?access_token=pk.eyJ1IjoibWlsYWRtaWtlYWwiLCJhIjoiY2p3YmJxMzI1MDMybTN5cDQ5Mno0bjIzYyJ9.GYj7toEiMPBAPtNRe3WTVA&limit=1`;

    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject('Unable to connect to location services');
      } else if (body.features.length === 0) {
        reject('Invalid search location.');
      } else {
        resolve({
          location: body.features[0].place_name
        });
      }
    });
  })
};


module.exports = geocode;