<template>
  <section>
    <div class="flex flex-row justify-between text-accent1">
      <h2 class="page-heading">My Sites</h2>
      <create-new-button @onClick="createNewSite"></create-new-button>
    </div>
    <ul class="flex flex-row justify-evenly w-full mt-20">
      <li class="rounded-md ml-3" v-for="site in sites" :key="site.siteId">
        <site-card :site="site"></site-card>
      </li>
    </ul>
  </section>
</template>



<script lang="ts">
import {Vue, Options} from "vue-class-component";
import { ASite } from "@classes/base/sites/ASite";
import { AllActionTypes, useStore } from '@/store';
import { SidebarModule } from "@/store/sidebar//sidebar";
import CreateNewButton from "@/components/base/buttons/create-new/create-new.vue";
import SiteCard from "@/components/base/cards/site-card/site-card.vue";

@Options({
  components: {
    "create-new-button": CreateNewButton,
    "site-card": SiteCard
  }
})
export default class SitesList extends Vue {
  name = "SitesList";
  store = useStore();
  userId = useStore().getters.user.id;

  created() {
    this.store.dispatch(AllActionTypes.LOAD_SITES, this.userId);
    SidebarModule.setSidebarMenuTo("sites-menu");
  }

  createNewSite(): void {
    this.$router.push({ name: "newSite", params: { title: "New Site" } });
  }

  isPublished(datePublished: string): string {
    if (datePublished === "" || datePublished === undefined) {
      return "unpublished";
    } else {
      return datePublished;
    }
  }

  get sites(): ASite[] {
    return this.store.getters.siteList;
  }
}
</script>
