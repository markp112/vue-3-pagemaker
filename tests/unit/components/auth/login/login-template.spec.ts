import { shallowMount, mount } from "@vue/test-utils";
import LoginForm from '@/components/auth/login/login-template.vue';
// import store from "@/store";
import { createApp, vModelCheckbox } from "vue";
import { createStore } from 'vuex';
// import sinon from 'sinon';
import App from "@/App.vue";
import { AUser } from '@/classes/base/user/user';

const store = createStore({
  state() {
    return {
      user: new AUser(),
    }
  },
  actions: {
    login: jest.fn(),
  }

})
createApp(App).use(store);


describe("login-template.vue", () => {
  it("renders an input for email", () => {
    const wrapper = mount(LoginForm);
    const emailInput = wrapper.find('input[type=email]');
    const hasEmail = emailInput.html().includes('email');
    expect(hasEmail).toBe(true);
  })
  it("renders an input for password", () => {
    const wrapper = mount(LoginForm);
    const passwordInput = wrapper.find('input[type=password]');
    const hasPassword = passwordInput.html().includes('password');
    expect(hasPassword).toBe(true);
  })
  it("renders a submit button", () => {
    const wrapper = mount(LoginForm);
    const submitButton = wrapper.find('button[type=submit]');
    const hasSubmit = submitButton.html().includes('submit');
    expect(hasSubmit).toBe(true);
  })
  it("renders a cancel button", () => {
    const wrapper = mount(LoginForm);
    const cancelButton = wrapper.find('button[type=button]');
    const hasCancel = cancelButton.text().includes('Cancel');
    expect(hasCancel).toBe(true);
  })

it("it should emit a AUser object when submit is clicked with a valid e-mail", async() => {
  const EMAIL = 'atestUser@somewhere.com';
  const PASSWORD = 'password';
  const wrapper = mount(LoginForm);
  wrapper.get('input[type=email]').setValue(EMAIL);
  wrapper.get('input[type=password]').setValue(PASSWORD);
  await wrapper.find('button[type=submit]').trigger('click');
  const submitEvent = wrapper.emitted('submitClicked');
  expect(submitEvent).toHaveLength(1);
  if (submitEvent) {
    const user = submitEvent[0] as AUser[];
    expect(user[0]._email).toEqual(EMAIL);
    expect(user[0]._password).toEqual(btoa(PASSWORD));
  }
})

it("should not emit an event if the email and password are not filled in", async() => {
  const wrapper = mount(LoginForm);
  wrapper.get('input[type=email]').setValue('');
  wrapper.get('input[type=password]').setValue('');
  await wrapper.find('button[type=submit]').trigger('click');
  const submitEvent = wrapper.emitted('submitClicked');
  expect(submitEvent).toBeUndefined();
})

it("should emit cancelClicked when cancel is clicked", async() => {
  const wrapper = mount(LoginForm);
  await wrapper.find('button[type=button]').trigger('click');
  const submitEvent = wrapper.emitted('cancelClicked');
  expect(submitEvent).toHaveLength(1);
})

})
