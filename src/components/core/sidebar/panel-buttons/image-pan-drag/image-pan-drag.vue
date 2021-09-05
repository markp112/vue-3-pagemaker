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
    if (this.dragEnabled) {
      this.$emit('panClicked', this.panEnabled);
    }
  }

  panImage() {
    this.panEnabled = !this.panEnabled;
    this.dragEnabled = this.panEnabled ? false : this.dragEnabled;
    this.$emit('panClicked', this.panEnabled);
    if (this.panEnabled) {
      this.$emit('dragClicked', this.dragEnabled);
    }
  }

  get panIcon (): string {
    return this.panEnabled  ? 'pan-enabled-32.png' : 'pan-32.png';
  }

  get dragIcon(): string {
    return this.dragEnabled ? 'move-enabled-32.png' : 'move-32.png'
  }

}
</script>