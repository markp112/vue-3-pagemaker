<template>
  <div
    ref="textContent"
    v-html="getContent"
  >
  </div>
</template>

<script lang="ts">
import  { Vue, Options } from "vue-class-component";

@Options({
  props: {
    content: {
      default: ''
    }
  }
})
export default class TextData extends Vue {
  name = 'text-data';
  content!: string;

  get getContent() {
    return this.content;
  }
}
</script>
