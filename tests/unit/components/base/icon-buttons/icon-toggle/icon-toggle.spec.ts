import { DOMWrapper, mount } from '@vue/test-utils';
import IconToggleButton from '@/components/base/icon-buttons/icon-toggle/icon-toggle-button.vue'; 
import { ImpactedAttributeTypes } from '@/classes/sidebar/button-event-manager/button-event-manager';
import { IconType, ComponentNames } from '@/classes/buttons/sidebar-panel/button-types/types';
import { Style } from '@/classes/base/style/style';
import { CssStyleTypes } from '@/common/types/css-element-styles/css-element-styles';
import { ButtonIconClassInterface } from '@/classes/buttons/sidebar-panel/button-types/model';

type PropsData = {
  styledElement: ImpactedAttributeTypes;
  iconImage: string;
  tooltip: string;
  iconIsTypeOf: IconType;
  componentName: ComponentNames;
  classNameActive:  CssStyleTypes;
  classNameInActive:  CssStyleTypes;
  onChange: (style: Style) => void
};

const iconButton: ButtonIconClassInterface = {
  styledElement: 'text',
  iconImage: '',
  tooltip: 'italic',
  iconIsTypeOf: 'class',
  componentName: 'icon-toggle-button',
  classNameActive: 'italic',
  classNameInActive: 'not-italic',
};

const createIconToggleButton = (propsData: ButtonIconClassInterface) => mount(IconToggleButton, { props: propsData });
describe('IconToggleButton', () => {

  it('should render an image with src of propsData.iconImage', async () => {
    const toggleButton = createIconToggleButton(iconButton);
    expect(toggleButton).toBeDefined();
    const image = await toggleButton.find('img') as DOMWrapper<HTMLImageElement>;
    expect(image).toBeDefined();
  });

  it('should emit an event when the image is clicked containing the classNameActive', async () => {
    const clickHandler = jest.fn();
    const style: Style = {
      style: iconButton.classNameActive,
      value: iconButton.classNameActive,
      unit: 'px'
    };
    const toggleButton = createIconToggleButton(iconButton);
    await toggleButton.setProps({ thisIconButton: iconButton });
    toggleButton.vm.emitOnChange = clickHandler;
    expect(toggleButton).toBeDefined();
    const image = await toggleButton.find('img') as DOMWrapper<HTMLImageElement>;
    await image.trigger('click');
    expect(clickHandler).toHaveBeenCalled();
    expect(clickHandler).toHaveBeenCalledWith(style);
  });

  
})