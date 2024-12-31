const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const fileInput = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview img');
const effectImages = document.querySelectorAll('.effects__item .effects__preview');


const handleFileUpload = () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const filename = file.name.toLowerCase();
  const isValidExtension = ALLOWED_EXTENSIONS.some((ext) => filename.endsWith(ext));

  if (isValidExtension) {
    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;
    effectImages.forEach((img) => {
      img.style.backgroundImage = `url(${imageURL})`;
    });
  }
};

fileInput.addEventListener('change', handleFileUpload);
