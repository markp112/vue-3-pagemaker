import { RangeStyles } from '../../../commands/range-styles/range-styles';
import { RangeValue } from '../../range-values/range-values';
import { NodeUtilities } from '../../utilities/node-utilities/node-utilities';
import { SelectedContent } from './underline';
import { UnderlineBase } from './underline-base';

enum NODE_TYPES {
  UNDEFINED = -1,
  TEXT_NODE = 3,
  SPAN_NODE = 1,
};

export class DeleteUnderline  {


  nodeUtilities: NodeUtilities;
    range: Range;
  // rangeStyling: RangeStyles;
    rangeValues: RangeValue;
  // parentNodeWithUnderline: Node;
  isElementUnderlined: SelectedContent;

  // constructor(range: Range, 
  //   rangeValue: RangeValue, 
  //   nodeUtilities: NodeUtilities, 
  //   isElementUnderlined: SelectedContent
  //   ) {
  //   this.range = range;
  //   // this.rangeValues = rangeValue;
  //   this.nodeUtilities = nodeUtilities;
  //   this.isElementUnderlined = isElementUnderlined;
  //   this.parentNodeWithUnderline = new Node();
  //   this.rangeStyling = new RangeStyles();
  // }

  constructor(range: Range, rangeValues: RangeValue, nodeUtilities: NodeUtilities, isElementUnderlined: SelectedContent) {
    console.log('%c⧭', 'color: #ffa640', range);
    this.range = range;
    this.rangeValues = rangeValues;
    this.nodeUtilities = nodeUtilities;
    this.isElementUnderlined = isElementUnderlined;
    
  }

  getParentWithUnderline(): Node | null {
    let node = this.getParentNodeWithUnderline(this.range.commonAncestorContainer);
    if (!node) {
      node = this.getParentNodeWithUnderline(this.range.startContainer);
    }
    
    return node;
  }

  getParentNodeWithUnderline(node: Node | null): Node | null {
    if (!node) return null;
    if (node.nodeName === 'P') return null;
    if (node.nodeName === 'SPAN') {
      if ((node as HTMLSpanElement).innerHTML.includes('underline')) {
        return node;
      }
    }
    return this.getParentNodeWithUnderline(node.parentNode);
  }

  removeUnderline() {
    console.log('%c%s', 'color: #00bf00', 'removeUnderline');
    const isSingleNode = this.getIsSingleNode();
    // console.log('%c⧭', 'color: #733d00', isSingleNode);
    const parentNodeWithUnderline = this.getParentWithUnderline();
    if (isSingleNode) {
        // this.removeUnderlineSameNode();
        return;
    }
  }

  getIsSingleNode() {
    const startNodeContent = this.range.startContainer.textContent;
    const endNodeContent = this.range.endContainer.textContent;
    return startNodeContent === endNodeContent;
  }

  // removeUnderlineSameNode() {
  //   const textContent = this.range.startContainer.textContent ? this.range.startContainer.textContent : '';
  //   if (this.range.startOffset === textContent.length) {
  //     this.removeUnderLineClassFromSpan(this.parentNodeWithUnderline);
  //   }
  // }

  // removeUnderLineClassFromSpan(parentNodeWithUnderline: Node) {
  //   const parentElement = parentNodeWithUnderline as HTMLElement;
  //   const startNodeType = this.getNodeType(this.range.startContainer);
  //   const endNodeType = this.getNodeType(this.range.endContainer);
    
  //   // if (this.range.startOffset === 0 && this.range.endOffset === this.range.endContainer.textContent.length)
  //   if (parentElement.className.includes('textDecoration underline')) {
  //     parentElement.className.replace('underline', '');
  //   }
  // }

  // getNodeType(node: Node): NODE_TYPES {
  //   switch (node.nodeType) {
  //     case 1: 
  //       return NODE_TYPES.SPAN_NODE;
  //     case 3: 
  //       return NODE_TYPES.TEXT_NODE;
  //     default: 
  //       return NODE_TYPES.UNDEFINED;

  //   }
  // }
}



