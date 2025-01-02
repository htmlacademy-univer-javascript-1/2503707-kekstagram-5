const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const createEffectConfig = (style, unit, min, max, step) => ({
  filter: { style, unit },
  slider: { min, max, step }
});

const effectConfigs = {
  [Effect.CHROME]: createEffectConfig('grayscale', '', 0, 1, 0.1),
  [Effect.SEPIA]: createEffectConfig('sepia', '', 0, 1, 0.1),
  [Effect.MARVIN]: createEffectConfig('invert', '%', 0, 100, 1),
  [Effect.PHOBOS]: createEffectConfig('blur', 'px', 0, 3, 0.1),
  [Effect.HEAT]: createEffectConfig('brightness', '', 1, 3, 0.1),
};

const imageUpload = document.querySelector('.img-upload');
const imageUploadPreview = imageUpload.querySelector('.img-upload__preview img');
const sliderEffectLevel = imageUpload.querySelector('.effect-level__slider');
const imageUploadEffectLevel = imageUpload.querySelector('.img-upload__effect-level');
const effectLevelValue = imageUpload.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const setImageStyle = () => {
  const { style, unit } = effectConfigs[chosenEffect]?.filter || {};
  const value = chosenEffect === Effect.DEFAULT ? null : effectLevelValue.value;

  imageUploadPreview.style.filter = `${style}(${value}${unit})`;
};

const onSliderUpdate = () => {
  effectLevelValue.value = sliderEffectLevel.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderEffectLevel, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower'
  });
  sliderEffectLevel.noUiSlider.on('update', onSliderUpdate);
};

const setSlider = () => {
  if (sliderEffectLevel.noUiSlider) {
    sliderEffectLevel.noUiSlider.destroy();
  }

  setImageStyle();
  imageUploadEffectLevel.classList.toggle('hidden', chosenEffect === Effect.DEFAULT);

  if (chosenEffect !== Effect.DEFAULT) {
    createSlider(effectConfigs[chosenEffect].slider);
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  setSlider();
  imageUpload.querySelector('.effects').addEventListener('change', onEffectsChange);
};

export { init, reset };
