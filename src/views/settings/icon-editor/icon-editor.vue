<template>
  <section class="h-full overflow-hidden">
    <p class="mt-2">Side Bar Icon Editor</p>
    <div class="flex flex-row justify-start h-full overflow-hidden">
      <div class=" w-2/12 border-r-2 border-gray-500  flex-wrap mt-8 ml-2">
        <base-button
          size="small"
          variant="solid"
          @onClick="createNew">New</base-button>
        <ul class="flex flex-row justify-start flex-wrap align-top mt-4">
          <li
            v-for="(element, idx) in icons"
            :key="idx"
            class="text-2xl w-4/12 cursor-pointer"
          >
            <icon-image :icon="element.sidebarIcon" @iconClick="iconClicked"/>
          </li>
        </ul>
      </div>
      <div class="ml-5 mt-5 w-9/12">
        <form submit.prevent>
          <div class="dimensions">
            <text-input
              :value="editorComponent.componentName"
              width="w-64"
              label="Name of the editor component"
              @onChange="editorComponent.componentName=$event"
            />
          </div>
          <text-input
            :value="editorComponent.componentRef"
            label="HtmlTag for component on the page values container or generic"
            @onChange="editorComponent.componentRef = $event"
          />
          <div class="flex flex-row justify-start">
            <label for="icon">Select Icon</label>
            <span
              class="h-8 w-8 bg-accent1 text-center font-bold align-middle border cursor-pointer relative inline-block"
              @click="toggleIconPicker()"
              >...
                <icon-picker
                  @iconClick="iconPickerClick($event)"
                  id="icon-picker"
                  ref="icon-picker"
                  :showMe="isShowIconPicker"
                  @onCloseClick="isShowIconPicker=false"
                />
            </span>

            <span>
              <div
                v-if="editorComponent.sidebarIcon.icon !== ''"
                class="inline-block"
              >
                <icon-image
                  :icon="iconLocal"
                  classDef="ml-2 inline-block text-2xl align-middle"
                ></icon-image>
              </div>
            </span>

          </div>
          <select-input
            label="type"
            :value="editorComponent.type"
            :selectOptions="componentType"
            @onChange="editorComponent.type=$event"
          />
          <text-input
            :value="classDef"
            label="CSS tailwind classes to define the component"
            @onChange="classDef= $event"
          />

          <div class="dimensions">
            <div class="w-16">
              <text-input
                :value="editorComponent.dimension.width"
                label="Width"
                type="number"
                @onChange="editorComponent.dimension.width= parseInt($event)"
              />
            </div>
            <div class="w-16 ml-2">
              <text-input
                :value="editorComponent.dimension.height"
                type="number"
                label="height"
                @onChange="editorComponent.dimension.height=$event"
              />
            </div>
            <div class="w-16 ml-2">
              <select-input
                :value="editorComponent.dimension.units"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.dimension.units=$event"
              />
            </div>
          </div>
          <div class="dimensions">
            <div class="w-16">
              <text-input
                  :value="editorComponent.location.left"
                  type="number"
                  label="left"
                  @onChange="editorComponent.location.left=$event"
                />
            </div>
            <div class="ml-4 w-16">
              <text-input
                  :value="editorComponent.location.top"
                  type="number"
                  label="left"
                  @onChange="editorComponent.location.top=$event"
                />
            </div>
            <div class="w-16 ml-4">
              <select-input
                :value="editorComponent.location.units"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.location.units=$event"
              />
            </div>
          </div>

          <label for="isContainer">Container:</label>
          <input
            type="checkbox"
            name="isContainer"
            id="active"
            :value="editorComponent.isContainer"
            class="mt-5 w-1/12"
            v-model="editorComponent.isContainer"
          />
          <submit-cancel
            @cancelClick="cancelClick()"
            @submitClick="saveClick()"
          ></submit-cancel>
        </form>
        <p
          class="w-full bg-gray-400 mt-2 p-2 text-accent-600 text-center font-bold"
        >
          Component Preview
        </p>

        <div class="relative bg-gray-300">
          <div class="mt-2  bg-blue-200" :class="classDef" :style="getStyles">
            Component
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import  {Vue, Options } from 'vue-class-component';
import { Notification } from '@/models/notification/notification';
import { AllActionTypes, useStore } from '@/store';
import { ASidebarElement } from '@/classes/sidebar-element/sidebar-element/aSidebar-element';
import { SnackbarMessage } from '@/classes/base/notification/snackbar/models/snackbar';
import { SnackBarGenerator } from '@/classes/base/notification/snackbar/snackbarGenerator';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar';
import { ComponentTypesArray } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import BaseButton from '@/components/base/base-button/base-button.vue';
import SubmitCancel from '@/components/base/base-button/submit-cancel/submit-cancel.vue';
import IconPicker from '@/components/pickers/icon-picker/icon-picker.vue';
import InvalidForm from '@/components/base/notifications/invalid-form/invalid-form.vue';
import IconImage from '@/components/base/icon/icon.vue';
import TextInput from '@/components/base/form-controls/text-input/text-input.vue';
import SelectInput from '@/components/base/form-controls/select/select-input.vue';
import { Units } from '@/common/types/units';



