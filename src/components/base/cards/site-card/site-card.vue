<template>
  <div class="flex flex-col justify-start w-64 border-2 shadow-lg" v-if="$props.site">
    <img :src="$props.site.image" alt="" class="w-full object-cover" />
    <div class="flex flex-row justify-between p-5">
      <p>{{ $props.site.name }}</p>
      <img
        src="@/assets/icons/pencil-32.png"
        alt=""
        class="cursor-pointer"
        @click="editSiteClick()"
      />
    </div>
    <div class="flex flex-row justify-center align-middle  h-full">
      <img
        src="@/assets/images/Go-Circle-blue.png"
        alt=""
        class="object-contain cursor-pointer w-32 h-auto"
        @click="goClick()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import  { Options } from 'vue-class-component';
import { useStore } from '@/store';
import { sitesActionTypes } from "@/store/modules/sites";
import { ASite } from '@/classes/base/sites/ASite';
import { Notification } from '@/models/notification/notification';
import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults';
import SnackbarMixin from '@/components/mixins/snackbar/snackbar';

@Options({
  props: {
    site: {
      default:(): ASite => { return new ASite()  }
    },
  },

})
export default class SiteCard extends SnackbarMixin {
  name = "site-card";
  site!: ASite;
  store = useStore();

  editSiteClick() {
    this.store.dispatch(sitesActionTypes.SET_CURRENT_SITE, this.site.siteId);
    this.$router.push({ name: "newSite", params: { title: "Edit Site" } });
  }

  goClick() {
    this.store.dispatch(sitesActionTypes.SET_CURRENT_SITE, this.site.siteId);
    const siteDefaultSettings = SiteDefaults.getInstance();
    siteDefaultSettings.loadDefaults().catch(err => {
      const notification: Notification = err as Notification;
      this.showSnackbar(
        notification,
        "Site defaults load failed, defaults applied"
      );
    });
    this.$router.push({ name: "pageList" });
  }
}
</script>
