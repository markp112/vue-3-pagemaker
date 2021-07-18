import { DOMWrapper, mount } from '@vue/test-utils';
import IconImage from '@/components/base/icon/icon.vue';
import Tooltip from '@/components/base/notifications/tooltip/tooltip.vue';
import Vue from 'vue';

type PropsData = {
  icon: string,
  classdef: string,
  id: string,
  tooltip: string,
  iconClick: () => void,
};

const createIcon = (propsData: PropsData) => mount(IconImage, { props: propsData });
  const props: PropsData = {
    icon: 'elephant.png',
    classdef: '',
    id: '123',
    tooltip: 'a tip',
    iconClick: () => {},
  }
describe('IconImage', () => {
  it('Should render an image element', () => {
    const icon = createIcon(props);
    expect(icon).toBeDefined();
    const image = icon.find('img');
    expect(image).toBeDefined();
  });

  it('Should render a tooltip component', () => {
    const icon = createIcon(props);
    expect(icon).toBeDefined();
    const tooltip = icon.findComponent(Tooltip);
    expect(tooltip.exists()).toBe(true);
  });

  it('should display the image passed in by the prop', async () => {
    const icon = createIcon(props);
    expect(icon).toBeDefined();
    const image = await (icon.find('img')) as DOMWrapper<HTMLImageElement>;
    await icon.setProps({icon: props.icon});
    expect(icon.props().icon).toBe(props.icon);
  });

  it('should emit an event when the image icon is clicked', async () => {
    const clickHandler = jest.fn();
    props.iconClick = clickHandler();
    const icon = createIcon(props);
    expect(icon).toBeDefined();
    const image = await (icon.find('img')) as DOMWrapper<HTMLImageElement>;
    await image.trigger('click');
    expect(clickHandler).toBeCalled();
    await image.trigger('click');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  })

})
