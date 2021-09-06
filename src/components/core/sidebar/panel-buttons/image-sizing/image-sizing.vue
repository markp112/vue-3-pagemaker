<template>
  <div class="flex flex-row flex-wrap justify-center p-2 h-28">
    <icon-image
      v-for="(icon, index) in icons"
      :key="index"
      class="ml-2 mb-2"
      :icon="icon.icon"
      @iconClick="iconClicked(icon.className)"
      :tooltip="icon.toolTip"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { useStore } from '@/store';
import { SidebarIcon } from '@/classes/sidebar/classes/sidebar-icon';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { StretchDirection, ZoomDirection } from '@/classes/images/types';
import IconImage from '@/components/base/icon/icon.vue';
import { Zoom } from '@/classes/images/zoom/zoom';
import { StretchImage } from '@/classes/images/stretch-image/stretch-image';

@Options({
  components: {
    'icon-image': IconImage,
  },
})
export default class ImageSizingToolbar extends Vue {
  store = useStore();
  horizontalStretch: SidebarIcon = new SidebarIcon(
    'arrow_bidirectional-32.png',
    'horizontal',
    'stretch horizontally'
  );
  verticalStretch = new SidebarIcon(
    'arrow_vertical-32.png',
    'vertical',
    'stretch vertically'
  );
  sizeToFit = new SidebarIcon('resize2-32.png', 'zoomToFit', 'size to fit');
  zoomOut = new SidebarIcon('zoom_out-32.png', 'out', 'zoom out');
  zoomIn = new SidebarIcon('zoom_in-32.png', 'in', 'zoom in');
  zoomTo50 = new SidebarIcon('50-32.png', '50', 'scale to 50%');
  zoomTo100 = new SidebarIcon('100-32.png', '100', 'zoom to 100%');
  i16x16 = new SidebarIcon('16-32.png', '16', '16x16');
  i24x24 = new SidebarIcon('24-32.png', '24', '24x24');
  i32x32 = new SidebarIcon('32-32.png', '32', '32x32');
  i48x48 = new SidebarIcon('48-32.png', '48', '48x48');
  icons: SidebarIcon[] = [
    this.horizontalStretch,
    this.verticalStretch,
    this.sizeToFit,
    this.zoomOut,
    this.zoomIn,
    this.zoomTo50,
    this.zoomTo100,
    this.i16x16,
    this.i24x24,
    this.i32x32,
    this.i48x48,
  ];

  iconClicked(icon: string): void {
    if (icon === 'vertical' || icon === 'horizontal') {
      const stretchImage = new StretchImage(this.store.getters
        .editedComponent as ImageElement);
        stretchImage.stretchImage(icon as StretchDirection)
    } else {
      const zoom = new Zoom(this.store.getters
        .editedComponent as ImageElement);
      zoom.zoom(icon as ZoomDirection)
    }
  }
}
</script>
