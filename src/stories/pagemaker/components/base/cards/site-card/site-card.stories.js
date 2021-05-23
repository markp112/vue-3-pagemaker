import Sitecard from '@/components/base/cards/site-card/site-card.vue'
import { ASite } from '@/classes/base/sites/ASite';


export default {
  title: 'Pagemaker/sitecard',
  component: Sitecard,
  argTypes: {
    onClick: {},
    onGoClick: {}
  },
};

const site = new ASite();

const Template = (args) => ({
  components: { Sitecard },
  setup() {
    return { args };
  },
  template: `<div class="w-96">
      <sitecard v-bind="args" />
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  site: site,
};
