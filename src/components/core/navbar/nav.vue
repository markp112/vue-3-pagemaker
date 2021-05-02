<template>
  <div class="py-2 bg-sitePrimary shadow-lg h-16 z-20">
    <nav class="text-onPrimary flex items-center justify-between">
      <div class="ml-8">
        <img
          :src="getPath('layout-48.png')"
          class="ml-2 text-primary-200 cursor-pointer hover:text-primary-100 self-start"
        />
      </div>
      <div class="mr-2 flex justify-between relative">
        <img
          :src="getPath('menu-48.png')"
          class="ml-2 text-primary-200 cursor-pointer hover:bg-siteSecondary self-start"
          @click="toggleMenu = !toggleMenu"
        />

        <div
          class="flex justify-end toggleable z-20 absolute top-0 right-0"
          v-if="toggleMenu"
        >
          <ul
            class="w-20 mr-1 dropdown-menu-background z-10 rounded-lg shadow-lg"
            @mouseleave="toggleMenu = !toggleMenu"
          >
            <li
              v-for="(menuItem, idx) in menuItems"
              :key="idx"
              @click="menuItemClick(idx, menuItem.isVisible)"
              v-show="getIsVisible(menuItem.isVisible)"
              class="block p-1 text-left dropdown-menu-item rounded-lg"
            >
              {{ menuItem.navText }}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { useStore } from "@/store";
import { NavMenuModule } from "@/store/modules/nav-menu";
import { NavMenuItem } from "@/classes/base/navbar/nav-menu/NavMenuItem";
import { getPath } from "@/common/get-path/";

@Options({})
export default class NavMenuComponent extends Vue {
  name = "NavMenuComponent";
  toggleMenu = false;
  store = useStore();

  get menuItems(): NavMenuItem[] {
    const menuItems = this.store.getters.navMenuItems;
    console.log("%c%s", "color: #ff0000", menuItems);
    return menuItems;
  }

  menuItemClick(id: number, isVisible: boolean) {
    this.$router.push(this.menuItems[id].navLink);
  }

  getPath(image: string): string {
    return getPath(image);
  }
}
</script>
