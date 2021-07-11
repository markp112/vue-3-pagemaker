// import {
//   BorderInterface,
//   BorderDirections,
//   BorderStyle,
//   Style,
//   StyleTags
// } from "@/models/styles/styles";
// import { ValueAndUnit } from "@/models/components/box-dimension";
// import { Style } from "../text-attributes/text-attributes";

import { Style } from '@/classes/base/style/style';
import { StyleTags } from '@/common/types/css-element-styles/css-element-styles';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';
import { BorderInterface } from './model/border';
import { BorderDirections, BorderStyle } from './types/border-types';

export class Border implements BorderInterface {
  private static instance: Border;
  borderDirection: BorderDirections = "border";
  colour = "#000000";
  _style: BorderStyle = "solid";
  _width: ValueAndUnit = { value: 1, unit: "px" };
  borderRadius: ValueAndUnit = { value: 1, unit: "px" };
  shadow = "";

  public static getInstance(): Border {
    if (!Border.instance) {
      Border.instance = new Border();
    }
    return Border.instance;
  }

  applyStyle(style: Style): void {
    switch (style.style) {
      case "borderEdge":
        this.borderDirection = style.value as BorderDirections;
        break;
      case "borderStyle":
        this.style = style.value as BorderStyle;
        break;
      case "border-width":
        this.width = {
          value: parseInt(style.value),
          unit: style.unit ? style.unit : 'px',
        };
        break;
      case "border-radius":
        this.borderRadius.unit = style.unit ? style.unit : 'px';
        this.borderRadius.value = Number(style.value);
        break;
      case "shadow":
        this.shadow = style.value;
        break;
    }
  }

  set width(amount: ValueAndUnit) {
    if (this._width.value === 1 && amount.value === -1) {
      amount.value = -0.5;
    }
    this._width.value =
      this._width.value + amount.value < 0
        ? 0
        : this._width.value + amount.value;
    this._width.unit = amount.unit;
  }

  get width(): ValueAndUnit {
    return this._width;
  }

  set style(style: BorderStyle) {
    this._style = style;
    if (this._style === "double") {
      this._width.value = 3;
    }
  }

  get style(): BorderStyle {
    return this._style;
  }

  getStyle(): Style {
    const style = `${this.style}`;
    const width = `${this.width.value}${this.width.unit}`;
    const color = `${this.colour}`;
    const direction =
      this.borderDirection === "border"
        ? this.borderDirection
        : `border-${this.borderDirection}`;
    const border: Style = {
      style: direction as StyleTags,
      value: `${width} ${style} ${color}`
    };
    return border;
  }

  getBorderRadius = () => {
    const style: Style = {
      style: "border-radius",
      value: `${this.borderRadius.value}${this.borderRadius.unit}`
    };
    return style;
  };

  getShadow(): string {
    return this.shadow;
  }
}
