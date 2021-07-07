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
          class="w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light"
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
        <datepicker
          v-model="page.created"
          name="created"
          class="w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light -ml-11"
          inputFormat="dd-MM-yyyy">
        </datepicker>
      </div>
      <div class="field-wrapper">
        <label for="edited">Edited:</label>
        <span class="bg-white py-1 px-2 leading-4 text-site-primary-light">
            {{ formatDate(page.edited) }}
        </span>
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
      <div class="w-full mt-8 flex justify-between">
        <base-button
          buttonType="primary"
          variant="outline"
          size="small"
          @onClick="cancelClick"
        >
          Cancel
        </base-button>
        <base-button
          buttonType="primary"
          size="small"
          @onClick="saveClick()"
        >
          Save
        </base-button>
      </div>
      <invalid-form :formErrors="formErrors"></invalid-form>
    </form>
  </div>
</template>

<script lang="ts">
import  { Vue, Options, } from "vue-class-component";
import { ASitePage } from '@/classes/page/page';
import { useStore, AllActionTypes } from '@/store';
import { formatTimeStampAsDate, TimeStamp, formatDate } from '@/common/dates/date-functions';
import { Notification } from '@/models/notification/notification';
import IconPicker from "@/components/pickers/icon-picker/icon-picker.vue";
import BaseButton from '@/components//base/base-button/base-button.vue';
import Datepicker from 'vue3-datepicker';
import InvalidForm from '@/components/base/notifications/invalid-form/invalid-form.vue';
import { getSiteAndUserId } from '@/common/site-and-user/site-and-user';
import { showTheSnackbar } from '@/common/show-snackbar/show-snackbar';

@Options({
  components: {
    "icon-picker": IconPicker,
    "base-button": BaseButton,
    'invalid-form': InvalidForm,
    Datepicker,
  }
})
export default class PageEditor extends Vue {
  pageTitle!: string | string [];
  page!: ASitePage;
  dateCreated!: Date;
  showIconPicker = false;
  formErrors: string[] = [];
  store = useStore();
  siteAndUser = getSiteAndUserId();

  created() {
    this.pageTitle = this.$route.params.title;
    this.page = this.store.getters.currentPage;
      let dateTimeStamp: TimeStamp = {
      seconds: new Date().getTime()/1000,
      nanoseconds: 0
    };

    this.page.edited = formatTimeStampAsDate(dateTimeStamp);
    dateTimeStamp = {
      seconds: this.page.created.getSeconds(),
      nanoseconds: 0
    };
    this.dateCreated = formatTimeStampAsDate(dateTimeStamp);
    this.formErrors = [];
  }

  get getFormErrors(): string[] {
    return this.formErrors;
  }

  getIcon(iconName: string): string {
    if (iconName === '') return '';
    return require(`@/assets/icons/${iconName}`);
  }

  formatDate(date: Date): string  {
    return formatDate(date);
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
    this.formErrors = this.validateForm();
    if (this.formErrors.length === 0) {
      this.page.edited = new Date();
      this.savePage();
    };
  }

  validateForm(): string[] {
    const errors: string[] = [];
    if (this.page.name.length === 0) {
      errors.push("Page name is required");
    }
    const pageList: ASitePage[] = this.store.getters.pages;
    if (pageList !== undefined) {
      console.log('%c⧭', 'color: #0088cc', pageList)
      if (pageList.filter(page => page.name === this.page.name && page.id !== this.page.id).length > 0) {
        errors.push("Page name must be unique");
      }
    }
    if (this.page.icon === '') {
      errors.push('An Icon is required');
    }
    return errors;
  }

  savePage(): void {
    this.store.dispatch(AllActionTypes.ADD_A_NEW_PAGE,
      {
        page: this.page,
        siteAndUser: this.siteAndUser,
      }
    )
    .then(result => {
        const notification = result;
        if (notification.status === "ok") {
          const message = `The ${this.page.name} page has been created`;
          showTheSnackbar('Page saved', message, 'success')
        }
      })
      .catch(err => {
        const errMsg = err as Notification;
        showTheSnackbar( "Error", errMsg.message, 'error');
      });
  }

}
</script>

<style lang="postcss">


label {
  @apply text-sm justify-self-start inline-block w-2/12 text-left;
}

input,
datepicker,
textarea {
  @apply w-9/12 border-solid border bg-white py-1 px-2 leading-4 text-site-primary-light;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2 ml-1;
}
</style>
