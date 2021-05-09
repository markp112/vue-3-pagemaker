<template>
  <div class="mt-8">
    <h1 class=" text-4xl">Welcome to Page-maker</h1>
    <div class="flex justify-center items-center text-lg text-site-primary h-80 mt-12">
      <p class="w-4/12 border-2 border-siteLight shadow-lg rounded-md p-4 h-60">
        Pagemaker helps you build custom static websites, by providing you control over all elements of the page design you can
        do this by creating a page from scratch or using pre-built templates which you can further customise
      </p>
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
  },
})
export default class Home extends Vue {}
</script>
