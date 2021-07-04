import Accordian from '@/components/core/sidebar/accordian/accordian.vue';


export default {
  title: 'Pagemaker/accordian',
  component: Accordian,
  argTypes: {
  },
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Accordian },
  setup() {
    return { args };
  },
  template: `
        <accordian v-bind="args">I am content in the accordian, I will be shown hidden based on the selector</accordian> `,
});

export const Default = Template.bind({});
Default.args = {
  accordianTitle: 'Accordian control'
}
