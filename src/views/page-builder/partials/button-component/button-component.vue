<template>
  <div
    :ref="thisComponent.ref"
    :style="getStyles()"
    :class="getClasses()"
    :id="thisComponent.ref"
    class="handle flex flex-row justify-center items-center"
    @click.prevent="onButtonClick($event)"
    @mousedown="startDragButton($event)"
    @mousemove="dragElement($event)"
    @mouseup="stopDragButton($event)"
  >
    {{ getData }}
    <resizeable
      :isActive="isActive"
      :parentContainerDimensions="thisComponent.parent.boxDimensions"
      @resizeStarted="resizeStarted($event)"
      @onResize="onResize($event)"
    ></resizeable>
  </div>
</template>

<script lang="ts">

import { Vue, Options, mixins } from 'vue-class-component';
import { GenericComponentMixins } from '../../mixins/generic-component';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ButtonElement } from '@/classes/page-elements/button-element/button-element';
import Resize from '@/components/base/resizable-anchors/resizable-anchors.vue';

@Options({
  props: {
    thisComponent: {
      default: (): ButtonElement => {
        return new PageElementBuilder().buildAButton();
      }
    }
  },
  components: {
    resizeable: Resize,
  }
})
export default class ButtonComponent extends mixins(GenericComponentMixins) {
  name = "buttonComponent";

  created() {
    this.thisComponent.setDefaultStyle();
  }

  get getData(): string {
    return this.thisComponent.content;
  }

  get getClass(): string {
    return this.thisComponent.classDefinition;
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    this.setEditedComponentAndMenuState();
  }

  stopDragButton(event: MouseEvent) {
    const componentToDrag = this.$refs[this.thisComponent.ref] as HTMLDivElement;
    this.stopDrag(event, componentToDrag);
  }

  startDragButton(event: MouseEvent) {
    const componentToDrag = this.$refs[this.thisComponent.ref] as HTMLDivElement;
    this.startDrag(event, componentToDrag);
  }
}
</script>

<style lang="postcss" scoped>
.handle {
  position: relative;
  box-sizing: border-box;
}
</style>
