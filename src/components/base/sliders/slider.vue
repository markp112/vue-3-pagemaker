<template>
  <div class="slide-container">
    <label for="slider" class="text-sm text-siteSurface">{{ caption }}</label>
    <input
      id="slider"
      type="range"
      min="0"
      max="255"
      class="slider"
      :value="sliderValue"
      @input="onChange($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: {
    caption: { default: '' },
    sliderValue: { default: 127 },
  }
})
export default class Slider extends Vue {
  name = 'slider-control';
  sliderValue = 127;
  caption = '';

  onChange(value: number) {
    this.$emit("onSliderChange", value);
  }
}
</script>

<style lang="css" scoped>

.slide-container {
  width: 100%; /* Width of the outside container */
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border: 0;
    background: url('../../../assets/icons/radio_button-24.png');
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 24px;
    height: 25px;
    border: 0;
    background: url('../../../assets/icons/radio_button-24.png');
    cursor: pointer;
}
</style>
