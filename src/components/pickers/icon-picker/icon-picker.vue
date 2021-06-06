<template>
<div class="w-24 bg-gray-800 rounded-t-md" v-if="showMe">
  <base-button
    buttonShape="circle"
    buttonType="primary"
    variant="solid"
    size="small"
    class="ml-auto"
    @click="closeMe()"
  >X</base-button>
  <ul
    class="w-24 bg-gray-800 p-2 z-10 flex flex-row flex-wrap justify-start shadow-lg rounded-b-md absolute "
  >
    <li v-for="(icon, idx) in icons" :key="idx" class="w-6/12 text-lg text-accent-2 p-2">
      <icon-image
        :icon="icon"
        :id='idx'
        classDef="transform cursor-pointer hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 hover:text-accent-1"
        @iconClick="iconClicked(icon)"
      ></icon-image>
    </li>
  </ul>
  </div>
</template>

<script lang="ts">
import {Vue, Options } from "vue-class-component";
import IconImage from "@/components/base/icon/icon.vue";
import BaseButton from '@/components/base/base-button/base-button.vue';

@Options({
  props: {
    showMe: false,
  },
  components: {
    'icon-image': IconImage,
    'base-button': BaseButton,
  }
})
export default class IconPicker extends Vue {
  name = "iconPicker";
  icons: string[] = [];
  showMe = false;

  created() {
    this.buildIcons();
  }

  buildIcons() {
    this.icons.push(`home-32.png`);
    this.icons.push(`faq-32.png`);
    this.icons.push(`help-32.png`);
    this.icons.push(`blog-32.png`);
    this.icons.push(`compass-32.png`);
    this.icons.push(`video_library2-32.png`);
    this.icons.push(`camera-32.png`);
    this.icons.push(`camera_view-32.png`);
    this.icons.push(`gallery-32.png`);
    this.icons.push(`image-32.png`);
    this.icons.push(`id-32.png`);
    this.icons.push(`phone_vintage-32.png`);
    this.icons.push(`phone-32.png`);
    this.icons.push(`envelope-32.png`);
    this.icons.push(`icons8-page-32.png`);
    this.icons.push(`icons8-group-objects-32.png`);
    this.icons.push(`icons8-text-32.png`);
    this.icons.push(`edit-text.png`);
    this.icons.push(`elephant.png`);
    this.icons.push(`icons8-button-36.png`);
    this.icons.push(`check_mark-32.png`);
    this.icons.push(`send_container-32.png`);
  }

  getPath(image: string): string {
    return require(`@/assets/icons/${image}`);
  }

  iconClicked(icon: string) {
    this.$emit('iconClick' ,icon);
  }

  closeMe() {
    this.$emit('onCloseClick')
  }
}
</script>
