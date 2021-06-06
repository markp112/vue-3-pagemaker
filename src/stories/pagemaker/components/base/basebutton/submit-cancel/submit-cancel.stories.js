import SubmitCancel from '@/components/base/base-button/submit-cancel/submit-cancel.vue';

export default {
  title: 'Pagemaker/Buttons/submit-cancel',
  component: SubmitCancel,
  argTypes: {
    onSubmitClick: {},
    onCancelClick: {},
  },
};

const Template = (args , {argTypes}) => ({
  props: Object.keys(argTypes),
  // Components used in your story `template` are defined in the `components` object
  components: { SubmitCancel },
  setup() {
    return { args };
  },
  template: '<submit-cancel v-bind="args"/>',
});

export const Default = Template.bind({});
