<template>
  <div
    :ref="thisComponent.ref"
    :id="thisComponent.ref"
    class="relative select-none overflow-hidden"
    :style="getContainerStyles"
    @mousedown.prevent="onMouseDown"
    @click="onImageClick($event)"
  >
    <img
      ref="image-element"
      class="absolute"
      :src="getImage()"
      :style="getImageStyles()"
    />
    <resizeable
      :isActive="isActive"
      :parentContainerDimensions="thisComponent.Dimensions"
      @resizeStarted="resizeStarted($event)"
      @onResize="onResizeImage($event)"
    />
    <popup-menu
      v-if="showPopupMenu"
      :menuItems="popupMenuItems"
      :left="12"
      :top="12"
      @menuItemClicked="menuItemClicked($event)"
      @closeClicked="menuCloseClicked"
    />
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { GenericComponentMixins } from '../../mixins/generic-component';
import { ClientCoordinates } from '../../models/client-coordinates';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import Resize from '@/components/base/resizable-anchors/resizable-anchors.vue';
import PopupMenu from '@/components/popups/popup-menu/popup-menu.vue';
import { useStore } from '@/store';
import Pan from '@/classes/images/pan/pan';
import DragImage from '@/classes/images/drag/drag';
import ImageManipulation from '@/classes/images/model/image-manipulation';

@Options({
  props: {
    thisComponent: {
      default: (): ImageElement => {
        return new PageElementBuilder().buildAnImage();
      },
    },
  },
  components: {
    resizeable: Resize,
    'popup-menu': PopupMenu,
  },
})
export default class ImageComponent extends mixins(GenericComponentMixins) {
  name = 'imageComponent';
  store = useStore();
  imageManipulator: ImageManipulation | undefined;

  getImageStyles(): string {
    const image = this.thisComponent as ImageElement;
    return image.getImageStyle();
  }

  get isPanning(): boolean {
    return this.store.getters.getPanFlag;
  }

  get isImageDragging(): boolean {
    return this.store.getters.getDragFlag;
  }

  get isPanningDragging(): boolean {
    return this.isPanning || this.isImageDragging;
  }

  get getImageManipulator(): ImageManipulation | undefined {
    if (!this.isPanningDragging) return undefined;
    if (this.isPanning) {
      if (this.imageManipulator && this.imageManipulator.imageManipulationType === 'pan') {
        return this.imageManipulator as Pan;
      } else {
        return new Pan(this.thisComponent as ImageElement);
      }
    } 
    if (this.isImageDragging) {
      if (this.imageManipulator && this.imageManipulator.imageManipulationType === 'drag') {
        return this.imageManipulator as DragImage;
      } else {
        return new DragImage(this.thisComponent as ImageElement);
      }
    }
    return undefined;
  }

  get getContainerStyles(): string {
    const image = this.thisComponent as ImageElement;
    return image.getContainerStyles();
  }

  getImage(): string {
    return (this.thisComponent as ImageElement).content;
  }

  setLastMousePosition(event: MouseEvent): void {
    const lastMousePosition = { x: event.pageX, y: event.pageY };
    this.imageManipulator = this.getImageManipulator;
    if (this.imageManipulator) {
      this.imageManipulator.lastMousePosition = lastMousePosition;
    }
  }

  onImageClick(event: MouseEvent): void {
    event.stopPropagation();
    this.setLastMousePosition(event);
    this.setEditedComponentAndMenuState();
  }

  onMouseDown(event: MouseEvent): void {
    if (this.isPanningDragging) {
      this.setLastMousePosition(event);
      this.handleMouseDown(event);
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  onResizeImage(boxProperties: ClientCoordinates): void {
    if (this.isImageDragging) return;
    const boundingRect: ADimension | null = this.getElementDimension(
      this.thisComponent.ref
    );
    if (boundingRect) {
      const currentMousePosition = this.getMousePosition(
        boxProperties.clientX,
        boxProperties.clientY
      );
      const changeX = currentMousePosition.x - this.lastMousePosition.x;
      const changeY = currentMousePosition.y - this.lastMousePosition.y;
      this.lastMousePosition = { ...currentMousePosition };
      const boxDimensions: Dimension = this.calculateNewDimensions(
        boundingRect,
        changeY,
        changeX
      );
      const dimension: ADimension = new ADimension(
        boxDimensions.height,
        boxDimensions.width
      );
      const image = this.thisComponent as ImageElement;
      image.containerDimensions = dimension;
      image.scaledSize = dimension;
    }
  }

  handleMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    this.setLastMousePosition(event);
  }

  handleMouseUp(event: MouseEvent): void {
    event.stopPropagation();
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseMove(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isPanningDragging) {
      this.panDragImage(event);
    }
  }

  panDragImage(event: MouseEvent): void {
    const currentMousePosition: MousePosition = {
      x: event.pageX,
      y: event.pageY,
    };
    this.imageManipulator?.applyAction(currentMousePosition);
  }

}
</script>
