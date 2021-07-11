<template>
  <div class="sidebar-panel">
    <span class="flex flex-row justify-end mr-2 mb-4 w-full">
      <close-button @onClick="closeButtonClick"></close-button>
    </span>
    <div class="mt-4">
      <div
        class="w-full"
        v-for="(toolbar, index) in $props.toolbarPanel.sidebarPanels"
        :key="index"
      >
        <sidebar-accordian :accordianTitle="toolbar.toolbarTitle" class="mb-4">
          <sidebar-toolbar
            :toolbarItems="toolbar"
            @iconClick="iconClick($event)"
          >
          </sidebar-toolbar>
        </sidebar-accordian>
      </div>
      <sidebar-accordian accordianTitle="Margins" class="mb-4">
        <margin-buttons></margin-buttons>
      </sidebar-accordian>
      <sidebar-accordian accordianTitle="Colours" class="mb-4">
        <colour-select flexAlignment="vertical" :showLabels="true">
        </colour-select>
      </sidebar-accordian>
      <sidebar-accordian accordianTitle="Borders" class="mb-4">
        <border-buttons class="mt-2"></border-buttons>
      </sidebar-accordian>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { useStore } from '@/store';
import { SidebarPanel } from '@/classes/sidebar/classes/sidebar-panel';
import { sidebarActionTypes } from '@/store/modules/sidebar';
import ColourSelect from '@/components/pickers/colour-picker/colour-selector/colour-selector.vue';
import CloseButton from '@/components/base/base-button/close-button/close-button.vue';
import Accordian from '../../accordian/accordian.vue';
import BorderButtons from '../../panel-buttons/borders/borders.vue';
import Margins from '../../panel-buttons/margins/margins.vue';
import SidebarToolbarScreen from '../../sidebar-buttons/sidebar-toolbar/sidebar-toolbar.vue';

@Options({
  props: {
    toolbarPanel: {
      default: (): SidebarPanel => {
        return new SidebarPanel();
      }
    }
  },
  components: {
    "close-button": CloseButton,
    "sidebar-toolbar": SidebarToolbarScreen,
    "colour-select": ColourSelect,
    "sidebar-accordian": Accordian,
    "border-buttons": BorderButtons,
    "margin-buttons": Margins
  }
})
export default class SidebarContainerEditor extends Vue {
  name = "SidebarContainerEditor";
  store = useStore();

  iconClick(classDef: string) {
    this.store.getters.editedComponent!.classDefinition = classDef;
    this.$emit('iconClick')
  }

  closeButtonClick(): void {
    this.store.dispatch(sidebarActionTypes.SHOW_COMPONENT_ICONS, true);
  }
}
</script>
