<template>
  <div class="error" v-if="hasErrors">
    <p v-for="error in formErrors" :key="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    formErrors: {
      default: (): string[] => { return [] },
    },
  },
})
export default class InvalidForm extends Vue {
  formErrors!: string[];

  get hasErrors(): boolean {
    console.log('%c%s', 'color: #cc0036', this.formErrors)
    return this.formErrors.length > 0 ? true : false;
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
