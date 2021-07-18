<template>
  <div class="sidebar-panel">
    <span class="flex flex-row justify-end mr-2 mb-4">
      <close-button @onClick="closeButtonClick"></close-button>
    </span>
    <sidebar-accordian accordianTitle="Image" class="mb-4">
      <upload-image :urlEdited="currentImageUrl" @image-url="urlChanged">
      </upload-image>
    </sidebar-accordian>
    <div class="mt-2 h-full">
      <sidebar-accordian accordianTitle="Colours" class="mb-4">
        <colour-select
          flexAlignment="vertical"
          :showLabels="true"
        ></colour-select>
      </sidebar-accordian>
      <sidebar-accordian accordianTitle="Borders" class="mb-4">
        <border-buttons class="mt-2"> </border-buttons>
      </sidebar-accordian>
      <sidebar-accordian accordianTitle="Sizing" class="mb-4">
        <image-sizing-toolbar class="mt-2"> </image-sizing-toolbar>
      </sidebar-accordian>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { useStore } from '@/store';
import CloseButton from '@/components/base/base-button/close-button/close-button.vue';
import ColourSelect from '@/components/pickers/colour-picker/colour-selector/colour-selector.vue';
import Accordian from '../../accordian/accordian.vue';
import BorderButtons from '../../panel-buttons/borders/borders.vue';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import UploadImage from '@/components/pickers/upload-image/upload-image.vue';
import errorMessages from '@/common/errors/error-message';
import { pageActionTypes } from '@/store/modules/page';
import { sidebarActionTypes } from '@/store/modules/sidebar';
import ImageSizingToolbar from '../../panel-buttons/image-sizing/image-sizing.vue';

@Options({
  components: {
    'upload-image': UploadImage,
    'border-buttons': BorderButtons,
    'close-button': CloseButton,
    'colour-select': ColourSelect,
    'sidebar-accordian': Accordian,
    'image-sizing-toolbar': ImageSizingToolbar,
  }
})
export default class ImageEditorSidebar extends Vue {
  name = 'ImageEditorSidebar';
  currentImageUrl = '';
  store = useStore();

  mounted(): void {
    const editedComponent = this.getEditedComponent();
    this.currentImageUrl = editedComponent.content;
  }

  getEditedComponent(): ImageElement {
    const editedComponent = this.store.getters.editedComponent;
    if (editedComponent) {
      return editedComponent as ImageElement;
    }
    throw new Error(`${errorMessages.editedComponent.undefined}image-editor`);
  }

  urlChanged(image: ImageElement): void {
    this.store.dispatch(pageActionTypes.UPDATE_EDITED_COMPONENT, image);
  }

  closeButtonClick(): void {
    this.store.dispatch(sidebarActionTypes.SHOW_COMPONENT_ICONS, true);
  }
}
</script>
