import Icon from '@/components/base/icon/icon.vue';


export default {
  title: 'Pagemaker/Icon',
  component: Icon,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `<div class="  mt-8 border border-gray-100 h-12 bg-white-200">
        <Icon v-bind="args" />
      </div>`,
});

export const Default = Template.bind({});
Default.args = {
  tooltip: 'About',
  id: '1',
  icon: 'home-32.png'
}

export const Pencil = Template.bind({});
Pencil.args = {
  tooltip: 'About',
  id: '1',
  icon: 'pencil-32.png'
};

export const WithoutToolTip = Template.bind({});
WithoutToolTip.args = {
  tooltip: '',
  id: '1',
  icon: 'pencil-32.png'
};
