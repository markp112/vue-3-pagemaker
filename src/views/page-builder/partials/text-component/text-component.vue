<template>
    <div
      :ref="thisComponent.ref"
      :id="thisComponent.ref"
      class="handle select-none"
      :class="getClass"
      :style="getStyles()"
      @click="onTextClick($event)"
      @mousedown="startDragText($event)"
      @mousemove="dragElement($event)"
      @mouseup="stopDragText($event)"
    >
      <text-data :content="this.thisComponent.content"> </text-data>
      <resizeable
        :isActive="isActive()"
        :parentContainerDimensions="thisComponent.parent.boxDimensions"
        @resizeStarted="resizeStarted($event)"
        @onResize="onResize($event)"
      >
      </resizeable>
    </div>
</template>

<script lang="ts">

import { Vue, Options, mixins } from 'vue-class-component';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { TextElement } from '@/classes/page-elements/text-element/text-element';
import TextData from './text-data/text-data.vue';
import Resize from '@/components/base/resizable-anchors/resizable-anchors.vue';
import { GenericComponentMixins } from '../../mixins/generic-component';

@Options({
  props: {
    thisComponent: {
      default: (): TextElement => {
        return new PageElementBuilder().buildATextElement();
      }
    }
  },
  components: {
    resizeable: Resize,
    'text-data': TextData
  }
})
export default class TextComponent extends mixins(GenericComponentMixins) {
  name = 'textComponent';

  created() {
    if (this.thisComponent.styles.length === 0) {
      this.thisComponent.setDefaultStyle();
    }
  }

  get getData(): string {
    return this.thisComponent.content;
  }

  get getClass(): string {
    return this.thisComponent.classDefinition;
  }

  onTextClick(event: Event) {
    event.stopPropagation();
    this.setEditedComponentAndMenuState();
  }

  stopDragText(event: MouseEvent) {
    event.stopPropagation();
    const componentToDrag = this.$refs[this.thisComponent.ref] as HTMLDivElement;
    this.stopDrag(event, componentToDrag);
  }

  startDragText(event: MouseEvent) {
    event.stopPropagation();
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
