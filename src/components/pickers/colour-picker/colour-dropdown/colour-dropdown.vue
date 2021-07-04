<template>
  <section>
    <div class="relative">
      <div
        class="w-8 h-8 border border-gray-200 cursor-pointer relative"
        v-bind:style="{ backgroundColor: getColour() }"
        @click="emitColour(colourStore.rgbColour)"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <tooltip style="top:20px" :tooltip="tooltip" :showToolTip="showTooltip">
        </tooltip>
      </div>
      <img
        :src="getPath('down-24.png')"
        class="w-4 h-4 cursor-pointer hover:bg-gray-800 top-0 right-0 absolute"
        @click="isShow = !isShow"
      />
    </div>
    <colour-palette-sidebar
      v-if="isShow"
      class="absolute "
      @onColourChange="emitColour($event)"
      @onMouseLeave="isShow = !isShow"
    >
    </colour-palette-sidebar>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Colour } from "@/classes/base/colours/component-colour/component-colour";
import ToolTip from '@/components/base/notifications/tooltip/tooltip.vue';
import ColourPaletteSidebar from '../colour-palette-sidebar/colour-palette-sidebar.vue';

@Options({
  components: {
    "colour-palette-sidebar": ColourPaletteSidebar,
    tooltip: ToolTip
  },
  props: {
    colourProp: {
      default: ''
    },
    tooltip: { default: '' }
  }
})
export default class ColourDropdown extends Vue {
  name = "colour-dropdown";
  colourProp = '';
  tooltip = '';
  private colourStore: Colour = Colour.getInstance();
  isShow = false;

  emitColour(colour: string) {
    this.isShow = false;
    this.colourStore.rgbColour = colour;
    this.$emit('onColourChange', colour);
  }

  getColour(): string {
    return this.colourProp !== ""
      ? this.colourProp
      : this.colourStore.rgbColour;
  }

  getPath(image: string): string {
    const path = require.context("@/assets/icons", false, /\.png$/);
    return path(`./${image}`);
  }
}
</script>
