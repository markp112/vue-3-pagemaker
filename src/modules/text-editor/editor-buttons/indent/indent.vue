<template>
  <div class="flex flex-row justify-start">
    <img src="@/assets/icons/increase_indent-32.png" 
          class=" cursor-pointer hover:bg-gray-800"
          @click="indentClick()"
          >
    <img src="@/assets/icons/reduce_indent-32.png" 
        class=" cursor-pointer hover:bg-gray-800"
        @click="outdentClick()"
        >
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({})
export default class IndentOutdent extends Vue {
  name = 'IndentOutdent';

  indentClick() {
    this.$emit('onIndentClick');
  }

  outdentClick() {
    this.$emit('onOutdentClick');
  }

}
</script>
