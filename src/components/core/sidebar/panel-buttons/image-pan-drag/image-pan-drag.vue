<template>
  <div class="flex flex-row justify-evenly">
    <icon-button 
      classDef="drag"
      :icon="dragIcon"
      id="drag"
      tooltip="move image"
      @click="dragImage()"
    />
    <icon-button 
      classDef="pan"
      :icon="panIcon"
      id="pan"
      tooltip="pan image"
      @click="panImage()"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Icon from '@/components/base/icon/icon.vue';

@Options({
  components: {
    'icon-button': Icon,  
  }
})
export default class ImageDragPan extends Vue {
    panEnabled = false;
    dragEnabled = false;

  dragImage() {
    this.dragEnabled = !this.dragEnabled;
    this.panEnabled = this.dragEnabled ? false : this.panEnabled;
    this.$emit('dragClicked', this.dragEnabled);
  }

  panImage() {
    this.panEnabled = !this.panEnabled;
    this.dragEnabled = this.panEnabled ? false : this.dragEnabled;
    this.$emit('panClicked', this.panEnabled);
  }

  get panIcon (): string {
    return this.panEnabled  ? 'pan-enabled-32.png' : 'pan-32.png';
  }

  get dragIcon(): string {
    return this.dragEnabled ? 'move-enabled-32.png' : 'move-32.png'
  }

  // addEventListeners(): void {
  //   window.addEventListener('mousedown', this.handleMouseDown);
  //   window.addEventListener('mouseup', this.handleMouseUp);
  //   window.addEventListener('mousemove', this.handleMouseMove);
  // }

  // removeEventListeners(): void {
  //   window.removeEventListener('mousemove', this.handleMouseMove);
  //   window.removeEventListener('mouseup', this.handleMouseUp);
  //   window.removeEventListener('mousedown', this.handleMouseDown);
  // }

  //   handleMouseDown(event: MouseEvent): void {
  //   event.stopPropagation();
  //   this.lastMousePosition = { x: event.pageX, y: event.pageY };
  //   this.isPanningDragging = true;
  //   this.isDragging = false;
  // }

  // handleMouseUp(event: MouseEvent): void {
  //   event.stopPropagation();
    
  //   this.isPanningDragging = false;
  // }

  // handleMouseMove(event: MouseEvent): void {
  //   event.stopPropagation();
  //   if (this.isPanningDragging) {
  //     this.panDragImage(event);
  //   }
  // }

}
</script>