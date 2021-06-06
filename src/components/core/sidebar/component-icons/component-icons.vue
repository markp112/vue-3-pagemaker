<template>
  <div class="sidebar-panel">
    <p
      class="flex flex-row w-8/12 justify-evenly p-2 rounded-md text-siteSurface mb-2 border border-onPrimary cursor-pointer hover:bg-gray-600"
      @click="onSaveClick()"
      >
      <img
        :src="getPath('floppy_disk-32.png')"
        class="text-accent-600 "

      />
      Save Page

    </p>
    <p class=" mt-3 text-lg">Containers</p>
    <ul
      class="flex flex-row flex-wrap text-4xl justify-evenly w-full mt-4 ml-2 mr-2"
    >
      <li v-for="element in sidebarContainers" :key="element.componentName">
        <draggable-icon draggable="true" :id="element.componentName">
          <icon-image
            :icon="element.sidebarIcon"
            classDef="icon"
            :id="element.componentName"
          ></icon-image>
        </draggable-icon>
      </li>
    </ul>
    <p class="mt-3 text-lg">Elements</p>
    <ul
      class="flex flex-row flex-wrap text-4xl justify-evenly w-full mt-4 ml-2 mr-2"
    >
      <li v-for="element in sidebarElements" :key="element.componentName">
        <draggable-icon draggable="true" :id="element.componentName">
          <icon-image
            :icon="element.sidebarIcon"
            classDef="icon"
            :id="element.componentName"
          ></icon-image>
        </draggable-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import  {Vue, Options } from "vue-class-component";
import { AllActionTypes, useStore } from '@/store';
import { SiteAndUser } from '@/common/types/site-and-user';
import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import DraggableIcon from '../draggable-icon/draggable-con.vue';
import IconImage from '@/components/base/icon/icon.vue';

@Options({
  components: {
    "draggable-icon": DraggableIcon,
    "icon-image": IconImage,
  }
})
export default class SidebarComponentIcons extends Vue {
  store = useStore();

  created() {
    this.store.dispatch(AllActionTypes.LOAD_SIDEBAR_ELEMENTS, true);
  }

  onSaveClick() {
    const SiteIdAndUserId: SiteAndUser = this.getSiteAndUserID();
  //   this.$store
  //     .dispatch("savePageContent", SiteIdAndUserId)
  //     .then(notification => {
  //       this.showSnackbar(notification, "Page Saved");
  //     })
  //     .catch((err: Notification) => {
  //       console.log(err);
  //       err.message = "There was an issue with saving the page";
  //       this.showSnackbar(err, "Page save failed");
  //     });
  }

  get sidebarContainers(): ASidebarElement[] {
    return this.store.getters.getSidebarContainers;
  }

  get sidebarElements(): ASidebarElement[]  {
    return this.store.getters.getSidebarElements;
  }

  private getPath(image: string): string {
    const path = require.context("@/assets/icons", false, /\.png$/);
    return path(`./${image}`);
  }

  private getSiteAndUserID(): SiteAndUser {
    return {
      siteId: this.store.getters.currentSite.siteId,
      userId: this.store.getters.user.id
    };
  }
}
</script>

<style lang="postcss" scoped>
.icon-list-sidebar {
  @apply flex flex-row flex-wrap text-4xl justify-evenly w-full;
}

.icon {
  @apply transform cursor-pointer mr-2;
}

.icon:hover {
  @apply shadow-xl -translate-x-1 -translate-y-1;
}
</style>
