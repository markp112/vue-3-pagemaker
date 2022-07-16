<template>
  <div>
    <horizontal-image-text>
      <template v-slot:image-content class="">
        <img
          src="@/assets/images/bank-vault.jpg"
          alt="picture of a bank vault"
          class="object-fit"
        />
      </template>
      <template v-slot:text-content>
        <login-form
          :formErrors="formErrors"
          @submitClicked="submitClicked($event)"
          @cancelClicked="cancelClicked()"
          ></login-form>
      </template>
    </horizontal-image-text>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import LoginForm from '@/components/auth/login/login-template.vue';
import HorizontalImageText from '@/components/base/layouts/h-image-text/horizontal-image-text.vue';
import { AllActionTypes, useStore } from '@/store';
import { AUser } from '@/classes/base/user/user';
import { ErrorCodeEnum } from '@/common/types/errors';



@Options({
  components: {
    'login-form': LoginForm,
    'horizontal-image-text': HorizontalImageText,
  }
})
export default class Login extends Vue {
  name = "login";
  store = useStore();
  formErrors: string[] = [];

  async submitClicked(aUser: AUser) {
    this.formErrors = [];
    try {
        await this.store.dispatch(AllActionTypes.LOGIN, aUser);
        aUser = this.store.getters.user;
        window.localStorage.setItem(
          "pmToken",
          aUser.refreshToken ? aUser.refreshToken : ""
        );
        window.localStorage.setItem("pmEmail", aUser.email);
        window.localStorage.setItem("id", aUser.id);
        this.$router.push("/sites");
      }
      catch(err) {
        if (err === ErrorCodeEnum.LOGIN_FAILED) {
          this.formErrors = [];
            this.formErrors.push("Invalid aUser name or password");
        } else {
          this.formErrors = [];
          this.formErrors.push(err as string);
        }
      }
  }

  cancelClicked() {
    this.$router.push("/");
  }
}
</script>

<style lang="sass" scoped>

</style>