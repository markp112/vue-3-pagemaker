<template>
  <div class="flex flex-row flex-wrap justify-center p-2 h-28">
    <icon-image
      class="ml-2"
      :icon="horizontalStretch"
      @iconClick="iconClicked('horizontal')"
      tooltip="stretch horizontal"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="verticalStretch"
      @iconClick="iconClicked('vertical')"
      tooltip="stretch vertical"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="sizeToFit"
      @iconClick="iconClicked('zoomToFit')"
      tooltip="size to fit"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="zoomOut"
      @iconClick="iconClicked('out')"
      tooltip="zoom out"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="zoomIn"
      @iconClick="iconClicked('in')"
      tooltip="zoom in"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="zoomTo50"
      @iconClick="iconClicked('50')"
      tooltip="resize to 50%"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="zoomTo100"
      @iconClick="iconClicked('100')"
      tooltip="full size"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="i16x16"
      @iconClick="iconClicked('16')"
      tooltip="re-size 16x16"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="i24x24"
      @iconClick="iconClicked('24')"
      tooltip="re-size 24x24"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="i32x32"
      @iconClick="iconClicked('32')"
      tooltip="re-size 32x32"
    >
    </icon-image>
    <icon-image
      class="ml-2"
      :icon="i48x48"
      @iconClick="iconClicked('48')"
      tooltip="re-size 48x48"
    >
    </icon-image>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { useStore } from '@/store';
import { ImageManipulator } from '@/classes/images/image-manipulator/image-manipulator';
import { SidebarIcon } from '@/classes/sidebar/classes/sidebar-icon';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { StretchDirection, ZoomDirection } from '@/classes/images/types';
import IconImage from '@/components/base/icon/icon.vue';
// import { IconInterface } from '@/models/font-awesome/icon';
// import { ImageManipulator, ZoomDirection, StretchDirection } from '@/classes/images/image-manipulation/imageManipulation';
// import { PageModule } from '@/store/page/page';
// import { ImageElement } from '@/classes/page-element/page-components/image-element/ImageElement';
// import { Style } from '@/models/styles/styles';

@Options({
  components: {
    'icon-image': IconImage,
  },
})
export default class ImageSizingToolbar extends Vue {
  imageManipulator!: ImageManipulator;
  store = useStore();
  horizontalStretch: SidebarIcon = new SidebarIcon(
    'arrow_bidirectional-32.png',
    '',
    'stretch horizontally'
  );
  verticalStretch = new SidebarIcon(
    'arrow_vertical-32.png',
    '',
    'stretch vertically'
  );
  sizeToFit = new SidebarIcon('resize2-32.png', '', 'size to fit');
  zoomOut = new SidebarIcon('zoom_out-32.png', '', 'zoom out');
  zoomIn = new SidebarIcon('zoom_in-32.png', '', 'zoom in');
  zoomTo50 = new SidebarIcon('50-32.png', '', 'scale to 50%');
  zoomTo100 = new SidebarIcon('100-32.png', '', 'zoom to 100%');
  i16x16 = new SidebarIcon('16-32.png', '', '16x16');
  i24x24 = new SidebarIcon('24-32.png', '', '24x24');
  i32x32 = new SidebarIcon('32-32.png', '', '32x32');
  i48x48 = new SidebarIcon('48-32.png', '', '48x48');

  created(): void {
    const imageElement: ImageElement = this.store.getters
      .editedComponent as ImageElement;
    this.imageManipulator = new ImageManipulator(imageElement);
  }

  iconClicked(icon: string): void {
    this.imageManipulator.applyAction(icon as ZoomDirection | StretchDirection);
  }
}
</script>
