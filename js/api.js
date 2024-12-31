const url = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = (load, fail) => {
  fetch(`${url}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(load)
    .catch(fail);
};

const sendData = (load, fail, body) => {
  fetch(url, {
    method: 'POST',
    body: body,
  })
    .then(load)
    .catch(fail);
};

export {getData, sendData};
