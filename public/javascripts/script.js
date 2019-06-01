const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const addrress = document.querySelector('#address');
const temperature = document.querySelector('#temperature');
const summary = document.querySelector('#summary');

messageOne.textContent = 'Loading...';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchValue = search.value;

  fetch(`http://localhost:3000/weather?address=${searchValue}`)
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
});

