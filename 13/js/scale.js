const scaleInput = document.querySelector('.scale__control--value');
const increaseButton = document.querySelector('.scale__control--bigger');
const decreaseButton = document.querySelector('.scale__control--smaller');
const imagePreview = document.querySelector('.img-upload__preview');

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const DEFAULT_SCALE = MAX_SCALE;
let currentScale = DEFAULT_SCALE;

const updateScale = (value) => {
  scaleInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const handleScaleChange = (isIncrease) => {
  currentScale += isIncrease ? SCALE_STEP : -SCALE_STEP;
  currentScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, currentScale));
  updateScale(currentScale);
};

decreaseButton.addEventListener('click', () => handleScaleChange(false));
increaseButton.addEventListener('click', () => handleScaleChange(true));

const resetScale = () => {
  currentScale = DEFAULT_SCALE;
  updateScale(currentScale);
};

export { resetScale };
