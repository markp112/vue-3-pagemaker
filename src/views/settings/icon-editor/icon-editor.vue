<template>
  <section class="h-screen overflow-hidden">
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
            <icon-image :icon="element.sidebarIcon" @iconClick="editorComponent = iconClicked(element.sidebarIcon)"/>
          </li>
        </ul>
      </div>
      <div class="ml-5 mt-5 w-9/12">
        <form submit.prevent>
          <div class="dimensions">
            <text-input
              :initialValue="editorComponent.componentName"
              width="w-64"
              label="Name of the editor component"
              @onChange="editorComponent.componentName=$event"
            />
          </div>
          <text-input
            :initialValue="editorComponent.componentRef"
            width="w-64"
            label="HtmlTag for component"
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
                  class="z-50"
                  id="icon-picker"
                  ref="icon-picker"
                  :showMe="isShowIconPicker"
                  @onCloseClick="isShowIconPicker=false"
                />
            </span>
            <div>
              <div
                v-if="editorComponent.sidebarIcon.icon !== ''"
                class="inline-block"
              >
                <icon-image
                  :icon="iconLocal"
                  classDef="ml-2 inline-block text-2xl align-middle"
                ></icon-image>
              </div>
            </div>

          </div>
          <select-input
            label="type"
            width="w-12"
            :initialValue="editorComponent.type"
            :selectOptions="componentType"
            @onChange="editorComponent.type=$event"
          />
          <text-input
            :initialValue="classDef"
            label="CSS tailwind classes to define the component"
            @onChange="updateClassdef($event)"
          ></text-input>
          <div class="dimensions">
            <div class="w-16">
              <text-input
                :initialValue="editorComponent.dimension.width.value"
                label="Width"
                type="number"
                @onChange="editorComponent.dimension.width.value=$event"
              />
            </div>
            <div class="w-16 ml-2">
              <select-input
                :initialValue="editorComponent.dimension.width.unit"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.dimension.width.unit=$event"
              />
            </div>
            <div class="w-16 ml-2">
              <text-input
                :initialValue="editorComponent.dimension.height.value"
                type="number"
                label="height"
                @onChange="editorComponent.dimension.height.value=$event"
              />
            </div>
            <div class="w-16 ml-2">
              <select-input
                :initialValue="editorComponent.dimension.height.unit"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.dimension.height.unit=$event"
              />
            </div>
          </div>
          <div class="dimensions">
            <div class="w-16">
              <text-input
                  :initialValue="editorComponent.location.left.value"
                  type="number"
                  label="left"
                  @onChange="editorComponent.location.left.value=$event"
                />
            </div>
            <div class="w-16 ml-4">
              <select-input
                :initialValue="editorComponent.location.left.unit"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.location.left.unit=$event"
              />
            </div>
            <div class="ml-4 w-16">
              <text-input
                  :initialValue="editorComponent.location.top.value"
                  type="number"
                  label="left"
                  @onChange="editorComponent.location.top.value=$event"
                />
            </div>
            <div class="w-16 ml-4">
              <select-input
                :initialValue="editorComponent.location.top.unit"
                label="Units"
                :selectOptions="units"
                @onChange="editorComponent.location.top.unit=$event"
              />
            </div>
          </div>
          <div class="w-48 mb-4">
            <label for="isContainer">Container:</label>
            <input
              type="checkbox"
              name="isContainer"
              id="active"
              :initialValue="editorComponent.isContainer"
              class="w-32"
              v-model="editorComponent.isContainer"
            />
          </div>
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

        <div class="relative bg-gray-300 font">
          <span class="mt-2  inline-block" :class="classDef" :style="getStyles">
            Component
          </span>
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
import { ComponentTypesArray } from '@/classes/sidebar-element/sidebar-element/model/sidebar-element';
import BaseButton from '@/components/base/base-button/base-button.vue';
import SubmitCancel from '@/components/base/base-button/submit-cancel/submit-cancel.vue';
import IconPicker from '@/components/pickers/icon-picker/icon-picker.vue';
import InvalidForm from '@/components/base/notifications/invalid-form/invalid-form.vue';
import IconImage from '@/components/base/icon/icon.vue';
import TextInput from '@/components/base/form-controls/text-input/text-input.vue';
import SelectInput from '@/components/base/form-controls/select/select-input.vue';
import { reactive } from '@vue/reactivity';
import { showTheSnackbar } from '@/common/show-snackbar/show-snackbar';

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
  width =0;

  created(): void {
    this.store.dispatch(AllActionTypes.SET_SHOW_SIDEBAR, false);
    reactive(this.editorComponent);
  }

  toggleIconPicker() {
    this.isShowIconPicker = !this.isShowIconPicker;
  }

  iconPickerClick(icon: string): void {
    this.iconLocal = icon;
    this.editorComponent.sidebarIcon = icon;
  }

  iconClicked(icon: string): ASidebarElement {
    const component: ASidebarElement = this.store.getters.getSidebarAllItems.filter(
      element => element.sidebarIcon === icon
    )[0];
    this.editorComponent = component;
    this.iconLocal = component.sidebarIcon;
    this.classDef = this.editorComponent.classes;
    this.width = component.dimension.width.value;
    return component;
  }

  updateClassdef(classes: string) {
    this.classDef = classes;
  }

  createNew(): void {
    this.editorComponent = new ASidebarElement();
    this.editorComponent.dimension.width.value = 10;
  }

  saveClick(): void {
    this.editorComponent.classes = this.classDef;
    this.store.dispatch(AllActionTypes.SAVE_SIDEBAR_EDITOR_ELEMENT, this.editorComponent)
    .then(result => {
      const notification = result as Notification;
      if (notification.status === "ok") {
        showTheSnackbar('page saved',`The ${this.editorComponent.componentName} has been created`, 'success');
        this.$router.push("/iconeditor");
      } else {
        showTheSnackbar('Error',notification.message, 'error');
      }
    });
  }

  get icons(): ASidebarElement[] {
    return this.store.getters.getSidebarAllItems;
  }

  get getStyles(): string {
    const styles = `${this.editorComponent.location.toStyle()} ${this.editorComponent.dimension.toStyle()}`;
    return styles;
  }

  get classDefinitions(): string {
    return this.classDef;
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
