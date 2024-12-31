const ServerUrl = 'https://29.javascript.htmlacademy.pro/kekstagram';
const ApiRoutes = {
  FetchData: '/data',
  SubmitData: '/'
};

const HttpMethods = {
  Get: 'GET',
  Post: 'POST'
};

const ErrorMessages = {
  FetchData: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SubmitData: 'Не удалось отправить форму. Попробуйте ещё раз'
};

const fetchData = (route, errorMessage, method = HttpMethods.Get, requestBody = null) =>
  fetch(`${ServerUrl}${route}`, { method, body: requestBody })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => fetchData(ApiRoutes.FetchData, ErrorMessages.FetchData);
const sendData = (requestBody) => fetchData(ApiRoutes.SubmitData, ErrorMessages.SubmitData, HttpMethods.Post, requestBody);

export { getData, sendData };
