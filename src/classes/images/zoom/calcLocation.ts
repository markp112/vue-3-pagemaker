import { ADimension } from "@/classes/base/dimension/a-dimension";
import { SimpleDimension } from "./zoom";

export type Point = { x: number, y: number };

export function calcLocation(newDimension: SimpleDimension, originalDimension: ADimension): Point {
    return {
        x: (newDimension.width - originalDimension.width.value) / 2,
        y: (newDimension.height - originalDimension.height.value) / 2,
    }
}
