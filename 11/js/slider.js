const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueElement = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');
let currentEffect = 'none';

function initializeSlider() {
  sliderContainer.classList.add('hidden');
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    sliderValueElement.value = sliderValue;
    applyEffect(sliderValue);
  });
}

function applyEffect(value) {
  switch (currentEffect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${value})`;
      break;
    case 'none':
      imagePreview.style.filter = '';
      break;
  }
}

function handleEffectSelection(event) {
  const effectItem = event.target.closest('.effects__item');
  if (!effectItem){
    return;
  }

  const effectInput = effectItem.querySelector('input[type="radio"]');
  currentEffect = effectInput.value;

  const sliderOptions = {
    chrome: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
    sepia: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
    marvin: { range: { min: 0, max: 100 }, step: 1, start: 100 },
    phobos: { range: { min: 0, max: 3 }, step: 0.1, start: 3 },
    heat: { range: { min: 1, max: 3 }, step: 0.1, start: 3 },
  };

  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  const options = sliderOptions[currentEffect];
  sliderElement.noUiSlider.updateOptions({
    range: options.range,
    step: options.step,
  });
  sliderElement.noUiSlider.set(options.start);
  sliderContainer.classList.remove('hidden');
}

document.querySelector('.effects__list').addEventListener('click', handleEffectSelection);

export { initializeSlider };
