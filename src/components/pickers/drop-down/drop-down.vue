<template>
  <div>
    <div class="flex flex-row justify-between relative w-12 text-sm">
      <input
        v-model="selectedItem"
        class="min-w-6 text-center relative bg-siteSurface text-onSurface"
        @change="onInputChange"
      />
      <img
        :src="getPath('down-24.png')"
        class="w-4 h-4 cursor-pointer hover:bg-gray-800 absolute right-0 top-0"
        @click="show()"
      />
    </div>
    <ul
      class="dropdown-menu-background flex flex-col items-center absolute z-10 w-16 shadow-lg h-auto overflow-auto text-sm"
      v-if="toggleSelectOptions"
      @mouseleave="show"
      @blur="show"
    >
      <li
        v-for="item in thisIconButton.valuesList"
        :key="item"
        @click="itemClicked(item)"
        class="dropdown-menu-item block w-full text-center mt-2"
        :class="{ 'dropdown-menu-selected': item === selectedItem }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component';
import { ButtonIconNumericBuilder } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/builder';
import { ButtonIconNumeric } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/button-icon-numeric';
import { Style } from '@/classes/base/style/style';

@Options({
  props: {
    thisIconButton: {
      default: (): ButtonIconNumeric => {
        return new ButtonIconNumericBuilder().build();
      }
    },
    surface: {
      default: "bg-primary-200 text-onPrimary"
    }
  }
})
export default class DropDown extends Vue {
  toggleSelectOptions = false;
  thisIconButton: ButtonIconNumeric = new ButtonIconNumericBuilder().build();
  surface = ''
  selectedItem = "bg-primary-200 text-onPrimary";

  mounted() {
    this.selectedItem = this.thisIconButton.defaultValue;
  }

  getSurface(): string {
    return this.surface;
  }

  itemClicked(classElement: string) {
    const style: Style = {
      style: this.thisIconButton.style.style,
      value: classElement,
      unit: this.thisIconButton.units,
    };
    this.selectedItem = classElement;
    this.show();
    this.$emit('onSelectChange', style);
  }

  onInputChange() {
    this.$emit('onSelectChange', this.selectedItem);
  }

  show() {
    this.toggleSelectOptions = !this.toggleSelectOptions;
  }

  getPath(image: string): string {
    const path = require.context("@/assets/icons", false, /\.png$/);
    return path(`./${image}`);
  }
}
</script>

<style lang="css">
.drop-down-li {
  @apply cursor-pointer;
  @apply mb-2;
  @apply relative;
  @apply z-auto;
  @apply text-sm;
  @apply w-full;
  @apply text-center;
}

.drop-down-li:hover {
  @apply bg-gray-600;
  @apply text-gray-400;
}
</style>
