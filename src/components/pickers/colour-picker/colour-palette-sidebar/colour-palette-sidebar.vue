<template>
  <section class="w-auto z-10" @mouseleave="onMouseLeave()">
    <div class="flex flex-row flex-wrap">
      <span
        class="h-8 w-8 flex flex-col justify-end cursor-pointer"
        v-for="(colour, index) in primaryColours"
        :key="index + colour"
        :style="{ backgroundColor: colour }"
        @click="colourClicked(colour)"
      >
      </span>
    </div>
    <div class="flex flex-row flex-wrap">
      <span
        class="h-8 w-8 flex flex-col justify-end cursor-pointer"
        v-for="(colour, index) in secondaryColours"
        :key="index + colour"
        :style="{ backgroundColor: colour }"
        @click="colourClicked(colour)"
      >
      </span>
    </div>
    <div class="flex flex-row flex-wrap">
      <span
        class="h-8 w-8 flex flex-col justify-end cursor-pointer"
        v-for="(colour, index) in accentColours"
        :key="index + colour"
        :style="{ backgroundColor: colour }"
        @click="colourClicked(colour)"
      >
      </span>
    </div>
    <p
      class="border-sitePrimary bg-siteSurface border-t-2 flex flex-row justify-end"
    >
      <img
        src="@/assets/icons/pencil-24.png"
        alt="edit pencil"
        class="bg-gray-300 cursor-pointer hover:bg-site-secondary-light"
        @click="showColourEditor = !showColourEditor"
      />
      <colour-picker
        v-if="showColourEditor"
        class="absolute"
        @colour="colourClicked($event)"
        @onMouseLeave="onColourPickerMouseLeave"
      >
      </colour-picker>
    </p>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { SiteDefaults } from "@/classes/settings/site-defaults/site-defaults";
import { Colour } from '@/classes/base/colours/component-colour/component-colour';
import { BackgroundBorderForeground } from '@/classes/base/colours/component-colour/types';
import { ColourPalettes } from '@/classes/settings/colour-palettes/colour-palette';
import ColourPicker from '../colour-picker/colour-picker.vue';
import { getPath } from '@/common/get-path';

@Options({
  props: {
    show: { default: false }
  },
  components: {
    "colour-picker": ColourPicker
  }
})
export default class ColourPaletteSidebar extends Vue {
  name = "ColourPaletteSidebar";
  show = false;
  showColourEditor = false;
  textBackgroundorBorder: BackgroundBorderForeground = "color";
  colour: Colour = Colour.getInstance();
  siteDefaults = SiteDefaults.getInstance();
  colourPalettes = new ColourPalettes();

  created() {
    this.colourPalettes = new ColourPalettes();
    this.colourPalettes.loadPalette();
  }

  colourClicked(colour: string) {
    this.$emit('onColourChange', colour)
  }

  onColourPickerMouseLeave() {
    this.showColourEditor = !this.showColourEditor;
    return;
  }

  onMouseLeave() {
    this.$emit('onMouseLeave');
  }

  getPath(image: string) {
    return getPath(image);
  }
  get primaryColours() {
    return this.colourPalettes.primary;
  }

  get secondaryColours() {
    return this.colourPalettes.secondary;
  }

  get accentColours() {
    return this.colourPalettes.accent;
  }

  getElementClass() {
    return "ml-1";
  }
}
</script>
