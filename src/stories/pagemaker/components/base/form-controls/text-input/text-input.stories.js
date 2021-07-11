import TextInput from '@/components/base/form-controls/text-input/text-input.vue';
import '@/assets/styles/custom-styles.css';

export default {
  title: 'Pagemaker/form controls/text input',
  component: TextInput,
  argTypes: {
    label: '',
    value: '',
    type: '',
    onChange: {},
  },
};

const Template = (args) => ({
  components: { TextInput },
  setup() {
    return { args };
  },
  template: `<div class="mt-8 h-12 bg-white-200 w-8/12">
        <text-input v-bind="args" />
      </div>`,
});

export const Default = Template.bind({});
Default.args = {
  label: 'A Label',
  value: '',
  width: 'w-32',
  type: 'text'
};

export const WithAValue = Template.bind({});
WithAValue.args = {
  label: 'A Label',
  value: 'The inputted value',
  type:'number'
};
