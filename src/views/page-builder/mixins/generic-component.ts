import {
  Vue,
  Options
} from 'vue-class-component';
import { useStore } from 'vuex';
import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import {
  PageElementClasses,
  PageElementFactory
} from '@/classes/page-elements/factory/page-elements-factory';
import { PageElement } from '@/classes/page-elements/page-element-base/page-element-base';
import { ClientCoordinates } from '../models/client-coordinates';
import { MousePosition } from '@/classes/page-elements/types/mouse-position';
import { pageActionTypes } from '@/store/modules/page';
import { sidebarActionTypes } from '@/store/modules/sidebar';
import { ALocation } from '@/classes/base/location/a-location';
import store from '@/store';
import { DeltaPositionChange } from '../models/mouse-position';


@Options({
  props: {
    thisComponent: {
      default: (): PageElementClasses => {
        return new PageElementFactory().createElement();
      }
    }
  }
})
export class GenericComponentMixins extends Vue {
  name = 'GenericComponentMixins';
  thisComponent!: PageElementClasses;
  store = useStore();
  showBorder = false;
  isDragging = false;
  lastMousePosition: MousePosition = {
    x: 0,
    y: 0
  };

  getPath(image: string): string {
    const path = require.context('@/assets/icons', false, /\.png$/);
    return path(`./${image}`);
  }

  getElementDimension(htmlElement: string): ADimension {
    let element = this.$refs[htmlElement] as HTMLDivElement;
    if (!element) {
      element = document.getElementById(htmlElement) as HTMLDivElement;
    }
    const boundingRect = new ADimension();
    boundingRect.width.value = element.getBoundingClientRect().width;
    boundingRect.height.value = element.getBoundingClientRect().height;
    return boundingRect;
  }

  getStyleDimension(style: string): number {
    if (style === '') {
      return 0;
    }
    return parseInt(style.substring(0, style.length - 2));
  }

  calculateNewDimensions(
    boundingRect: ADimension,
    changeY: number,
    changeX: number
    ): Dimension {
    return {
      height: { value: boundingRect.height.value + changeY, unit: 'px' },
      width: { value: boundingRect.width.value + changeX, unit: 'px' },
    };
  }

  public getMousePosition(
    x: number,
    y: number,
  ): MousePosition {
    return {
      x: x ,
      y: y ,
    };
  }

  resizeStarted(event: MouseEvent) {
    this.lastMousePosition = this.getMousePosition(
      event.screenX,
      event.screenY,
    );
  }

  get isActive(): boolean {
    const editedComponent = this.store.getters.editedComponent;
    console.log('%c⧭', 'color: #9c66cc', editedComponent);
    if (!editedComponent) return false;
    return editedComponent.ref === this.thisComponent.ref;
  }

  setEditedComponentAndMenuState() {
    console.log('%c%s', 'color: #e50000', 'setEditedComponentAndMenuState');
    this.store.dispatch(pageActionTypes.UPDATE_EDITED_COMPONENT, this.thisComponent);
    this.store.dispatch(sidebarActionTypes.SET_SIDEBAR_MENU_BASED_ON_SELECTED_COMPONENT, this.thisComponent.type);
    this.store.dispatch(pageActionTypes.UPDATE_SHOW_EDIT_DELETE, true);
  }

  onResize(ADimension: ClientCoordinates) {
    if (this.isDragging) return;
    const thisComponent = this.thisComponent;
    const boundingRect: ADimension | null = this.getElementDimension(
      thisComponent.ref
    );
    if (boundingRect) {
      const currentMousePosition = this.getMousePosition(
        ADimension.clientX,
        ADimension.clientY,
        );
      const changeX = currentMousePosition.x - this.lastMousePosition.x;
      const changeY = currentMousePosition.y - this.lastMousePosition.y;
      this.lastMousePosition = { ...currentMousePosition };
      const boxDimensions: Dimension = this.calculateNewDimensions(
        boundingRect,
        changeY,
        changeX
        );
      if (thisComponent.isContainer) {
        const parentContainer = thisComponent.parent;
        const parentDimensions = parentContainer.dimension;
        const offSetWidth = ADimension.offsetWidth;
        if (
          boxDimensions.width.value + (offSetWidth * 2) >
            parentDimensions.width.value
        ) {
          boxDimensions.width.value =
            parentDimensions.width.value - ((offSetWidth * 2) + offSetWidth);
        }
      }
      this.thisComponent.reSize(boxDimensions);
    }
  }

  startDrag(event: MouseEvent, componentToDrag: HTMLDivElement) {
    this.thisComponent.addClass('absolute');
    this.isDragging = true;
    this.lastMousePosition = { x: event.pageX, y: event.pageY };
    console.log('%c⧭', 'color: #7f2200', this.lastMousePosition);
    this.thisComponent.isAbsolute = true;
    componentToDrag.classList.add('cursor-move');
    (this.thisComponent as PageElement).addClass("z-50");
  }

  stopDrag(event: MouseEvent, componentToDrag: HTMLDivElement): void {
    event.stopPropagation;
    this.isDragging = false;
    componentToDrag.classList.remove('cursor-move');
    (this.thisComponent as PageElement).removeClass("z-50");
  }

  dragElement(event: MouseEvent) {
    if (!this.isDragging) return;
    event.stopPropagation;
    const currentMousePosition: MousePosition = { x: event.pageX, y: event.pageY };
    const deltaChange: DeltaPositionChange = {
      deltaX: currentMousePosition.x - this.lastMousePosition.x,
      deltaY: currentMousePosition.y - this.lastMousePosition.y,
    };
    console.log('%c⧭', 'color: #ff6600', deltaChange);
    this.lastMousePosition.x = event.pageX;
    this.lastMousePosition.y = event.pageY;
    const location = this.thisComponent.location;
    store.dispatch(pageActionTypes.UPDATE_LOCATION, deltaChange);

  }

  getStyles(): string {
    let style = '';
    const component: PageElementClasses = this.thisComponent;
    if (component) {
      style = component.getStylesToString();
    }
    return style;
  }

  getClasses(): string {
    let componentClassSpec: string = this.thisComponent.classDefinition;
    if (this.showBorder) {
      componentClassSpec += ' border1';
    }
    return componentClassSpec;
  }
}
