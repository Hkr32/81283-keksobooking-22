import { GET_DATA_URL, SEND_DATA_URL } from './data.js';

function getData(onSuccess, onFail) {
  return fetch(GET_DATA_URL)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(function(json) {
      onSuccess(json);
    })
    .catch(function() {
      onFail();
    });
}

function sendData(onSuccess, onFail, body) {
  return fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
      credentials: 'same-origin',
    },
  )
    .then(function(response) {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(function(error) {
      onFail(error);
    });
}

export { getData, sendData };
