import BaseButton from '@/components/base/base-button/base-button.vue';
import '../../../../utils.css';


export default {
  title: 'Pagemaker/buttons/Base button',
  component: BaseButton,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
    buttonType: { control: { type: 'select', options: ['primary', 'secondary', 'default'] } },
    variant: { control: { type: 'select', options: ['solid', 'outline', 'text'] } },
    buttonShape: { control: { type: 'select', options: ['rectangular', 'circle'] } },
    onClick: {},
  },
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  setup() {
    return { args };
  },
  template: '<base-button v-bind="args">x</base-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  buttonType: 'primary',
  disabled: false,
  variant: 'solid'
};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonType: 'secondary',
  disabled: false,
  variant: 'solid'
};

export const Outline = Template.bind({});
Outline.args = {
  buttonType: 'secondary',
  disabled: false,
  variant: 'outline'
};

export const Text = Template.bind({});
Text.args = {
  buttonType: 'secondary',
  disabled: false,
  variant: 'text'
};

export const Disabled = Template.bind({});
Disabled.args = {
  buttonType: 'secondary',
  disabled: true,
  variant: 'text'
};
