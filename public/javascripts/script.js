const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const addrress = document.querySelector('#address');
const temperature = document.querySelector('#temperature');
const summary = document.querySelector('#summary');

messageOne.textContent = '';


messageOne.textContent = 'Loading...';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser.');
}

// Use geolocation
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let location = '';

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}.json?access_token=pk.eyJ1IjoibWlsYWRtaWtlYWwiLCJhIjoiY2p3YmJxMzI1MDMybTN5cDQ5Mno0bjIzYyJ9.GYj7toEiMPBAPtNRe3WTVA&limit=1`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      location = data.features[0].place_name;
      return location;
    })
    .then(location => {
      fetch(`/weather?address=${location}`)
        .then(response => {

          response.json()
            .then(data => {
              if (data.error) {
                messageOne.textContent = data.error;
              } else {
                messageOne.textContent = '';
                address.textContent = data.location;
                temperature.textContent = `It is currently ${data.temperature} degrees.`;
                summary.textContent = data.summary;

              }
            });
        });
    })
    .catch(err => console.log(err))
});


// Handle submit action
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchValue = search.value;

  fetch(`/weather?address=${searchValue}`)
    .then(response => {
      messageOne.textContent = 'Loading...';
      response.json()
        .then(data => {
          if (data.error) {
            messageOne.textContent = data.error;
          } else {
            messageOne.textContent = '';
            address.textContent = data.location;
            temperature.textContent = `It is currently ${data.temperature} degrees.`;
            summary.textContent = data.summary;
          }
        });
    });
});

