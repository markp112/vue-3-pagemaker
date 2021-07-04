import IconPicker from '@/components/pickers/icon-picker/icon-picker.vue';


export default {
  title: 'Components/pickers/Icon Picker',
  component: IconPicker,
  argTypes: {
    iconClick: {}
  },
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { IconPicker },
  setup() {
    return { args };
  },
  template: `
        <icon-picker v-bind="args" /> `,
});

export const Default = Template.bind({});
Default.args = {
  showMe: true
}
