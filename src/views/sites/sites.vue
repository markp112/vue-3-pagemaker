<template>
  <section>
    <div class="flex flex-row justify-between text-accent1 mt-8">
      <h2 class="page-heading ml-4">My Sites</h2>
      <div class="w-32">
        <base-button
          class="mr-4"
          buttonType="primary"
          variant="solid"
          @onClick="createNewSite()"
        >
          Create New
        </base-button>
      </div>
    </div>
    <ul class="flex flex-row justify-evenly w-full mt-20">
      <li class="rounded-md ml-3" v-for="site in sites" :key="site.siteId">
        <site-card :site="site" @siteClicked="siteClicked($event)"></site-card>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ASite } from '@classes/base/sites/ASite';
import { AllActionTypes, useStore } from '@/store';
import BaseButton from '@/components/base/base-button/base-button.vue';
import SiteCard from '@/components/base/cards/site-card/site-card.vue';
import { sitesActionTypes } from '@/store/modules/sites';
import { Notification } from '@/models/notification/notification';
import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar';
import { SnackBarGenerator } from '@/classes/base/notification/snackbar/snackbarGenerator';

@Options({
  components: {
    "base-button": BaseButton,
    "site-card": SiteCard,
  }
})
export default class SitesList extends Vue{
  name = "sites-list";
  store = useStore();
  userId = useStore().getters.user.id;

  created() {
    this.store.dispatch(AllActionTypes.LOAD_SITES, this.userId);
    this.store.dispatch(AllActionTypes.SET_SHOW_SIDEBAR, false);
    this.sites.forEach(site => console.log(site))
  }

  createNewSite(): void {
    this.$router.push({ name: "newSite", params: { title: "New Site" } });
  }

  siteClicked(siteId: string) {
    this.store.dispatch(sitesActionTypes.SET_CURRENT_SITE, siteId);
    const siteDefaultSettings = SiteDefaults.getInstance();
  // move to pageList
  siteDefaultSettings.loadDefaults()
    .then(() => {
      this.$router.push({ name: "pageList" });
    })
    .catch(err => {
      console.log('%c⧭', 'color: #514080', err)
      const notification: Notification = err as Notification;
      this.showErrorsnackbar(
        notification.message,
        "Site defaults load failed, defaults applied"
      );
    });
  }

  isPublished(datePublished: string): string {
    if (datePublished === "" || datePublished === undefined) {
      return "unpublished";
    } else {
      return datePublished;
    }
  }

    showErrorsnackbar(message: string, title: string) {
    const snackbar = SnackBar.getInstance();
    const snackbarMessage = SnackBarGenerator.snackbarError(message, title);
    snackbar.snackbarMessage = snackbarMessage;
    snackbar.showSnackbar();
  }

  get sites(): ASite[] {
    return this.store.getters.siteList;
  }
}
</script>
