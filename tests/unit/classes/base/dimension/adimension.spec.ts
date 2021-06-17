import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Dimension } from '@/classes/base/dimension/model/dimension';
import { ValueAndUnit } from '@/common/types/value_and_unit/value_and_unit';

describe('ADim1ension', () => {

  let adimension: ADimension;

  const width: ValueAndUnit = { value: 100, unit: 'px' };
  const height: ValueAndUnit = { value: 200, unit: 'px' };

  it('should construct a dimension class with a default height, width and units', () => {
    adimension = new ADimension();
    expect(adimension.height.value).toEqual(0);
    expect(adimension.width.value).toEqual(0);
    expect(adimension.height.unit).toEqual('px');
    expect(adimension.width.unit).toEqual('px');
  })

  it('should construct a dimension with prescribed values when these are passed via the constructor', () => {
    adimension = new ADimension(height, width);
    expect(adimension.height).toEqual(height);
    expect(adimension.width).toEqual(width);
  })

  it('should return the height and width with units as a css style when toStyle is called', () => {
    const style=`height:200px;width:100px;`
    adimension = new ADimension(height, width);
    expect(adimension.toStyle()).toEqual(style);
  })

  it('should return the height and width with units as the model when toObject is called', () => {
    const object: Dimension = {
      height: { value: 200, unit: 'px' },
      width: {value: 100, unit: 'em' },
    };
    width.unit = 'em';
    adimension = new ADimension(height, width);
    expect(adimension.toObject()).toEqual(object);
  })

})
