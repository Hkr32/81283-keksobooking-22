function getData(onSuccess, onFail) {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
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
    'https://22.javascript.pages.academy/keksobooking',
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
