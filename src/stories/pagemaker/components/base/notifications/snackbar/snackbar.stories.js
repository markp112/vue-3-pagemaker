import Snackbar from '@/components/base/notifications/snackbar/snackbar.vue';
import  showTheSnackbar  from '@/common/show-snackbar/show-snackbar';

export default {
  title: 'Pagemaker/snackbar',
  component: Snackbar,
  argTypes: {
    onClick: {},
  },
};

const Template = (args) => ({
  components: { Snackbar },
  setup() {
    return { args };
  },
  template: `<div class="w-96">
      <snackbar v-bind="args" />
    </div>`,
});

let title = 'message';
let message = 'message';
let type = 'success';
showTheSnackbar(title, message, type);

// store.dispatch(AllActionTypes.SHOW_SNACKBAR, defaultSnackbar);
// snackBar.showSnackbar();
export const Default = Template.bind({});
Default.args = {
};


// snackBar.showSnackbar();
export const Error = Template.bind({});
Default.args = {
};
// snackBar.hideSnackbar();
