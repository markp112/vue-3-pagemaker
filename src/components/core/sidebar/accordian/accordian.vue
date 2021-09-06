<template>
  <section>
    <div @click.prevent="active = !active">
      <div
        class="border-b-2 border-siteSurface border-solid w-full flex flex-row justify-between cursor-pointer"
      >
        <h4 class="text-onPrimary">
          {{ $props.accordianTitle }}
        </h4>
        <span class="down-Arrow" v-show="!active">&#9660;</span>
        <span class="up-Arrow" v-show="active">&#9650;</span>
      </div>
    </div>
    <div v-show="active" class="bg-siteLight">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">

import { Vue, Options } from "vue-class-component";

type InitialState = 'open' | 'closed';

@Options({
  props: {
    accordianTitle: { default: "" },
    initialState: {
      default: (): InitialState => {
        return 'closed'
      },
    },
  }
})
export default class Accordian extends Vue {
  name = 'accordian';
  accordianTitle = '';
  active = false;
  initialState = 'closed';

  mounted() {
    this.active = this.initialState === 'open';

  }
}
</script>

<style></style>
