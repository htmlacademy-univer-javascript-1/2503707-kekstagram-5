const scaleInput = document.querySelector('.scale__control--value');
const increaseButton = document.querySelector('.scale__control--bigger');
const decreaseButton = document.querySelector('.scale__control--smaller');
const imagePreview = document.querySelector('.img-upload__preview');
const maxValue = 100;
const minValue = 25;
const scaleStep = 25;

function updateScale(value) {
  scaleInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
}

function handleScaleChange(isIncrease) {
  let currentScale = parseInt(scaleInput.value.replace('%', ''), 10);
  currentScale += isIncrease ? scaleStep : -scaleStep;
  currentScale = Math.min(maxValue, Math.max(minValue, currentScale));
  updateScale(currentScale);
}

function scaleImg() {
  decreaseButton.addEventListener('click', () => handleScaleChange(false));
  increaseButton.addEventListener('click', () => handleScaleChange(true));
}

export { scaleImg };
