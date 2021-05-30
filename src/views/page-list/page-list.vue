<template>
  <section>
    <div class="flex flex-row justify-between ml-12 mt-8">
      <h2 class="page-heading">My Pages</h2>
      <base-button
          class="mr-4"
          buttonType="primary"
          variant="solid"
          @onClick="createNewPage()"
      >
        Create New
      </base-button>
    </div>
    <div class="flex flex-row justify-evenly font-bold ml-4 mt-10">
      <span class="w-1/12"></span>
      <span class="w-2/12">Page Name</span>
      <span class="w-2/12">Date Created</span>
      <span class="w-2/12">Last Edited</span>
      <span class="w-2/12">Active</span>
      <span class="w-1/12"></span>
    </div>
    <ul class="flex flex-col justify-start ml-4">
      <li v-for="page in pageList" :key="page.name" class="">
        <div class="flex flex-row justify-start">
          <span
            class="hover:bg-site-secondary-light hover:text-accent-1 w-11/12 p-1 mt-1 flex flex-row justify-evenly items-center cursor-pointer rounded-md"
            @click="pageRowClick(page.name)"
          >
            <span class="w-1/12">
              <span class="w-8 shadow-md">
                <img :src="getIcon(page.icon)" alt="">
              </span>
            </span>
            <span class="w-2/12  text-left">
              {{ page.name }}
            </span>
            <span class="w-2/12">
              {{ formatDate(page.created)}}
            </span>
            <span class="w-2/12">
              {{ formatDate(page.edited) }}
            </span>
            <span class="w-2/12 self-start">
              <input type="checkbox" value="page.active" readonly />
            </span>
          </span>
          <img
            src="@/assets/icons/pencil-24.png"
            alt="Edit pencil"
            @click="editPencilClick(page.name)"
            class="w-8 h-8 hover:shadow-xl cursor-pointer "
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ASitePage } from '@/classes/page/page';
import { AllActionTypes, useStore } from '@/store'
import { SiteAndUser } from '@/common/types/site-and-user';
import { formatDate } from '@/common/dates/date-functions';
import BaseButton from '@/components/base/base-button/base-button.vue';

@Options({
  components: {
      "base-button": BaseButton,
  }
})
export default class PageList extends Vue {
  name = "pageList";
  siteAndUser: SiteAndUser = {siteId: '', userId: ''}
  store = useStore();

  editPencilClick(pageName: string) {
    this.store.dispatch(AllActionTypes.UPDATE_CURRENT_PAGE, pageName)
    this.$router.push({ name: "page-editor", params: { title: "Edit Page" } });
  }

  created() {
    this.siteAndUser.siteId = this.store.getters.currentSite.siteId;
    this.siteAndUser.userId = this.store.getters.user.id;
  }

  mounted() {
    this.store.dispatch(AllActionTypes.LOAD_PAGES, this.siteAndUser );
  }

  getIcon(iconName: string): string {
    const path = require.context("@/assets/icons", false, /\.png$/);
    return path(`./${iconName}`);
  }

  formatDate(date: Date): string {
    return formatDate(date);
  }

  createNewPage() {
    this.$router.push({
      name: "page-editor",
      params: {
        title: "Create New Page"
      }
    });
  }

  pageRowClick(pageName: string) {
    this.$router.push({
      name: "page-builder",
      params: {
        title: pageName
      }
    });
  }

  get pageList(): ASitePage[] {
    return this.store.getters.pages;
  }
}
</script>
