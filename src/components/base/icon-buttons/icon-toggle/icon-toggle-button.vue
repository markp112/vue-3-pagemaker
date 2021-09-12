<template>
 <div class="sidebar-button-container">
    <img
      :src="getPath(thisIconButton.iconImage)"
      class="text-accent-600 cursor-pointer hover:bg-gray-600"
      :class="{ 'bg-secondary-100': isActive }"
      @click="onClick" 
    />
 </div>
</template>

<script lang="ts">
  import { Vue, Options } from 'vue-class-component';
import { ButtonIconClassInterface } from '@/classes/buttons/sidebar-panel/button-types/model';
import { ButtonIconClassBuilder } from '@/classes/buttons/sidebar-panel/button-types/button-icon-class/button-icon-class';
import { Style } from '@/classes/base/style/style';
import { StyleTags, CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
  Options({
    props: {
      thisIconButton: {
          default: (): ButtonIconClassInterface => {
            return new ButtonIconClassBuilder().build();
          },
        },
      },
    })
    export default class IconToggleButton extends Vue {
      name = 'IconToggleButton'
      thisIconButton!: ButtonIconClassInterface;
      isActive = false;

    onClick() {
      this.isActive = !this.isActive;
      const styleValue = this.getStyle();
      const style: Style = {
        style: styleValue, 
        value: styleValue ,
        unit: 'px',
      }
      this.$emit('onchange', style);
    }

    getPath(image: string): string {
      const path = require.context('@/assets/icons',false,/\.png$/);
      return path(`./${image}`);
    }

    getStyle(): StyleTags | CssStyleTypes {
      const className = this.isActive ? this.thisIconButton.classNameActive : this.thisIconButton.classNameInActive;
      return className as StyleTags | CssStyleTypes;
    }
      
    }
  </script>