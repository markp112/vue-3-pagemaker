<template>
  <base-button
    buttonShape="circle"
    variant="outline"
    size="small"
    @onClick="closeClicked()"
  >
    X
  </base-button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseButton from '../base-button.vue';
@Options({
  components: {
    'base-button': BaseButton,
  }
})
export default class CloseButton extends Vue{
  name = 'close-button';

  closeClicked() {
    this.$emit('onClick');
  }
}
</script>
