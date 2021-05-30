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
  | 'default';

export type Variants =
  | 'solid'
  | 'outline'
  | 'text';

export type ButtonSize =
  | 'small'
  | 'medium'
  | 'large';

export type ButtonShape =
  | 'rectangular'
  | 'circle'

@Options({
  props: {
    buttonType: {
      default: (): ButtonTypes => { return 'default'; }
    },
    disabled: {default: false},
    variant: (): Variants => { return 'solid'; },
    size: (): ButtonSize => { return 'medium'},
    buttonShape: {
      default: (): ButtonShape => { return 'rectangular' }
    },
  }
})
export default class BaseButton extends Vue {
  name = 'base-button';
  buttonType: ButtonTypes = 'default';
  variant: Variants = 'solid';
  disabled = false;
  size: ButtonSize = 'medium';
  buttonShape: ButtonShape = 'rectangular';
  colour = '';

  buttonClick() {
    this.$emit('onClick')
  }

  getSize(): string {
    if (this.size === 'small' && this.buttonShape === 'rectangular') return 'h-8 w-auto text-xs';
    if (this.size === 'small' && this.buttonShape === 'circle') return 'h-8 w-8 text-xs';
    if (this.size === 'medium' && this.buttonShape === 'rectangular') return 'h-10 w-auto text-sm';
    if (this.size === 'medium' && this.buttonShape === 'circle') return 'w-12 h-12 text-sm';
    if (this.size === 'large' && this.buttonShape === 'rectangular') return 'h-12 w-auto text-md';
    if (this.size === 'large' && this.buttonShape === 'circle') return 'h-16 w-16 text-md';
    return 'h-10 w-24';
  }

  getStyling(): string {
    const baseStyling = `${this.getSize()} flex items-center justify-center p-2`;
    const active = `cursor-pointer hover:bg-site-${this.buttonType} hover:text-accent-2`;
    const activeOutline = `cursor-pointer hover:bg-border-${this.buttonType} hover:text-accent-1`;
    const activeText = `cursor-pointer hover:text-accent-1 text-site-${this.buttonType}`;
    const inActiveText = `cursor-pointer hover:text-accent-1 text-gray-400`;
    let style = '';

    if (this.buttonShape === 'circle') {
      style = `rounded-full`;
    } else {
      style = 'rounded-md';
    }
    if (this.disabled && this.variant !== 'text') {
      return `bg-gray-200 text-dark ${baseStyling} ${style}`;
    }
    if (this.variant === 'solid') {
      return `bg-site-${this.buttonType}-light text-on-${this.buttonType} ${baseStyling} ${active} shadow-md ${style}`;
    }
    if (this.variant === 'outline') {
      return `border border-site-${this.buttonType}-light ${baseStyling} ${activeOutline} shadow-md ${style}`;
    }
    if (this.variant === 'text') {
      return `text-md font-bold ${baseStyling} ${this.disabled ? inActiveText : activeText} ${style}`;
    }

    return ``;
  }

  getClasses(): string {
    let buttonStyle = this.getStyling()
    return buttonStyle;
  }
}
</script>
