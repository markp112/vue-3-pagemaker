<template>
  <div
    :id="$props.thisComponent.ref"
    class="handle overflow-hidden flex-no-wrap relative"
    :class="getClasses()"
    :style="getStyles()"
    :ref="$props.thisComponent.ref"
    @dragover.prevent
    @drop.prevent="onDrop($event)"
    @mousedown="onMouseDown($event)"
    @click.prevent="onClick($event)"
  
  >
    <component
      v-for="(pageElement, index) in getPageElements"
      :is="getComponent(pageElement.type)"
      :key="index"
      :index="index"
      :thisComponent="pageElement"
      @onClick.prevent="componentClick($event)"
      @dragover.prevent
      @drop.prevent="onDrop"
    >
    </component>
    <resizeable
      :isActive="isActive"
      :parentContainerDimensions="getBoundingRect()"
      @resizeStarted="resizeStarted($event)"
      @onResize="onResize($event)"
    ></resizeable>
  </div>
</template>

<script lang="ts">
import { ComponentCounter } from '@/classes/base/component-counter/component-counter';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import {
  PageElementClasses,
  PageElementFactory,
} from '@/classes/page-elements/factory/page-elements-factory';
import { PageContainer } from '@/classes/page-elements/page-container/page-container';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import Resize from '@/components/base/resizable-anchors/resizable-anchors.vue';
import { AllActionTypes } from '@/store';
import { pageActionTypes } from '@/store/modules/page';
import { mixins, Options } from 'vue-class-component';
import { GenericComponentMixins } from '../../mixins/generic-component';
import ButtonComponent from '../button-component/button-component.vue';
import ImageComponent from '../image-component/image-component.vue';
import TextComponent from '../text-component/text-component.vue';

@Options({
  components: {
    'image-component': ImageComponent,
    'text-component': TextComponent,
    'button-component': ButtonComponent,
    resizeable: Resize,
  },
})
export default class Container extends mixins(GenericComponentMixins) {
  name = 'container';
  private componentStyle = '';
  private componentCounter: ComponentCounter = ComponentCounter.getInstance();

  created(): void {
    if (this.thisComponent) {
      this.thisComponent.setDefaultStyle();
    }
  }

  mounted(): void {
    // -- convert width and height into pixels as initial dimension may be a percentage and cannot then be used
    // by the child component to get the actual width / height
    this.thisComponent.dimension.width = {
      value: this.$el.getBoundingClientRect().width,
      unit: 'px',
    };
    this.thisComponent.dimension.height = {
      value: this.$el.getBoundingClientRect().height,
      unit: 'px',
    };
  }

  getComponent(type: string): string {
    switch (type) {
      case 'image':
        return 'image-component';
      case 'text':
        return 'text-component';
      case 'button':
        return 'button-component';
      default:
        return '';
    }
  }
  get getPageElements(): PageElementClasses[] {
    return (this.thisComponent as PageContainer).elements;
  }

  get getStyle(): string {
    return this.componentStyle;
  }

  onClick(ev: Event): void {
    ev.stopPropagation();
    this.setEditedComponentAndMenuState();
    this.showBorder = !this.showBorder;
    this.$emit('componentClicked');
  }

  onMouseDown(event: MouseEvent) {
    console.log('%c⧭', 'color: #733d00', 'onMouseDown')
    event.stopPropagation();
    this.startDragContainer(event);
    // window.addEventListener('mousedown', this.startDragContainer);
    window.addEventListener('mouseup', this.stopDragContainer);
    window.addEventListener('mousemove', this.dragElement);
  }

  stopDragContainer(event: MouseEvent): void {
    event.stopPropagation();
    const componentToDrag = this.$refs[
      this.thisComponent.ref
    ] as HTMLDivElement;
    this.stopDrag(event, componentToDrag);
  }

  startDragContainer(event: MouseEvent): void {
    event.stopPropagation();
    const componentToDrag = this.$refs[
      this.thisComponent.ref
    ] as HTMLDivElement;
    this.startDrag(event, componentToDrag);
  }

  componentClick(event: Event): void {
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    if (this.store.getters.isDragDropEventHandled) {
      return;
    }
    if (event) {
      const componentName = this.getComponentName(event);
      const id: number = this.componentCounter.getNextCounter();
      const ref = `${componentName}::${id}`;
      const component = this.store.getters.getSidebarElement(componentName);
      const parent = this.thisComponent as PageContainer; // when dropping a component this componet will be its parent
      if (component) {
        const componentFactory = new PageElementFactory();
        const newComponent: PageElementClasses = componentFactory.createElement(
          component.type,
          ref,
          component,
          parent
        );
        parent.addNewElement(newComponent);
    
        this.store.dispatch(pageActionTypes.UPDATE_EDITED_COMPONENT, newComponent);
        this.store.dispatch(AllActionTypes.SET_DRAG_DROP_EVENT_HANDLED, true);
      }
    }
  }

  getComponentName(event: DragEvent): string {
    const dataTransfer = event.dataTransfer;
    return dataTransfer ? dataTransfer.getData('text') : '';
  }

  getBoundingRect(): ADimension | null {
    if (!this.$el) return null;
    if (!this.$el.parentElement) return null;
    const parentElement = this.$el.parentElement as HTMLDivElement;
    const boxWidth: ValueAndUnit = {
      value: parentElement.getBoundingClientRect().width,
      unit: 'px',
    };
    const boxHeight: ValueAndUnit = {
      value: this.$el.getBoundingClientRect().height,
      unit: 'px',
    };
    return new ADimension(boxHeight, boxWidth);
  }
}
</script>

<style lang="postcss">
.border-outline {
  @apply border-red-600 border-8 border-dashed;
}

.handle {
  position: relative;
  box-sizing: border-box;
}
.border1 {
  @apply border-indigo-800 border border-dashed;
}

.triangle {
  content: '';
  position: absolute;
  bottom: -6px;
  right: -1px;
  box-sizing: border-box;
  cursor: nwse-resize;
  width: 0;
  height: 0;
  text-indent: -9999px;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid rgb(56, 55, 56);
  transform: rotate(45deg);
}

.active {
  visibility: visible;
}

.in-active {
  visibility: hidden;
}
</style>
