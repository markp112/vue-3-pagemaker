import { Colour } from '@/classes/base/colours/component-colour/component-colour'
import { Style } from '@/classes/base/style/style';

describe('Colour', () => {

  let colour: Colour;

  it('should have a default colour when first called', () => {
    colour = Colour.getInstance();
    expect(colour.rgbColour).toEqual('#ffeedd');
  });

  it('should have a default have the backgroundBorderForeground set to color when first called', () => {
    colour = Colour.getInstance();
    expect(colour.backgroundBorderForeground).toEqual('color');
  });

  it('should when applyStyle is called with a style set the backgroundBorderForeground to be the style.style', () => {
    colour = Colour.getInstance();
    const style: Style = {
      style: 'background-color',
      value: '#ffccee',
    };
    colour.applyStyle(style);
    expect(colour.backgroundBorderForeground).toEqual(style.style);
  });

  it('should when applyStyle is called with a style set the rgbColour to be the style.value', () => {
    colour = Colour.getInstance();
    const style: Style = {
      style: 'background-color',
      value: '#ffccee',
    };
    colour.applyStyle(style);
    expect(colour.rgbColour).toEqual(style.value);
  });

})
