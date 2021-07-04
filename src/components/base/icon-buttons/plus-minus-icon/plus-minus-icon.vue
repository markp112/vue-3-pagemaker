<template>
  <div
    class="sidebar-button-container relative"

  >
    <img
      :src="getPath(thisIconButton.iconImage)"
      @mouseover="showToolTip=!showToolTip"
      @mouseleave="showToolTip=!showToolTip"
      class="text-accent-600 cursor-pointer hover:bg-gray-600"
    />
    <div class="flex flex-col items-center">
      <span
        class="icon-img minus h-4 inline-block w-4"
        @click="borderThicknessChange(-1)"
      ></span>
      <span
        class="icon-img plus h-4 inline-block w-4"
        @click="borderThicknessChange(1)"
      ></span>
    </div>
    <tooltip
      :tooltip="tooltip"
      :showToolTip="showToolTip"
    >
    </tooltip>
  </div>
</template>

<script lang="ts">

import { Vue, Options } from 'vue-class-component';
import { ButtonIconDimension } from '@/classes/buttons/sidebar-panel/button-types/button-icon-dimensions/button-icon-dimension';
import { ButtonFactory } from '@/classes/buttons/sidebar-panel/factory';
import ToolTip from '../../notifications/tooltip/tooltip.vue';
import { Style } from '@/classes/base/style/style';

@Options({
  props: {
    thisIconButton: {
      default: (): ButtonIconDimension => {
        return new ButtonFactory().createButton(
          'dimension',
          'border-thickness'
        ) as ButtonIconDimension;
      }
    }
  },
  components: {
    tooltip: ToolTip
  }
})
export default class PlusMinusIcon extends Vue {
  name = 'PlusMinusIcon';
  thisIconButton: ButtonIconDimension = new ButtonFactory().createButton('dimension',
          'border-thickness'
        ) as ButtonIconDimension;
  tooltip = this.thisIconButton.tooltip;
  showToolTip = false;

  borderThicknessChange(amount: number) {
    const style: Style = {
      style: this.thisIconButton.style.style,
      value: amount.toString(),
      unit: 'px'
    };
    this.$emit('onChange', style);
  }

  getPath(image: string): string {
    const path = require.context('@/assets/icons', false, /\.png$/);
    return path(`./${image}`);
  }
}
</script>

<style lang="css" scoped>
.icon-img {
  background-size: 16px 16px;
  background-position: center;
}

.plus {
  background-image: url("../../../../assets/icons/plus-24.png");
}

.plus:hover {
  background-image: url("../../../../assets/icons/plus-olive-24.png");
}
.minus {
  background-image: url("../../../../assets/icons/minus-24.png");
}

.minus:hover {
  background-image: url("../../../../assets/icons/minus-olive-24.png");
}
</style>
