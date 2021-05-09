<template>
  <div>
    <p class="text-center text-2xl font-bold">Welcome Back</p>
    <p class=" text-lg font-bold mt-4 mb-4">Login</p>
    <form  class="mt-6 w-4/6 ml-8">
      <label for="email" class="text-sm">E-Mail</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="input-control"
        placeholder="E-mail address"
        required
      />
      <label for="password" class="text-sm mt-4 block">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="input-control"
        placeholder="Password"
        required
      />
      <div class="flex justify-between flex-row mt-12">
        <button
          type="button"
          class="bg-gray-600 py-1 px-3 rounded-md text-white"
          @click="cancelClick()"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-600 py-1 px-3 rounded-md text-white"
          @click="submitClick()"
        >
          Submit
        </button>
      </div>
      <div class="error" v-if="$props.formErrors.length > 0">
        <p v-for="error in $props.formErrors" :key="error">{{ error }}</p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { AUser } from '@/classes/base/user/user';

@Options({
  props: {
    formErrors: {
      default: (): string[] => {
        return []
      }
    }
  }
})
export default class LoginForm extends Vue {
  name = "login-form";
  email = '';
  password = '';

  submitClick() {
    if (this.validateForm()) {
      let user: AUser = new AUser();
      user.email = this.email;
      user.password = this.password;
      user.isSignedIn = false;
      this.$emit('submitClicked', user)
    }
  }

  cancelClick() {
    this.$emit('cancelClicked');
  }

  private validateForm(): boolean {
    if (this.email !=='' && this.password !=='') return true;
    return false;
  }
}
</script>

<style lang="postcss" scoped>
.input-control {
  @apply block border-2 rounded-md w-full p-1;
}

.error {
  @apply bg-red-600 text-white w-full mt-2 rounded-md p-2 text-sm;
}
</style>
