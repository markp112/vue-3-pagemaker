<template>
  <div
    class="bg-gray-500 w-24 h-8 flex flex-row justify-between absolute p-1 rounded-md z-10 right-0 top-0 shadow-xl"
    v-if="isVisible"
  >
    <div class="relative" v-if="showPen">
      <img
        src="@/assets/icons/fountain_pen-24.png"
        alt="edit text"
        @click="editPenClick()"
        @mouseover="showPenToolTip=true"
        @mouseleave="showPenToolTip=!showPenToolTip"
        class="cursor-pointer hover:bg-site-secondary-light"
      />
        <tooltip
          tooltip="Edit text"
          :showToolTip="showPenToolTip"
        ></tooltip>

    </div>
    <div class="relative">
      <img
        src="@/assets/icons/trash_can-24.png"
        alt="remove item"
        @click="trashClick()"
        @mouseover="showBinToolTip=true"
        @mouseleave="showBinToolTip=!showBinToolTip"
        class="cursor-pointer hover:bg-site-secondary-light"
      />
        <tooltip
          tooltip="delete element"
          :showToolTip="showBinToolTip"
        ></tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import  { Vue, Options } from "vue-class-component";
import ToolTip from "@/components/base/notifications/tooltip/tooltip.vue";
import { useStore } from '@/store';
import { pageActionTypes } from '@/store/modules/page';
import { sidebarActionTypes } from '@/store/modules/sidebar';

@Options({
  props: {
    showMe: { default: false }
  },
  components: {
    tooltip: ToolTip
  }
})
export default class EditDeleteOption extends Vue {
  name = 'edit menu'
  showMe = false;
  showPenToolTip = false;
  showBinToolTip = false;
  store = useStore();

  updated() {
    this.showPenToolTip = this.showBinToolTip = false;
  }

  editPenClick(): void {
    this.store.dispatch(pageActionTypes.UPDATE_SHOW_EDIT_DELETE, false);
    // this.store.dispatch(sidebarActionTypes.SHOW_TEXT_MODAL, true);
    this.$router.push('/texteditor');
    // SidebarModule.updateSidebarEditor(true);
  }

  trashClick(): void {
    this.store.dispatch(pageActionTypes.UPDATE_SHOW_EDIT_DELETE, false);
    this.store.dispatch(pageActionTypes.DELETE_A_PAGE_ELEMENT, true);
    this.store.dispatch(sidebarActionTypes.SHOW_SIDEBAR_ACTIVE_MENU, 'sidebar-components');
  }

  get isVisible(): boolean {
    return this.store.getters.showEditDelete ;
  }

  get showPen(): boolean {
    return this.store.getters.editedComponent!.type === 'text';
  }
}
</script>
