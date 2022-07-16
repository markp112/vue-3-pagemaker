<template>
  <div class="w-full h-32 border border-gray-100 z-50 shadow-lg m-0">
    <div class="w-full h-12 flex flex-row justify-between" ref="text-editor-toolbar">
      <div class="sidebar-button-panel">
        <span
          @click="reset"
          class="bg-gray-500 cursor-pointer hover:text-red-600"
        >
          Reset
        </span>
        <font-select @onChange="onChange"></font-select>
        <drop-down 
          class="ml-1"
          :thisIconButton="fontSizeButton"
          @onSelectChange="onFontSizeChange"
        >
          px
        </drop-down>
        <icon-select
          :buttonIconClassList="fontWeightButton"
          @selectChange="onFontWeightChange"
        >
        </icon-select>
        <icon-toggle-button :thisIconButton="italicButton" @onChange="onItalicClick($event)" />
        <icon-toggle-button :thisIconButton="underLineButton" @onChange="onUnderlineClick" ></icon-toggle-button>
        <indent-outdent
          @onIndentClick="onIndentClick"
          @onOutdentClick="onOutdentClick">
        </indent-outdent>
        <text-alignment @alignClick="textAlignClick"></text-alignment>
        <colour-select @onColourChange="onColourChange" flexAlignment="horizontal" :showLabels="false"></colour-select>
      </div>
      <div>
        <close-button @onClick="onCloseClick()"></close-button>
      </div>
    </div>
    <div
      id="texteditorcontent"
      ref="texteditorcontent"
      class="bg-white h-full p-1"
      contenteditable="plaintext-only"
      @mouseup="getSelection()"
      @keydown="onKeyDown()"
      >
    </div>
    
  </div>
</template>

<script lang="ts">
/**
 * @description Primary text editor
 */

import { Vue, Options } from 'vue-class-component';
import ParagraphComponent from './components/paragraph/paragraph.vue';
import IconSelect from '@/components/pickers/icon-select/icon-select.vue';
import FontSelect from '@/components/pickers/font-picker/font-picker.vue';
import DropDown from '@/components/pickers/drop-down/drop-down.vue';

import { Paragraph } from './classes/range/commands/newline/newline';
import { AlignText } from '@/modules/text-editor/classes/range/commands/align-text/align-text';
import { RH } from '@/modules/text-editor/classes/range/rh';
import { Indents } from '@/modules/text-editor/classes/range/range-base';
// import { TextModule } from '@/store/text-editor/text-editor';
import { Style } from '@/classes/base/style/style';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { ButtonFactory } from '@/classes/buttons/sidebar-panel/factory';
import { pageActionTypes } from '@/store/modules/page';
import { useStore } from '@/store';
import { sidebarActionTypes } from '@/store/modules/sidebar';
import TextAlignment from './editor-buttons/justify/justify.vue';
import IndentOutdent from './editor-buttons/indent/indent.vue';
import CloseButton from '@/components/base/base-button/close-button/close-button.vue';
import ColourSelect from '@/components/pickers/colour-picker/colour-selector/colour-selector.vue';
import IconToggleButton from '@/components/base/icon-buttons/icon-toggle/icon-toggle-button.vue';
import { ButtonIconClassList } from '@/classes/buttons/sidebar-panel/button-types/button-icon-class-list/button-icon-class-list';
import { fontWeightIconList } from '@/components/core/sidebar/panel-buttons/data';
import { ButtonIconClassInterface } from '@/classes/buttons/sidebar-panel/button-types/model';
import { ButtonIconNumeric } from '@/classes/buttons/sidebar-panel/button-types/button-icon-numeric/button-icon-numeric';
import { TextAttributes } from '@/classes/sidebar/text-attributes/text-attributes';
import { TextElement } from '@/classes/page-elements/text-element/text-element';
import { textEditorActionTypes } from '@/store/modules/text-editor';
import { Paragraphs } from './classes/paragraphs/paragraphs';
import { RangeFactory } from './classes/range/model/factory/factory';

@Options({
  components: {
    'close-button': CloseButton,
    'colour-select': ColourSelect,
    'indent-outdent': IndentOutdent,
    'text-alignment': TextAlignment,
    'icon-select': IconSelect,
    'font-select': FontSelect,
    'icon-toggle-button': IconToggleButton,
    'drop-down': DropDown,
    'paragraph-component': ParagraphComponent,
  },
})
export default class TextEditor extends Vue {
  name = 'text-editor';
  content = '';
  range: Range = new Range();
  rangeClone: Range = new Range();
  isFontItalic = false;
  isFontUnderlined = false;
  fontWeightIconList = fontWeightIconList;
  fontWeightButton: ButtonIconClassList = new ButtonFactory().createButton('class-list', 'font-weight') as ButtonIconClassList;
  italicButton: ButtonIconClassInterface = new ButtonFactory().createButton('class', 'italic-button') as ButtonIconClassInterface;
  underLineButton: ButtonIconClassInterface = new ButtonFactory().createButton('class', 'underline-button') as ButtonIconClassInterface;
  fontSizeButton: ButtonIconNumeric = new ButtonFactory().createButton('numeric', 'font-size') as ButtonIconNumeric;
  store = useStore();
  paragraphs = new Paragraphs('');

