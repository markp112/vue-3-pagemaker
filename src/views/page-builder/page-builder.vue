<template>
  <section class="h-full">
    <h2 class="page-heading">Editing: {{ title }} Page</h2>
    <div
      :id="id"
      class="relative p-4 w-full h-full border page-background"
      ref="ROOT"
      @dragover.prevent
      @drop.prevent="onDrop($event)"
    >
      <component
        v-for="(component, i) in layoutElements"
        :is="component.componentHTMLTag"
        :key="i"
        :index="i"
        :thisComponent="component"
        z-index="0"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
      </component>
      <edit-delete-option @deleteClicked="deleteClicked()"></edit-delete-option>
      <!-- <transition>
        <text-editor
          class="absolute bg-gray-200 w-full top-0 left-0 h-full"
          v-if="showTextModal"
          :content="editedComponentText"
        >
        </text-editor>
      </transition> -->
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { AllActionTypes, useStore } from '@/store';
import { ComponentCounter } from "@/classes/base/component-counter/component-counter";
// import TextEditor from "@/components/base/text/text-editor/text-editor.vue";
import { PageElementClasses, PageElementFactory } from '@/classes/page-elements/factory/page-elements-factory';
import { PageContainer } from '@/classes/page-elements/page-container/page-container';
import { FirebaseDataBuilder } from '@/classes/page-elements/firebase/builder/firebase-data-builder';
import { pageActionTypes } from '@/store/modules/page';
import Container from './partials/container/container.vue';
import EditDeleteOption from '@/components/base/edit-delete-option/edit-delete-option.vue';

const PARENT = "ROOT";

@Options({
  props: {
    id: { default: "" }
  },
  components: {
    "edit-delete-option": EditDeleteOption,
    // "text-editor": TextEditor,
    container: Container
  }
})
export default class PageBuilder extends Vue {
  name = "page-builder";
  title: string | string[] = '';
  bgColour = "bg-gray-200";
  showModal = false;
  store = useStore();

  private componentCounter: ComponentCounter = ComponentCounter.getInstance();
  private componentFactory: PageElementFactory = new PageElementFactory();
  private rootComponent: PageContainer = this.componentFactory.createElement(
    "rootContainer",
    PARENT
  ) as PageContainer;

  created() {
    this.title = this.$route.params.title as string;
    this.store.dispatch(AllActionTypes.SET_SHOW_SIDEBAR, true);
    this.store.dispatch(AllActionTypes.UPDATE_PAGE_ID, this.title);
    this.store.dispatch(AllActionTypes.CLEAR_PAGE_ELEMENTS, true);
    this.store.dispatch(AllActionTypes.SHOW_SIDEBAR_ACTIVE_MENU, 'sidebar-components');
    const firebase = new FirebaseDataBuilder();
    firebase.retrievePageDataFromFirestore(this.title);
  }

  mounted() {
    const mainPageDiv = this.$refs.ROOT as HTMLDivElement;
    this.rootComponent.dimension.width.value = mainPageDiv.clientWidth;
    this.rootComponent.dimension.height.value = mainPageDiv.clientHeight;
    this.rootComponent.location.top.value = mainPageDiv.clientTop;
    this.rootComponent.location.left.value = mainPageDiv.clientLeft;
  }

  getStyleDimension(style: string): number {
    if (style === "") {
      return 0;
    }
    return parseInt(style.substring(0, style.length - 2));
  }

  get layoutElements(): PageElementClasses[] {
      return this.store.getters.getPageElements;
  }

  // get showTextModal(): boolean {
  //   return this.$store.getters.showTextModal;
  // }

  get editedComponentText(): string {
    const content = this.store.getters.editedComponent!.content;
    return content ? content : '';
  }

  onDrop(event: DragEvent): void {
    if (this.store.getters.isDragDropEventHandled) {
      return;
    }
    if (event) {
      const componentName = this.getComponentName(event);
      console.log('%c⧭', 'color: #7f7700', componentName)
      const component = this.store.getters.getSidebarAllItems.filter(
        element => element.componentName === componentName)[0];
      const id = this.componentCounter.getNextCounter();
      const ref = `${componentName}::${id}`;
      if (component) {
        const pageElement = this.componentFactory.createElement(
          component.type,
          ref,
          component,
          this.rootComponent
        );
        this.store.dispatch(AllActionTypes.ADD_A_PAGE_ELEMENT, pageElement);
      }
    }
  }

  getComponentName(event: DragEvent): string {
    const dataTransfer = event.dataTransfer;
    return dataTransfer ? dataTransfer.getData("text") : "";
  }

  deleteClicked(): void {
    console.log('%c%s', 'color: #ff0000', 'deleteClicked')
    this.store.dispatch(pageActionTypes.DELETE_A_PAGE_ELEMENT, true);
  }

  getClass(): string {
    return this.bgColour;
  }

}
</script>

<style>
.page-background {
  background-image: url('../../assets/images/backgrounds/white-tissue-paper.jpg');
  background-position: top left;
}
</style>
