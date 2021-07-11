import SelectInput from '@/components/base/form-controls/select/select-input.vue';
import '@/assets/styles/custom-styles.css';

export default {
  title: 'Pagemaker/form controls/select input',
  component: SelectInput,
  argTypes: {
    label: '',
    value: '',
    width: '',
    option: [],
    onChange: {},
  },
};

const selectOptions = [
  'apples',
  'oranges',
  'pears',
  'pomegranates'
]

const Template = (args) => ({
  components: { SelectInput },
  setup() {
    return { args };
  },
  template: `<div class="mt-8 h-12 bg-white-200 w-12">
        <select-input v-bind="args" />
      </div>`,
});

export const Default = Template.bind({});
Default.args = {
  label: 'A Label',
  value: '',
  width: 'w-12',
  selectOptions: selectOptions,
};

export const WithAValue = Template.bind({});
WithAValue.args = {
  label: 'A Label',
  value: 'oranges',
  width: 'w-12',
  selectOptions: selectOptions,
};
