const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const effectSettings = {
  none: { style: 'none', min: 0, max: 100, step: 1, unit: '' },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const DEFAULT_EFFECT = effectSettings.none;
let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const isDefaultEffect = () => currentEffect === DEFAULT_EFFECT;

const updateSliderUI = () => {
  sliderElement.noUiSlider.updateOptions({
    range: { min: currentEffect.min, max: currentEffect.max },
    start: currentEffect.max,
    step: currentEffect.step,
  });
  sliderContainer.classList.toggle('hidden', isDefaultEffect());
};


sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imagePreview.style.filter = isDefaultEffect()
    ? DEFAULT_EFFECT.style
    : `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
});

const handleEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = effectSettings[evt.target.value];
  imagePreview.className = `effects__preview--${evt.target.value}`;
  updateSliderUI();
};

effectsList.addEventListener('change', handleEffectChange);

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSliderUI();
};

export { resetEffect };
