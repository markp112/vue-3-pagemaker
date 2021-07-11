<template>
  <div class="flex flex-row justify-between align-middle">
    <span class="w-24">
      <base-button
        variant="outline"
        size="small"
        buttonType="secondary"
        @click="cancelClick"
      >Cancel</base-button>
    </span>
    <span class="w-24">
      <base-button
        variant="solid"
        size="small"
        buttonType="primary"
        @click="submitClick()"
      >Submit</base-button>
    </span>
  </div>
</template>

<script lang="ts">
import {Vue, Options } from "vue-class-component";
import BaseButton from '../base-button.vue';


@Options({
  components: {
    'base-button': BaseButton,
  }
})
export default class SubmitCancel extends Vue {
  name="submit-cancel";

  submitClick() {
    this.$emit('submitClick');
  }

  cancelClick() {
    this.$emit('cancelClick');
  }
}
</script>
