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

@Options({
  props: {
    buttonType: {
      default: (): ButtonTypes => { return 'default'; }
    },
    disabled: {default: false},
    variant: (): Variants => { return 'solid'; },
    size: (): ButtonSize => { return 'medium'},
  }
})
export default class BaseButton extends Vue{
  name = 'base-button';
  buttonType: ButtonTypes = 'default';
  variant: Variants = 'solid';
  disabled = false;
  size: ButtonSize = 'medium';

  buttonClick() {
    this.$emit('onClick')
  }

  getSize(): string {
    if (this.size === 'small') return 'h-8 w-16';
    if (this.size === 'medium') return 'h-10 w-20';
    if (this.size === 'large') return 'h-12 w-24';
    return 'h-10 w-20';
  }

  getStyling(): string {
    const baseStyling = `${this.getSize()} rounded-md flex items-center justify-center text-sm`;
    const active = `cursor-pointer hover:bg-site-${this.buttonType} hover:text-accent-2`;
    const activeOutline = `cursor-pointer hover:bg-border-${this.buttonType} hover:text-accent-1`;
    const activeText = `cursor-pointer hover:text-accent-1 text-site-${this.buttonType}`;
    const inActiveText = `cursor-pointer hover:text-accent-1 text-gray-400`;

    if (this.disabled && this.variant !== 'text') {
      return `bg-gray-200 text-dark ${baseStyling}`;
    }
    if (this.variant === 'solid') {
      return `bg-site-${this.buttonType}-light text-on-${this.buttonType} ${baseStyling} ${active} shadow-md`;
    }
    if (this.variant === 'outline') {
      return `border border-site-${this.buttonType}-light ${baseStyling} ${activeOutline} shadow-md`;
    }
    if (this.variant === 'text') {
      return `text-md font-bold ${baseStyling} ${this.disabled ? inActiveText : activeText}`;
    }
    return ``;
  }

  getClasses(): string {
    let buttonStyle = this.getStyling()
    return buttonStyle;
  }
}
</script>
