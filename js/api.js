const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const HttpMethods = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorMessages = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const fetchData = (route, errorMessage, method = HttpMethods.GET, requestBody = null) =>
  fetch(`${BASE_URL}${route}`, {method, requestBody})
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => fetchData(Route.GET_DATA, ErrorMessages.GET_DATA);
const sendData = (requestBody) => fetchData(Route.SEND_DATA, ErrorMessages.SEND_DATA, HttpMethods.POST, requestBody);

export {getData, sendData};
