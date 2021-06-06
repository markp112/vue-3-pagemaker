<template>
    <component :is="sidebarContent" :toolbarPanel="sidebarPanel"></component>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
// import sidebarComponentIcons from './sidebar-component-icons.vue';
import { useStore, AllActionTypes } from '@/store'
// import ImageEditorSidebar from '@/components/core/sidebar/image-editor/image-editor.vue';
// import SidebarPanelSiteSettings from '@/views/settings/core/sidebar/sidebar-panel.vue';
// import TextEditorSidebar from '@/components/core/sidebar/text-editor//text-editor.vue';
// import ButtonEditor from '@/components/core/sidebar/button-editor/button-editor.vue';
// import TextComponentSidebar from '@/components/core/sidebar/text-editor/text-component-sidebar.vue';
// import SitesMenu from '@/components/core/sidebar/sites-menu/sites-menu.vue';
// import SidebarContainerEditor from '@/components/base/buttons/sidebar-buttons/sidebar-container-editor.vue';
import {
  SidebarPanelBuilder,
} from '@/classes/sidebar/builders/sidebar-panel-builder';
import { SidebarPanel } from '@/classes/sidebar/classes/sidebar-panel';
import SidebarComponentIcons from '../component-icons/component-icons.vue';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';

@Options({

  components: {
    'sidebar-components': SidebarComponentIcons,
    // 'sites-menu': SitesMenu,
    // 'image-editor': ImageEditorSidebar,
    // 'text-editor': TextEditorSidebar,
    // 'container-editor': SidebarContainerEditor,
    // 'button-editor': ButtonEditor,
    // 'site-settings': SidebarPanelSiteSettings,
    // 'text-component-sidebar': TextComponentSidebar,
  }
})
export default class SideBar extends Vue {
  name ='sidebar-container'
  isShowSideBar = true;
  sidebarPanelBuilder: SidebarPanelBuilder = new SidebarPanelBuilder(
    'container-editor'
  );
  store = useStore();

  get sidebarContent(): SidebarComponentMenus {
    return this.store.getters.getSidebarComponent;
  }

  get sidebarPanel(): SidebarPanel {
    const panelType: SidebarComponentMenus = this.sidebarContent;
    return panelType !== 'site-settings'
      ? new SidebarPanelBuilder('container-editor').sidebarPanel
      : new SidebarPanelBuilder('site-settings').sidebarPanel;
  }
}
</script>

<style lang="postcss">
.icon-list-sidebar {
  @apply flex flex-row flex-wrap text-4xl justify-evenly mt-32 w-full;
}

.icon {
  @apply transform cursor-pointer;
}

.icon:hover {
  @apply shadow-xl -translate-x-1 -translate-y-1;
}

@screen md {
  .side-bar-show {
    @apply w-1/5;
  }

  .side-bar-hidden {
    @apply w-1/12;
  }
}
</style>
