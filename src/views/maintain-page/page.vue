<template>
  <div class="form-page-wrapper mt-24 w-full flex-wrap h-full">
    <div class="w-7/12 bg-secondary-100 text-accent1 text-3xl flex flex-row mb-2">
      <img src="@/assets/images/page-icon.png" alt="picture of lined paper" />
      <p class="mt-4">{{ pageTitle }}</p>
    </div>
    <form
      @submit.prevent="saveClick"
      class="w-7/12 border-2 p-5 bg-secondary-900"
    >
      <div class="field-wrapper">
        <label for="page-name">Name:</label>
        <input
          type="text"
          id="page-name"
          v-model="page.name"
          class="input-control"
          placeholder="e.g Home, Blog Home and must be unique"
        />
      </div>
      <div class="field-wrapper">
        <label for="icon">Select Icon:</label>
        <div class="flex flex-row justify-start">
          <span
            class="h-8 w-8 bg-accent1 text-center font-bold align-middle border cursor-pointer relative inline-block"
            @click="iconPickerClicked()"
          >
            ...
          </span>
          <span>
          <img :src="getIcon(page.icon)" alt="">
          </span>
          <icon-picker @iconClick="iconClick($event)" id="icon" :showMe="showIconPicker"> </icon-picker>
        </div>
      </div>
      <div class="field-wrapper">
        <label for="created">Created:</label>
        <!-- <datepicker :value="page.created" id="created" name="created">
        </datepicker> -->
      </div>
      <div class="field-wrapper">
        <label for="edited">Edited:</label>
          {{ formatDate(page.edited) }}
      </div>
      <div class="field-wrapper">
          <label for="active">Active:</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            :value="page.active"
            class="w-1/12"
          />
      </div>
      <div class="w-16 ml-auto">
        <base-button
          buttonType="primary"
          @cancelClicked="cancelClick"
          @saveClicked="saveClick()"
        >
          submit
        </base-button>
      </div>
      <!-- <invalid-form :formErrors="formErrors"></invalid-form> -->
    </form>
  </div>
</template>

<script lang="ts">
import  { Vue, Options } from "vue-class-component";
import IconPicker from "@/components/pickers/icon-picker/icon-picker.vue";
// import InvalidForm from "@/components/base/notifications/invalid-form.vue";
import BaseButton from '@/components//base/base-button/base-button.vue';
import { ASitePage } from '@/classes/page/page';
import { useStore, AllActionTypes } from '@/store';
import { formatTimeStampAsDate, TimeStamp, formatDate } from '@/common/dates/date-functions';
import { SiteAndUser } from '@/common/types/site-and-user';
import { SnackBarGenerator } from '@/classes/base/notification/snackbar/snackbarGenerator';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { Notification } from '@/models/notification/notification'

@Options({
  components: {
    "icon-picker": IconPicker,
    "base-button": BaseButton,
    // "invalid-form": InvalidForm,
  }
})
export default class PageEditor extends Vue {
  pageTitle!: string | string [];
  page!: ASitePage;
  formErrors!: string[];
  dateCreated!: Date;
  showIconPicker = false;
  store = useStore();
  siteAndUser: SiteAndUser = {
      siteId: this.store.getters.currentSite.siteId,
      userId: this.store.getters.user.id,
    };

  created() {
    this.pageTitle = this.$route.params.title;
    this.page = this.store.getters.currentPage;
    const DateTimeStamp: TimeStamp = {
      seconds: this.page.created.getSeconds(),
      nanoseconds: 0
    };
    this.dateCreated = formatTimeStampAsDate(DateTimeStamp);
    this.formErrors = [];
  }

  getIcon(iconName: string): string {
    if (iconName === '') return '';
    return require(`@/assets/icons/${iconName}`);
  }

  formatDate(date: string) {
    const dateTimeStamp: TimeStamp = {
      seconds: this.page.edited.getSeconds(),
      nanoseconds: 0
    };
    formatDate(formatTimeStampAsDate(dateTimeStamp))
  }

  iconPickerClicked() {
    this.showIconPicker = !this.showIconPicker;
  }

  iconClick(icon: string) {
    this.showIconPicker = false;
    this.page.icon = icon;
  }

  cancelClick() {
    this.$router.push({ name: "pageList" });
  }

  saveClick() {
    this.formErrors = [];
    const errors: string[] = this.validateForm();
    if (errors.length === 0) {
      this.page.edited = new Date();
      this.savePage();
    } else {
      this.formErrors = errors;
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    if (this.page.name.length === 0) {
      errors.push("page name is required");
    }
    const pageList: ASitePage[] = this.store.getters.pages;
    if (pageList !== undefined) {
      if (pageList.filter(page => page.name === this.page.name).length > 0) {
        errors.push("Page name must be unique");
      }
    }
    return errors;
  }

  savePage(): void {
    this.store.dispatch(AllActionTypes.ADD_A_NEW_PAGE,
      {
        page: this.page,
        siteAndUser: this.siteAndUser
      }
    )
    .then(result => {
        const notification = result;
        if (notification.status === "ok") {
          const snackbarMessage: SnackbarMessage = SnackBarGenerator.snackbarSuccess(
            `The ${this.page.name} page has been created`,
            "Page Saved"
          );
          this.store.dispatch(AllActionTypes.SHOW_SNACKBAR, snackbarMessage);
        } else {
          this.showErrorsnackbar(notification.message, "Error on Save");
        }
      })
      .catch(err => {
        const errMsg = err as Notification;
        this.showErrorsnackbar(errMsg.message, "System Error");
      });
  }

  showErrorsnackbar(message: string, title: string) {
    const snackbarMessage = SnackBarGenerator.snackbarError(message, title);
    this.store.dispatch(AllActionTypes.SHOW_SNACKBAR, snackbarMessage);
  }
}
</script>

<style lang="postcss">


label {
  @apply text-sm justify-self-start inline-block w-2/12 text-left;
}

input,
textarea {
  @apply w-9/12 border-solid border bg-accent-2;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2 ml-1;
}
</style>
