import { GET_DATA_URL, SEND_DATA_URL } from './data.js';

function getData(onSuccess, onFail) {
  return fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
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
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch((error) => {
      onFail(error);
    });
}

export { getData, sendData };
