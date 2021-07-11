<template>
  <div class="w-full h-6 mt-2">
    <ul class="flex flex-row justify-start font-smaller text-accent-600">
      <li
        v-for="(breadcrumb, idx) in getbreadCrumbList"
        :key="idx"
        @click="routeTo(idx)"
        class="ml-2 w-100"
        :class="{ linked: !!breadcrumb.link }"
      >
        {{ breadcrumb.name }}
        <span v-if="!!breadcrumb.link">/</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import  {Vue, Options } from "vue-class-component";
import { BreadcrumbLink } from './model/breadcrumb';

@Options({})
export default class Breadcrumb extends Vue {
  private breadcrumbList: BreadcrumbLink[] = [{ name: "" }];

  created() {
    this.breadcrumbList = this.$route.meta.breadcrumb as BreadcrumbLink[];
    this.$watch(() => this.$route.fullPath, this.updateList,{ immediate: true, deep: true });
  }

  routeTo(index: number) {
    const link =
      this.breadcrumbList[index].link === undefined
        ? ""
        : `/${this.breadcrumbList[index].link}`;
    if (link != undefined) {
      this.$router.push(link);
    }
  }

  updateList() {
    if (this.$route !== undefined) {
      this.breadcrumbList = this.$route.meta.breadcrumb as BreadcrumbLink[];
    }
  }

  get getbreadCrumbList(): BreadcrumbLink[] {
    return this.breadcrumbList;
  }
}
</script>

<style lang="postcss">
.linked {
  cursor: pointer;
  color: $accent;
  text-decoration: underline;
}
.linked:hover {
  color: orange;
}
</style>
