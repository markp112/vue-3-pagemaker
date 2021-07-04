<template>
  <div class="sidebar-button-container numeric-input-layout">
    <img
      :src="getPath($props.thisIconButton.iconImage)"
      class="text-accent-600 cursor-pointer hover:bg-gray-600 mr-2"
    />
    <input
      type="number"
      v-model="inputValue"
      size="2"
      class="w-10 bg-siteSurface text-onSurface text-sm text-right self-center md:w-8 md:mt-1 md:mb-1 mr-2"
      @change="onInputChange()"
    />
    <drop-down
      class="md:ml-1"
      :thisIconButton="$props.thisIconButton"
      @onSelectChange="onDropdownChange($event)"
    >
    </drop-down>
  </div>
</template>

<script lang="ts">

import {Vue, Options } from 'vue-class-component';
import { ButtonIconNumericBuilder } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/builder';
import { ButtonIconNumeric } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/button-icon-numeric';
import { Style } from '@/classes/base/style/style';
import DropDown from '@/components/pickers/drop-down/drop-down.vue';

@Options({
  components: {
    "drop-down": DropDown
  },
  props: {
    thisIconButton: {
      default: (): ButtonIconNumeric => {
        return new ButtonIconNumericBuilder().build();
      }
    }
  }
})
export default class NumericInputDropdown extends Vue {
  name = "NumericInputDroDown";
  inputValue = 0;
  thisIconButton: ButtonIconNumeric = new ButtonIconNumericBuilder().build();

  onChange() {
    const style: Style = {
      style: this.thisIconButton.style.style,
      value: this.inputValue.toString(),
      unit: this.thisIconButton.units
    };
    this.$emit('onChange', style)
  }

  onDropdownChange(styleOutput: Style) {
    this.thisIconButton.units = styleOutput.unit!;
    this.onChange();
  }

  onInputChange() {
    this.onChange();
  }

  getPath(image: string): string {
    const path = require.context("@/assets/icons", false, /\.png$/);
    return path(`./${image}`);
  }
}
</script>

<style scoped>
.numeric-input-layout {
  @apply w-full;
  @apply justify-evenly;
}

@screen md {
  .numeric-input-layout {
    @apply flex-col;
    @apply h-auto;
    @apply w-16;
    @apply justify-start;
    @apply items-center;
    @apply p-1;
  }
}

@screen lg {
  .numeric-input-layout {
    @apply flex-row;
    @apply h-12;
    @apply w-3/4;
    @apply justify-start;
  }
}
</style>
