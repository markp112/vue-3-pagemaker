<template>
  <div
    class="min-w-screen max-w-screen border-box font-body flex flex-col h-screen overflow-hidden"
  >
    <nav-bar></nav-bar>
    <router-view />
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
import { ActionTypes as authActionTypes } from '@/store/modules/auth/actions/actions';
import { useStore, AllActionTypes } from '@/store';

@Options({
  components: {
    'nav-bar': NavMenuComponent,
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
    } else {
      this.store.dispatch(AllActionTypes.CREATE_NAV_MENU_SIGNED_OUT, true);
    }
  }
}
</script>
