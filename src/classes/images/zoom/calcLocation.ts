import { ADimension } from "@/classes/base/dimension/a-dimension";
import { ALocation } from "@/classes/base/location/a-location";
import { ValueAndUnit } from "@/common/types/value_and_unit/value_and_unit";
import { SimpleDimension } from "./zoom";

export type Point = { x: number, y: number };

export function calcDimensionChange(newDimension: SimpleDimension, originalDimension: ADimension): Point {
    console.log('%c⧭', 'color: #7f2200', originalDimension.width.value);
    console.log('%c⧭', 'color: #e5de73', newDimension.width );
    return {
        x: (newDimension.width - originalDimension.width.value) / 2,
        y: (newDimension.height - originalDimension.height.value) / 2,
    }
};

export function calcNewLocation(currentlocation: ALocation, deltaChange: Point): Point {
    const left = currentlocation.left.value - deltaChange.x;
    const top = currentlocation.top.value - deltaChange.y; 
    return {
        x: left,
        y: top
    };
}


