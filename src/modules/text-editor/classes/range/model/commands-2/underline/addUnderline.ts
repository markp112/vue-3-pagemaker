import { Style } from '@/classes/base/style/style';
import { RangeStyles } from '../../../commands/range-styles/range-styles';
import { SelectedContent } from '../../../commands/underline/underline';
import { ClassOrStyle, HTMLTags } from '../../../range-base';
import { RangeValue } from '../../range-values/range-values';
import { NodeUtilities } from '../../utilities/node-utilities/node-utilities';
import { UnderlineBase } from './underline-base';

export class AddUnderline extends UnderlineBase {
  nodeUtilities: NodeUtilities;
  range: Range;
  rangeStyling = new RangeStyles();
  rangeValues: RangeValue;
  isElementUnderlined: SelectedContent;
  underline: Style = {
    style: 'text-decoration',
    value: 'underline',
  };

  constructor(range: Range, rangeValue: RangeValue, nodeUtilities: NodeUtilities, isElementUnderlined: SelectedContent) {
    super();
    this.range = range;
    this.rangeValues = rangeValue;
    this.nodeUtilities = nodeUtilities;
    this.isElementUnderlined = isElementUnderlined;
  }
  
  addUnderline(htmlTag: HTMLTags) {
    // five scenarios 
    // nothing underlined
    // start not underlined rest is underlined
    // start is underlined end is not underlined
    // start is underlined middle is not underlined end is underlined
    // start is not underlined middle is underlined end if not underlined
    if (!this.isElementUnderlined.startContent && !this.isElementUnderlined.selectedContent
      && !this.isElementUnderlined.endContent ) {
        this.rangeValues.ancestorHasChildren 
        ? this.createWrapperWithChildren(htmlTag)
        : this.createWrapperNoChildren(htmlTag);
        return;
      }
      if (!this.isElementUnderlined.startContent && this.isElementUnderlined.endContent) {
          const nodeWithUnderline = this.getParentNodeWithUnderline(this.range.endContainer)!;
          const fragment = this.range.extractContents();
          nodeWithUnderline.insertBefore(fragment, nodeWithUnderline.childNodes[0]);
          return;
      }
      if (this.isElementUnderlined.startContent) {
          const nodeWithUnderline = this.getParentNodeWithUnderline(this.range.startContainer)!;
          const fragment = this.range.extractContents();
          nodeWithUnderline.appendChild(fragment);
          return;
      }
  }

  private getTextNodeLength(node: Node): number {
    if (node.nodeName !=='#text') return -1;
    return (node as Text).length;
  }

  private createWrapperWithChildren(htmlTag: HTMLTags) {
    if (this.range.commonAncestorContainer === this.range.startContainer) {
      this.createNodeFromFragment(htmlTag)
      return;
    }
    const firstNodeLength = this.getTextNodeLength(this.range.commonAncestorContainer.childNodes[0]);
    if (this.rangeValues.start === firstNodeLength) {
      this.createNodeFromFragment(htmlTag)
      return;
    }
    const fragment = this.range.extractContents();
    this.createNewNodeAsWrapper(htmlTag, this.underline, 'class', fragment);
  }

  private applyStyles(wrapperNode: Node) {
    this.rangeStyling.clearExistingClasses(wrapperNode, this.underline);
    this.rangeStyling.setClass(wrapperNode, this.underline);
  }

  private createNodeFromFragment(htmlTag: HTMLTags) {
    const fragment = this.range.extractContents();
    const wrapperNode: Node | null = fragment ? fragment.querySelector('span') : this.nodeUtilities.createWrapperNode(htmlTag);
    if (wrapperNode) {
      this.applyStyles(wrapperNode);
      this.nodeUtilities.insertNode(this.range, wrapperNode);
    }
  }

  private createWrapperNoChildren(htmlTag: HTMLTags) {
    const fragment = this.range.extractContents();
    const wrapperNode = this.nodeUtilities.createWrapperNode(htmlTag);
    const fragmentNode = fragment as Node;
    this.applyStyles(wrapperNode);
    wrapperNode.appendChild(fragmentNode);
    this.nodeUtilities.insertNode(this.range, wrapperNode);
  }

  private createNewNodeAsWrapper(htmlTag: HTMLTags, style: Style, classOrStyle: ClassOrStyle, fragment: DocumentFragment) {
    const wrapperNode = this.nodeUtilities.createWrapperNode(htmlTag);
    const fragmentNode = fragment as Node;
    this.rangeStyling.setStyleOrClass(wrapperNode, style, classOrStyle);
    this.rangeStyling.clearExistingClasses(fragmentNode, style);
    wrapperNode.appendChild(fragmentNode);
    this.nodeUtilities.insertNode(this.range, wrapperNode);
  }

  // private getParentNodeWithUnderline(node: Node | null): Node | null {
  //   if (!node) return null;
  //   if (node.nodeName === 'P') return null;
  //   if (node.nodeName === 'SPAN') {
  //     if ((node as HTMLSpanElement).innerHTML.includes('underline')) {
  //       return node;
  //     }
  //   }
  //   return this.getParentNodeWithUnderline(node.parentNode);
  // }
}