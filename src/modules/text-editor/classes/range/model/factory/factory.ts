import { HTMLTags } from "../../range-base";
import { Underline } from "../commands-2/underline/underline";
import { CommandType, RangeCommand, RangeValuesInterface } from "../range-command";
import { RangeValue } from "../range-values/range-values";

export class RangeFactory implements RangeCommand {
  range: Range;
  command: CommandType;

  constructor(range: Range, command: CommandType) {
    this.range = range;
    this.command = command;
  }

  process(htmlTag: HTMLTags): void {
    const rangeValues: RangeValue = new RangeValue(this.range);
    switch (this.command) {
      case 'underline': {
        const underline = new Underline(this.range, rangeValues);
        underline.process(htmlTag);
      }
    }
  }
  
}