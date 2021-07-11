import Tooltip from '@/components/base/notifications/tooltip/tooltip.vue';


export default {
  title: 'Pagemaker/Tooltip',
  component: Tooltip,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { Tooltip },
  setup() {
    return { args };
  },
  template: `<div class="w-96 relative mt-8 border border-gray-100 h-12 bg-gray-200">
        <tooltip v-bind="args" />
      </div>`,
});


// store.dispatch(AllActionTypes.SHOW_Tooltip, defaultTooltip);
export const Default = Template.bind({});
Default.args = {
  showToolTip: true,
  tooltip: 'tooltip',
};
