import { HTMLTags } from "../../range-base";
import { RangeValuesInterface } from "../range-command";

type KeyValueString = {
  [key: string]: HTMLTags;
};

export class RangeValue implements RangeValuesInterface {
  start: number;
  end: number;
  selectedContent: string;
  startContent: string;
  endContent: string;
  selectionLength: number;
  ancestorNodeType: HTMLTags;
  ancestorHasChildren: boolean;
  firstChild: HTMLTags;
  startContainerNodeType: HTMLTags;
  endContainerNodeType: HTMLTags;
  ancestorContainsSpan: boolean;
  selectionSpansRows: boolean;
  startContainerParent: Node | null;
  endContainerParent: Node | null;

  constructor(range: Range) {
    this.start = range.startOffset,
    this.end = range.endOffset;
    this.startContent = '';
    this.endContent = '';
    this.selectedContent = '';
    this.ancestorHasChildren = (range.commonAncestorContainer as HTMLElement).hasChildNodes();
    this.ancestorNodeType = this.getNodeType(range.commonAncestorContainer);
    this.startContainerNodeType = this.getNodeType(range.startContainer);
    this.startContainerParent = range.startContainer.parentNode;
    this.endContainerNodeType = this.getNodeType(range.endContainer);
    this.endContainerParent = range.endContainer.parentNode;
    this.firstChild = 'undefined';
    this.ancestorContainsSpan = false;
    this.selectionLength = -1;
    this.selectionSpansRows = false;
  };

  public getNodeType(node: Node): HTMLTags {
    const nodeName = node.nodeName;
    const nodeMap: KeyValueString = {
      '#text': 'text',
      'SPAN': 'span',
      'P': 'p',
      'DIV': 'div',
    };
    const value: HTMLTags = nodeMap[nodeName];
    return value === undefined ? 'undefined' : value;
  }
}