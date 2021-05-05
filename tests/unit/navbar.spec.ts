import { shallowMount, mount } from "@vue/test-utils";
import NavMenuComponent from '@/components/core/navbar/nav.vue';
import store from "@/store";
import { createApp } from "vue";
import App from "@/App.vue";

createApp(App)
  .use(store);

describe("nav.vue", () => {
  it("renders a site icon on the left", () => {
    const wrapper = shallowMount(NavMenuComponent)
    const siteLogo = wrapper.findComponent('layout-48.png');
    expect(siteLogo).toBeTruthy();
  });

  it("renders a hamburger icon on the right", () => {
    const wrapper = shallowMount(NavMenuComponent)
    const siteLogo = wrapper.findComponent('menu-48.png');
    expect(siteLogo).toBeTruthy();
  })

  it("should show / hide the menu component when the hamburger is clicked", () => {
    const wrapper = mount(NavMenuComponent);
    const imageArray = wrapper.findAll('img');
    expect(imageArray.length).toEqual(2);
    const itemList = wrapper.classes('toggleable');
    expect(itemList).toBe(false);
    const hamburger = imageArray[0];  //assumes the hamburger will always be the second image
    hamburger.trigger('click');
    const menuList = wrapper.find('ul');
    expect(menuList).toBeTruthy();
  })

  it ("should display a menu to login / register if the user is not logged in", () => {

  })
});
