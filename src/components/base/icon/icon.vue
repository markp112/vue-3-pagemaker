<template>
  <div class="relative w-8">
    <img
      :id="$props.id"
      :class="$props.classDef"
      :src="getIcon"
      @click="iconClick"
      @mouseover="displayTooltip(true)"
      @mouseleave="displayTooltip(false)"
    />
    <tooltip :showToolTip="showTooltip" :tooltip="$props.tooltip"></tooltip>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import ToolTip from '@/components/base/notifications/tooltip/tooltip.vue';

@Options({
  props: {
    icon: '',
    classDef: '',
    id: '',
    tooltip: '',
  },
  components: {
    tooltip: ToolTip,
  },
})
export default class IconImage extends Vue {
  name = 'icon-image';
  showTooltip = false;
  icon = '';
  classDef = '';
  id = '';
  tooltip = '';

  get getIcon(): string {
    return this.icon !== ''
      ? require(`@/assets/icons/${this.icon}`)
      : 'emoji_waiting-32.png';
  }

  iconClick(): void {
    return this.$emit('iconClick', this.icon);
  }

  displayTooltip(show: boolean): void {
    this.showTooltip = show && this.tooltip !== undefined;
  }
}
</script>
