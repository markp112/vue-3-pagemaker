import { ADimension } from '@/classes/base/dimension/a-dimension';
import { Dimension } from '@/classes/base/dimension/model/dimension';

describe('ADim1ension', () => {

  let adimension: ADimension;

  it('should construct a dimension class with a default height, width and units', () => {
    adimension = new ADimension();
    expect(adimension.height).toEqual(0);
    expect(adimension.width).toEqual(0);
    expect(adimension.units).toEqual('px');
  })

  it('should construct a dimension with prescribed values when these are passed via the constructor', () => {
    adimension = new ADimension(10,20, 'em');
    expect(adimension.height).toEqual(10);
    expect(adimension.width).toEqual(20);
    expect(adimension.units).toEqual('em');
  })

  it('should return the height and width with units as a css style when toStyle is called', () => {
    const style=`height:10em;width:20em;`
    adimension = new ADimension(10, 20, 'em');
    expect(adimension.toStyle()).toEqual(style);
  })

  it('should return the height and width with units as the model when toObject is called', () => {
    const object: Dimension = {
      height: 10,
      width: 20,
      units: 'em',
    };
    adimension = new ADimension(10, 20, 'em');
    expect(adimension.toObject()).toEqual(object);
  })

})