@Options({
  components: {
    'icon-picker': IconPicker,
    'invalid-form': InvalidForm,
    'base-button': BaseButton,
    'submit-cancel': SubmitCancel,
    'icon-image': IconImage,
    'text-input': TextInput,
    'select-input': SelectInput

  }
})
export default class SidebarIconEditor extends Vue {
  name = 'sidebar-Icon-Editor';
  classDef = '';
  iconLocal = 'emoji_waiting-32.png';
  editorComponent: ASidebarElement = new ASidebarElement();
  isShowIconPicker = false;
  componentType = ComponentTypesArray;
  store = useStore();
  units = ['px', '%', 'em'];

  created(): void {
    this.store.dispatch(AllActionTypes.SET_SHOW_SIDEBAR, false);
  }


  toggleIconPicker() {
    this.isShowIconPicker = !this.isShowIconPicker;
  }

  iconPickerClick(icon: string): void {
    this.iconLocal = icon;
    this.editorComponent.sidebarIcon = icon;
  }

  iconClicked(icon: string) {
    const component: ASidebarElement = this.store.getters.getSidebarAllItems.filter(
      element => element.sidebarIcon === icon
    )[0];
    this.editorComponent.componentName = component.componentName;
    this.editorComponent.componentRef = component.componentRef;
    this.editorComponent.classes = component.classes;
    this.editorComponent.isContainer = component.isContainer;
    this.editorComponent.sidebarIcon = component.sidebarIcon;
    this.editorComponent.type = component.type;
    this.editorComponent.dimension = component.dimension;
    this.editorComponent.location = component.location;
    this.iconLocal = icon;
    this.classDef = this.editorComponent.classes;
  }

  createNew(): void {
    this.editorComponent = new ASidebarElement();
  }

  saveClick(): void {
    this.editorComponent.classes = this.classDef;
    this.store.dispatch(AllActionTypes.SAVE_SIDEBAR_EDITOR_ELEMENT, this.editorComponent)
    .then(result => {
      const notification = result as Notification;
      if (notification.status === "ok") {
        const snackbarMessage: SnackbarMessage = SnackBarGenerator.snackbarSuccess(
          `The ${this.editorComponent.componentName} has been created`,
          "Page Saved"
        );
        const snackbar = SnackBar.getInstance();
        snackbar.snackbarMessage = snackbarMessage;
        snackbar.showSnackbar();
        this.$router.push("/iconeditor");
      } else {
        const snackbarMessage: SnackbarMessage = SnackBarGenerator.snackbarSuccess(
          notification.message,
          "Failed"
        );
        const snackbar = SnackBar.getInstance();
        snackbar.snackbarMessage = snackbarMessage;
        snackbar.showSnackbar();
      }
    });
  }

  get icons(): ASidebarElement[] {
    return this.store.getters.getSidebarAllItems;
  }

  get getStyles(): string {
    const styles = `${this.editorComponent.location.toStyle()} ${this.editorComponent.dimension.toStyle()}`;
    console.log('%c⧭', 'color: #1d5673', styles)
    return styles;
  }
}
</script>

<style lang="postcss" scoped>
.dimensions {
  @apply flex flex-row justify-start flex-nowrap w-full;
}

.dimensions input {
  @apply w-16;
}

.dimensions label {
  @apply w-12 ml-2 inline-block;
}
</style>
