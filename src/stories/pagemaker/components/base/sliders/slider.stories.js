import Slider from '@components/base/sliders/slider.vue';
import '../../../../utils.css';
export default {
  title: "Pagemaker/slider",
  component: Slider,
  argTypes: {
    onSliderChange: {},
  }
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Slider },
  setup() {
    return { args };
  },
  template: '<div class="bg-siteLight p-2 mx-auto w-6/12" ><slider v-bind="args" @onchange="onChange" /></div>'
});

export const Default = Template.bind({});
Default.args = {
  sliderValue: 127,
};

export const MaxValue = Template.bind({});
MaxValue.args = {
  sliderValue: 255,
};

export const MinValue = Template.bind({});
MinValue.args = {
  sliderValue: 0,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  sliderValue: 127,
  caption: 'Label',
}
