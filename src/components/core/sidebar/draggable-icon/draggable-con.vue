<template>
  <div
    :id="id"
    :draggable="draggable"
    @dragstart="onDragStart"
    @dragover.stop
    @dragleave="onDragLeave"
    class="p-1 m-0"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {Vue, Options } from "vue-class-component";
import { AllActionTypes, useStore } from '@/store';

@Options({
  props: {
    id: { default: "" },
    draggable: { default: false }
  }
})
export default class DraggableIcon extends Vue {
  name = "draggableIcon";
  id!: string;
  store = useStore();


  onDragStart(e: DragEvent): void {
    if (e.currentTarget)
      (e.currentTarget as HTMLDivElement).style.border = "dashed 0.5px";
    if (e.dataTransfer) {
      if (e.target) {
        e.dataTransfer.setData("text/plain", (e.target as HTMLDivElement).id);
        // ServicesModule.toggleDragDropEventHandled(false);
        this.store.dispatch(AllActionTypes.SET_DRAG_DROP_EVENT_HANDLED, false);
      }
    }
  }

  onDragLeave(e: DragEvent): void {
    if (e.currentTarget)
      (e.currentTarget as HTMLDivElement).style.border = "none";
  }
}
</script>
