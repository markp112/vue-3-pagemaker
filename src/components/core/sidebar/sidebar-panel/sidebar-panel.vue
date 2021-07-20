<template>
  <div class="h-screen space-y-4" :class="showSideBar">
    <component :is="sidebarContent" :toolbarPanel="sidebarPanel"></component>
  </div>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
// import sidebarComponentIcons from './sidebar-component-icons.vue';
import { useStore } from '@/store';
// import ImageEditorSidebar from '@/components/core/sidebar/image-editor/image-editor.vue';
// import SidebarPanelSiteSettings from '@/views/settings/core/sidebar/sidebar-panel.vue';
// import TextEditorSidebar from '@/components/core/sidebar/text-editor//text-editor.vue';
// import ButtonEditor from '@/components/core/sidebar/button-editor/button-editor.vue';
// import TextComponentSidebar from '@/components/core/sidebar/text-editor/text-component-sidebar.vue';
// import SitesMenu from '@/components/core/sidebar/sites-menu/sites-menu.vue';
// import SidebarContainerEditor from '@/components/base/buttons/sidebar-buttons/sidebar-panel-editor.vue';
import { SidebarPanelBuilder } from '@/classes/sidebar/builders/sidebar-panel-builder';
import { SidebarPanel } from '@/classes/sidebar/classes/sidebar-panel';
import SidebarComponentIcons from '../component-icons/component-icons.vue';
import { SidebarComponentMenus } from '@/common/types/sidebar-component-menus/sidebar-component-menus';
import SidebarContainerEditor from '../editor-panels/container-editor/container-editor.vue';
import ImageEditorSidebar from '../editor-panels/image/image-editor.vue';

@Options({
  components: {
    'sidebar-components': SidebarComponentIcons,
    // 'sites-menu': SitesMenu,
    'image-editor': ImageEditorSidebar,
    // 'text-editor': TextEditorSidebar,
    'container-editor': SidebarContainerEditor,
    // 'button-editor': ButtonEditor,
    // 'site-settings': SidebarPanelSiteSettings,
    // 'text-component-sidebar': TextComponentSidebar,
  }
})
export default class SideBarPanel extends Vue {
  name = 'sidebar-panel';
  isShowSideBar = false;
  sidebarPanelBuilder: SidebarPanelBuilder = new SidebarPanelBuilder(
    'container-editor'
  );
  store = useStore();

  get sidebarContent(): SidebarComponentMenus {
    return this.store.getters.getSidebarComponent;
  }

  get sidebarPanel(): SidebarPanel {
    if (this.isShowSideBar) {
      const panelType: SidebarComponentMenus = this.sidebarContent;
      return panelType !== 'site-settings'
        ? new SidebarPanelBuilder('container-editor').sidebarPanel
        : new SidebarPanelBuilder('site-settings').sidebarPanel;
    } else {
      return new SidebarPanel();
    }
  }

  get showSideBar(): string {
    console.log('%c%s', 'color: #733d00', 'showSideBar', this.store.getters.isShowSidebar)
    return this.store.getters.isShowSidebar ? 'w-2/12' : 'w-0 hidden';
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
