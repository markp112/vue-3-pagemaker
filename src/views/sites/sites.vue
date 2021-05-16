<template>
  <section>
    <div class="flex flex-row justify-between text-accent1">
      <h2 class="page-heading">My Sites</h2>
      <base-button
        buttonType="primary"
        variant="solid"
        @onClick="createNewSite()"
      >
        Create New
      </base-button>
    </div>
    <ul class="flex flex-row justify-evenly w-full mt-20">
      <li class="rounded-md ml-3" v-for="site in sites" :key="site.siteId">
        <site-card :site="site" ></site-card>
      </li>
    </ul>
  </section>

</template>



<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { ASite } from "@classes/base/sites/ASite";
import { AllActionTypes, useStore } from '@/store';
import { sidebarActionTypes } from "@/store/modules/sidebar";
import BaseButton from "@/components/base/base-button/baseButton.vue";
import SiteCard from "@/components/base/cards/site-card/site-card.vue";

@Options({
  components: {
    "base-button": BaseButton,
    "site-card": SiteCard,
  }
})
export default class SitesList extends Vue {
  name = "sites-list";
  store = useStore();
  userId = useStore().getters.user.id;

  created() {
    this.store.dispatch(AllActionTypes.LOAD_SITES, this.userId);

    this.sites.forEach(site => console.log(site))
    this.store.dispatch(sidebarActionTypes.SHOW_SIDEBAR_ACTIVE_MENU,'sites-menu');
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
