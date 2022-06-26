import { Style } from "@/classes/base/style/style";
import { RangeStyles } from "../../../commands/range-styles/range-styles";
import { HTMLTags } from "../../../range-base";
import { RangeAction } from "../../range-command";
import { RangeValue } from "../../range-values/range-values";
import { NodeUtilities } from "../../utilities/node-utilities/node-utilities";
import { AddUnderline } from "./addUnderline";
import { DeleteUnderline } from "./delete-underline";
import { RemoveUnderline } from "./removeUnderline";

export interface SelectedContent {
  startContent: boolean,
  selectedContent: boolean,
  endContent: boolean,
};

const INCLUDES_UNDERLINE = `class=\\"text-decoration underline\\"`;

export class Underline implements RangeAction {

  range: Range;
  rangeValues: RangeValue;
  isElementUnderlined: SelectedContent = {
    startContent: false,
    selectedContent: false,
    endContent: false,
  };
  
  constructor(range: Range, rangeValue: RangeValue) {
    this.range = range;
    this.rangeValues = rangeValue;
  };

  process(htmlTag: HTMLTags) {
    this.isElementUnderlined = this.getNodesInSelectionUnderlineStatus();
    const hasUnderline = this.isElementUnderlined.startContent && this.isElementUnderlined.endContent;
    const nodeUtilities = new NodeUtilities();
    if (hasUnderline) {
      // this.removeUnderline();
      // const removeUnderline = new DeleteUnderline(this.range, this.rangeValues, nodeUtilities, this.isElementUnderlined);
      const removeUnderline = new DeleteUnderline(this.range, this.rangeValues, nodeUtilities, this.isElementUnderlined);
      removeUnderline.removeUnderline();
    } else {
      const addUnderline = new AddUnderline(this.range, this.rangeValues, nodeUtilities, this.isElementUnderlined);
      addUnderline.addUnderline(htmlTag);
    }
  }

  private getNodesInSelectionUnderlineStatus(): SelectedContent {
    const selectedContent: SelectedContent = {
      startContent: this.isParentUnderlined(this.range.startContainer),
      endContent: this.isParentUnderlined(this.range.endContainer),
      selectedContent: this.isParentUnderlined(this.range.commonAncestorContainer),
    };
    return selectedContent;
  }

  public isParentUnderlined(node: Node | null): boolean {
    if (!node) return false;
    switch (node.nodeName) {
      case 'P':
        return (node as HTMLElement).innerHTML.includes(INCLUDES_UNDERLINE);
      case 'SPAN':
        return this.hasClassUnderline(node) || this.isParentUnderlined(node.parentNode);
      case '#text':
        return this.isParentUnderlined(node.parentNode);
      default:
        return false;
    }
  }  
  
  public hasClassUnderline(node: Node): boolean {
    const spanElement = node as HTMLSpanElement;
    const className = spanElement.className;
    return className ? className.includes('underline') : false;
  }

  
}