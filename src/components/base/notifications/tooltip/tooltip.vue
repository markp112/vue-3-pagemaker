<template>
    <span
      v-show="show"
      class="absolute text-xs z-20 tooltip-box bg-site-surface -right-36 top-0
        border-t-4 border-site-secondary-light rounded-md py-2 shadow-lg w-32 text-center text-on-surface"
      :class="{'transition ease-out duration-200 opacity-0': !show, 'transition ease-in duration-500 opacity-90': show }"
      role="alert"
    >
      {{ $props.tooltip }}
    </span>
</template>

<script lang="ts">
import  { Vue, Options } from "vue-class-component";

@Options({
  props: {
    showToolTip: {
      default: false
    },
    tooltip: {
      default: ""
    }
  }
})
export default class ToolTip extends Vue {
  name = 'tool-tip';
  showToolTip = false;
  tooltip = '';

  get show(): boolean {
    return this.showToolTip;
  }
}
</script>

<style lang="css">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
