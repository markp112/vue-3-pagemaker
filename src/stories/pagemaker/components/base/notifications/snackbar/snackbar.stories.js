import Snackbar from '@/components/base/notifications/snackbar/snackbar.vue';
import { useStore, AllActionTypes } from '@/store';
import { SnackBar } from '@/classes/base/notification/snackbar/snackbar';

const store = useStore();
const snackbarDefault = {
  message: 'A message',
  title: 'Success',
  type: 'success',
  show: true,
};

const setSnackbar = (message, title, type, show) => {
  return {
    message: message,
    title: title,
    type: type,
    show: true,
  };
}

const snackBar = SnackBar.getInstance();



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

const defaultSnackbar = setSnackbar('The task suceeded', 'Success', 'success', true);

// store.dispatch(AllActionTypes.SHOW_SNACKBAR, defaultSnackbar);
snackBar.snackbarMessage = defaultSnackbar;
snackBar.showSnackbar();
export const Default = Template.bind({});
Default.args = {
};

const errorSnackbar = setSnackbar('The task suceeded', 'Success', 'error', true);
snackBar.snackbarMessage = errorSnackbar;
snackBar.showSnackbar();
export const Error = Template.bind({});
Default.args = {
};
// snackBar.hideSnackbar();
