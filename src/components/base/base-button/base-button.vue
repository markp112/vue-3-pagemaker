<template>
  <span
    :class='getClasses()'
    @click="buttonClick()"
  >
    <slot/>
  </span>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'default'

class ButtonProps {
  buttonType: ButtonTypes ='default';
  disabled = false;
}


export default class BaseButton extends Vue.with(ButtonProps) {


getClasses(): string {
  let buttonStyle = '';

  switch(this.$props.buttonType) {
    case 'primary':
      break;
    case 'secondary':
      break;
    case 'default':
      break;
  }
  return buttonStyle;
}
}
</script>