  mounted() {
    const editedComponent = this.store.getters.editedComponent;
    if (editedComponent) {
      this.content = editedComponent.content;
      this.paragraphs = new Paragraphs(this.content);
    }
    this.reset();
  }

  onCloseClick(): void {
    const textEditor: HTMLParagraphElement = this.$refs.texteditorcontent as HTMLParagraphElement;
    this.store.dispatch(pageActionTypes.UPDATE_CONTENT, textEditor.innerHTML);
    this.store.dispatch(sidebarActionTypes.SHOW_TEXT_MODAL, false);
    this.$router.push('/pageBuilder');
  }

  reset() {
    const textEditor = this.$refs.texteditorcontent as HTMLDivElement;
    if (textEditor) {
      if (textEditor.hasChildNodes()) {
        textEditor.childNodes.forEach(node => node.remove());
      }
      textEditor.innerHTML = this.paragraphs.getParagraphsAsString();
    }
  }

  mouseOut(event: MouseEvent) {
    event.stopPropagation();
    this.getSelection();
  }

  onKeyDown(key: KeyboardEvent) {
    key.stopPropagation();
    if (key.code === 'Enter') {
      key.preventDefault();
      this.getSelection();
      const paragraph = new Paragraph(this.range);
      paragraph.newLine();
      return;
    }
    if ( key.code === 'ArrowLeft' 
      || key.code === 'ArrowRight'
      || key.code === 'ArrowUp'
      || key.code === 'ArrowDown'
      || key.code === 'End'
      || key.code === 'Home'
      ) { 
        this.getSelection();
      }
  }

  saveCurrentRange() {
    const selection: Selection | null = window.getSelection
      ? window.getSelection()
      : document.getSelection();
    const content: HTMLParagraphElement = this.getContentRef();
    if (!selection || !content) {
      return;
    }
    for (let i = 0; i < selection.rangeCount; i++) {
      const range = selection.getRangeAt(0);
      console.log('%c⧭', 'color: #cc0088', range)
      let start: Node | null = range.startContainer;
      let end: Node | null = range.endContainer;
      // for IE11 : node.contains(textNode) always return false
      start = start.nodeType === Node.TEXT_NODE ? start.parentNode : start;
      end = end.nodeType === Node.TEXT_NODE ? end.parentNode : end;
      if (content.contains(start) && content.contains(end)) {
        this.range = range;
        break;
      }
    } 
  }

  restoreSelection(range: Range) {
    const selection: Selection | null = window.getSelection 
      ? window.getSelection() : document.getSelection();
    if (!selection) return;
    // this.range = this.rangeClone;
    // selection.removeAllRanges();
    selection.addRange(this.rangeClone);
  }

  getSelection() {
    this.saveCurrentRange();
  }

  getContentRef(): HTMLParagraphElement {
    return this.$refs.texteditorcontent as HTMLParagraphElement;
  }

  setStyle(styleName: StyleTags, value: string, classOrStyle: 'class' | 'style'): void {
      const style: Style = { style: styleName, value: value };
      this.rangeClone = this.range.cloneRange();
      const rh = new RH(this.range);
      console.log('%c⧭', 'color: #cc7033', this.range)
      rh.applyStyle('span', style, classOrStyle);
      this.restoreSelection(this.rangeClone);
  }

  onChange(fontFamilyStyle: Style): void {
    const styleName = fontFamilyStyle.style as StyleTags;
    this.setStyle(styleName, fontFamilyStyle.value, 'style');
  }

  onFontWeightChange(iconElement:  Style): void {
    this.setStyle('font-weight', iconElement.value, 'class');
  }

  onItalicClick(style: Style): void {
    console.log('%c⧭', 'color: #ffa280', style)
    this.setStyle('font-style', style.value, 'class');
  }

  onUnderlineClick(style: Style): void {
    console.log('%c⧭', 'color: #e5de73', style)
    // this.setStyle('text-decoration', style.value, 'class');
    this.rangeClone = this.range.cloneRange();
    const factory = new RangeFactory(this.rangeClone, 'underline');
    factory.process('span');

  }

  onFontSizeChange(style: Style): void {
    const styleName = style.style as StyleTags;
    this.setStyle(styleName, `${style.value}px`, 'style');
  }

  onColourChange(rgbColour: string) {
    this.setStyle('color', rgbColour, 'style');
  }

  onIndentClick() {
    const indent = new Indents(this.range);
    indent.createIndent();
  }

  onOutdentClick() {
    const indent = new Indents(this.range);
    indent.removeIndent();
  }

  textAlignClick(style: string) {
    const align: AlignText = new AlignText();
    const textEditor = this.$refs.texteditorcontent as HTMLDivElement;
    align.alignText(style, textEditor);
  }

  get getClasses(): string {
    const componentClassSpec = this.store.getters.editedComponent as TextElement;
    return componentClassSpec.classDefinition;  
  }

  get textContent(): string {
    return this.content;
  }

  get show(): boolean {
    return this.store.getters.showTextModal;
  }
}
</script>

<style lang="postcss" scoped>

  .text-editor {
    margin-block-start: 0.5em;
    background-color: bisque;
    height: 24px;
    @apply z-50;
 }
</style>
