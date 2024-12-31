import {getData} from './api.js';
const url = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const generatePhotos = async()=>{
  const photos = await getData(url);
  return photos;
};

export default generatePhotos;
