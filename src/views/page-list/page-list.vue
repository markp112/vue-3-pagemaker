<template>
  <section>
    <div class="flex flex-row justify-between mt-8">
      <h2 class="page-heading ml-4">My Pages</h2>
      <div class="w-32">
        <base-button
          class="mr-4 w-32"
          buttonType="primary"
          variant="solid"
          @onClick="createNewPage()"
        >
          Create New
        </base-button>
      </div>
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
                <img :src="getIcon(page.icon)" alt=""/>
              </span>
            </span>
            <span class="w-2/12 text-left">
              {{ page.name }}
            </span>
            <span class="w-2/12">
              {{ formatDate(page.created) }}
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
            class="w-8 h-8 hover:shadow-xl cursor-pointer"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ASitePage } from '@/classes/page/page';
import { AllActionTypes, useStore } from '@/store';
import { SiteAndUser } from '@/common/types/site-and-user';
import { formatDate } from '@/common/dates/date-functions';
import BaseButton from '@/components/base/base-button/base-button.vue';
import { getSiteAndUserId } from '@/common/site-and-user/site-and-user';

@Options({
  components: {
      'base-button': BaseButton,
  }
})
export default class PageList extends Vue {
  name = 'pageList';
  siteAndUser: SiteAndUser = {siteId: '', userId: ''}
  store = useStore();

  editPencilClick(pageName: string): void {
    this.store.dispatch(AllActionTypes.UPDATE_CURRENT_PAGE, pageName);
    this.$router.push({ name: 'page-editor', params: { title: 'Edit Page' } });
  }

  created(): void {
    this.store.dispatch(AllActionTypes.SET_SHOW_SIDEBAR, false);
    this.siteAndUser = getSiteAndUserId();
  }

  mounted(): void {
    this.store.dispatch(AllActionTypes.LOAD_PAGES, this.siteAndUser );
  }

  getIcon(iconName: string): string {
    return require(`@/assets/icons/${iconName}`)
  }

  formatDate(date: Date): string {
    return formatDate(date);
  }

  createNewPage() {
    this.$router.push({
      name: 'page-editor',
      params: {
        title: 'Create New Page'
      }
    });
  }

  pageRowClick(pageName: string) {
    this.$router.push({
      name: 'page-builder',
      params: {
        title: pageName,
      },
    });
  }

  get pageList(): ASitePage[] {
    return this.store.getters.pages;
  }
}
</script>
