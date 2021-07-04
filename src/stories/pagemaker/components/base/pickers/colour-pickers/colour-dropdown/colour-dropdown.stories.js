import '../../../../../../utils.css';
import '@/components/pickers/colour-picker/colour-dropdown/colour-dropdown.vue';

export default {
  title: 'Components/pickers/colour/dropdown',
  component: ColourDropDown,
  argTypes: {
    onColourChange: {},
  },
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { ColourDropDown },
  setup() {
    return { args };
  },
  template: '<colour-dropdown v-bind="args"/>',
});

export const Default = Template.bind({});
defaultStatus.args = {
};
