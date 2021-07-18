import { shallowMount, mount } from '@vue/test-utils';
import ToolTip from '@/components/base/notifications/tooltip/tooltip.vue';

type PropsData = {
  showToolTip: boolean,
  tooltip: string,
};

const createTooltip = (propsData: PropsData) => mount(ToolTip, { props: propsData });

describe('tooltip', () => {
  const props: PropsData = {
    showToolTip: false,
    tooltip: '',
  }

  it('should have a showToolTip prop set to false and showToolTip should be false', () => {
    props.showToolTip = false;
    const wrapper = createTooltip(props);
    expect(wrapper).toBeTruthy();
    expect(wrapper.props().showToolTip).toBe(false);
  });

  it('should have a showToolTip prop set to true when showTooltip is true', () => {
    props.showToolTip = true;
    const wrapper = createTooltip(props);
    expect(wrapper).toBeTruthy();
    expect(wrapper.props().showToolTip).toBe(true);
  });

  it('should render a tooltip with a message when showTooltip is true', () => {
    props.showToolTip = true;
    props.tooltip = 'tooltip message';
    const wrapper = createTooltip(props);
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe('tooltip message');
  });

  it('should not render a message when showTooltip is false', () => {
    props.showToolTip = false;
    props.tooltip = 'tooltip message';
    const wrapper = createTooltip(props);
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe('');
  });


})
