

<template>
  <section ref="textEditor">
    <p
      @select="onSelect" style="background-color:blue; color:white;"
    >
    Some text</p>
    <p @select="onSelect" > {{ content }} </p>
  </section>
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    content: { default: ''},
  }
})
export default class ParagraphComponent extends Vue {
  name='Paragraph-component'
  content = '';

  mounted() {
    const textEditor = this.$refs.textEditor as HTMLElement;
    textEditor.innerHTML = this.content;
    console.log('%c%s', 'color: #733d00', this.content)
  }

  onSelect() {
    console.log("seelcted")
  }
  
}
</script>