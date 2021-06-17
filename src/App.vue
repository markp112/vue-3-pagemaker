<template>
  <div
    class="min-w-screen max-w-screen border-box font-body flex flex-col h-screen overflow-hidden "
  >
    <nav-bar></nav-bar>
    <bread-crumb/>
    <div class="flex flex-row justify-start">
      <sidebar-container />
      <div class="w-10/12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavMenuComponent from '@/components/core/navbar/nav.vue';
import Breadcrumb from '@/components/core/breadcrumb/breadcrumb.vue';
import SideBar from '@/components/core/sidebar/sidebar-container/sidebar-container.vue';
import { ActionTypes as authActionTypes } from '@/store/modules/auth/actions/actions';
import { useStore, AllActionTypes } from '@/store';

@Options({
  components: {
    'nav-bar': NavMenuComponent,
    'bread-crumb': Breadcrumb,
    'sidebar-container': SideBar,
  },
})
export default class MainApp extends Vue {
  name = 'main-app';
  store = useStore();

  created() {
    console.log('Created');
    if (this.store.getters.isExistingUser) {
      this.store.dispatch(authActionTypes.SET_USER_FROM_LOCAL_STORAGE, true);
      this.store.dispatch(AllActionTypes.CREATE_NAV_MENU_SIGNED_IN, true);
      this.$router.push('/sites');
    } else {
      this.store.dispatch(AllActionTypes.CREATE_NAV_MENU_SIGNED_OUT, true);
    }
  }

  get showSideBar(): boolean {
    console.log('%c%s', 'color: #00a3cc', 'showSideBar')
    return this.store.getters.isShowSidebar;
  }
}
</script>
