<template>
  <div
    :ref="thisComponent.ref"
    :id="thisComponent.ref"
    class="relative select-none overflow-hidden"
    :style="getContainerStyles"
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
      @closeClicked="menuCloseClicked()"
    />
  </div>
</template>

<script lang="ts">

import { Options } from 'vue-class-component';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import { ImageElement, ImageOrContainer } from '@/classes/page-elements/image-element/image-element';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { GenericComponentMixins } from '../../mixins/generic-component';
import { ClientCoordinates } from '../../models/client-coordinates';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import Resize from '@/components/base/resizable-anchors/resizable-anchors.vue';
import PopupMenu from '@/components/popups/popup-menu/popup-menu.vue';

@Options({
  props: {
    thisComponent: {
      default: (): ImageElement => {
        return new PageElementBuilder().buildAnImage();
      }
    }
  },
  components: {
    resizeable: Resize,
    'popup-menu': PopupMenu,
  }
})
export default class ImageComponent extends GenericComponentMixins {
  name = "imageComponent";
  isPanImage = true;
  showPopupMenu = false;
  popupMenuItems = ['Drag Image', 'Pan Image'];
  panOrDrag: ImageOrContainer = 'container';
  isPanningDragging = false;

  getImageStyles(): string {
    const image = this.thisComponent as ImageElement;
    return image.getImageStyle();
  }

  get getContainerStyles() {
    const image = this.thisComponent as ImageElement;
    return image.getContainerStyles();
  }

  getImage(): string {
    return (this.thisComponent as ImageElement).content;
  }

  onImageClick(event: MouseEvent) {
    event.stopPropagation();
    this.showPopupMenu = true;
    this.lastMousePosition = { x: event.pageX, y: event.pageY };
    this.setEditedComponentAndMenuState();
  }

  menuItemClicked(option: string) {
    this.showPopupMenu = false;
    switch(option) {
      case 'Pan Image':
        this.panOrDrag = 'image';
        break;
      case 'Drag Image':
        this.panOrDrag = 'container';
        break;
    }
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  menuCloseClicked() {
    this.showPopupMenu = false;
  }

  onResizeImage(boxProperties: ClientCoordinates) {
    if (this.isDragging) return;
    const thisComponent = this.thisComponent;
    const boundingRect: ADimension | null = this.getElementDimension(
      thisComponent.ref
    );
    if (boundingRect) {
      const currentMousePosition = this.getMousePosition(
        boxProperties.clientX,
        boxProperties.clientY,
        );
      const changeX = currentMousePosition.x - this.lastMousePosition.x;
      const changeY = currentMousePosition.y - this.lastMousePosition.y;
      this.lastMousePosition = { ...currentMousePosition };
      const boxDimensions: Dimension = this.calculateNewDimensions(
        boundingRect,
        changeY,
        changeX
        );
      const dimension: ADimension = new ADimension(boxDimensions.height, boxDimensions.width);
      const image = this.thisComponent as ImageElement;
      image.containerDimensions = dimension;
    }
  }

  handleMouseDown(event: MouseEvent) {
    event.stopPropagation();
    this.lastMousePosition = { x: event.pageX, y: event.pageY };
    this.isPanningDragging = true;
  }

  handleMouseUp(event: MouseEvent) {
    event.stopPropagation();
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("mousedown", this.handleMouseDown);
    this.isPanningDragging = false;
  }

  handleMouseMove(event: MouseEvent) {
    if (this.isPanningDragging) {
      event.stopPropagation();
      this.panImage(event);
    }
  }

  panImage(event: MouseEvent) {
    const deltaChange = this.calcDeltaMouseChange(event);
    const image = this.thisComponent as ImageElement;
    image.pan(deltaChange, this.panOrDrag);
    this.lastMousePosition = {
      x: event.pageX,
      y: event.pageY
    };
  }

  private calcDeltaMouseChange(event: MouseEvent): MousePosition {
    return {
      x: event.pageX - this.lastMousePosition.x,
      y:  event.pageY - this.lastMousePosition.y
    }
  }

}
</script>
