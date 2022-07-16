import { HTMLTags } from "../range-base";
import { RangeValue } from "./range-values/range-values";

export type CommandType = 
  | 'underline'
  | 'remove-underline';

export interface RangeBase {
  range: Range;
}

export interface RangeProcess {
  process(htmlTag: HTMLTags): void;
}

export interface RangeCommand extends RangeBase, RangeProcess {
  command: CommandType;
};

export interface RangeAction extends RangeBase, RangeProcess {
  rangeValues: RangeValue;
}

export interface RangeValuesInterface {
  start: number;
  end: number;
  selectedContent: string;
  startContent: string,
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
};