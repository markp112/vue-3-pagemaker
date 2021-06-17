import { ALocation } from '@/classes/base/location/a-location';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';

describe("ALocation", () => {

  let aLocation: ALocation;
  const top: ValueAndUnit = { value: 10, unit: 'px' };
  const left: ValueAndUnit = { value: 20, unit: 'px' };

  it("should construct a new location with a top and left value set", () => {
    aLocation = new ALocation(top, left);
    expect(aLocation.top.value).toEqual(10);
    expect(aLocation.left.value).toEqual(20);
  });

  it("should update the properties when new values are provided", () => {
    aLocation = new ALocation(top, left);
    aLocation.top.value = 30;
    expect(aLocation.top.value).toEqual(30);
    aLocation.left.value = 5;
    expect(aLocation.left.value).toEqual(5);
    aLocation.left.unit = 'em';
    expect(aLocation.left.unit).toEqual('em');
    aLocation.top.unit = 'em';
    expect(aLocation.top.unit).toEqual('em');
  })

  it("should when toStyle is called return a css style tag containing top and left values", () => {
    left.unit ='em';
    aLocation = new ALocation(top, left);
    const style = aLocation.toStyle();
    expect(style).toContain('left:20em;');
    expect(style).toContain('top:10px;');
  })

  it("Should return an object matching Location when toStringObject is called", () => {
    left.unit ='em';
    top.unit = '%';
    aLocation = new ALocation(top, left);
    const location = aLocation.toObject();
    expect(location.left.value).toEqual(20);
    expect(location.left.unit).toEqual('em');
    expect(location.top.value).toEqual(10);
    expect(location.top.unit).toEqual('%');
  })

})
