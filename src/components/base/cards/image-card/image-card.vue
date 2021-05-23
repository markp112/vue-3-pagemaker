<template>
  <div class="w-64 flex flex-col justify-start border shadow-lg relative h-80 ">
    <div
      ref="card-header"
      class="flex flex-row flex-nowrap justify-between text-sm p-1 bg-sitePrimary text-siteSurface overflow-hidden w-64"
    >
      <span class="inline-block w-64 overflow-hidden text-xs">{{ $props.image.title }}</span>
      <img
        class="cursor-pointer hover:bg-siteDark rounded-full h-6"
        src="@/assets/icons/trash_can-32.png"
        alt="delete image"
        @click="showConfirm=true"
      >
    </div>
    <div
      class="cursor-pointer h-44 w-64 bg-gray-900"
      ref="card-body"
      @click="imageSelected($props.image.url)"
    >
      <img class="h-auto max-h-44 w-full"
        :src="$props.image.url"
        ref="imageInCard"
      >
    </div>
    <div class="py-2 px-2 flex flex-row flex-wrap overflow-y-auto">
      <p class="w-full sticky top-0">
        <base-button
          class="self-start"
          size="x-small"
          label="Add tag"
          @onClick="showAddTag=true"
        >
        </base-button>
      </p>
      <image-pill
        v-for="(tag, index) in $props.image.tags"
        :key="tag+index"
        size="small"
        :label="tag"
        pillColour="bg-siteSecondary"
        class="ml-1 mt-1"
        @removeClick="removeTag($event)"
      >
      </image-pill>
    </div>
    <add-tag
      v-if="showAddTag"
      class="absolute top-44 left-8 z-50 h-20 w-full"
      @onCloseClick="showAddTag=false"
      @onOkClick="addTag($event)"
    >
    </add-tag>
    <confirm-dialog
      class="absolute top-12 left-8"
      v-if="showConfirm"
      :message="getMessage"
      @yesClicked="deleteImage()"
      @noClicked="showConfirm=false"
    >
    </confirm-dialog>
  </div>
</template>

<script lang="ts">
import  { Vue, Options } from 'vue-class-component';
import ImagePill from '@/components/base/notifications/pills/image-pill/image-pill.vue';
import Tag from '@/components/base/popups/tag/tag.vue'
import BaseButton from '@/components/base/buttons/base-button/base-button.vue';
import Confirm from '@/components/base/popups/confirm/confirm.vue'
import { ImageCardProps } from './model/image-type'
import { ImageTags } from '@/common/filestore/models/image-tags';
import { addMetaData } from '@/common/filestore';
import { UsersBucket } from '@/common/filestore/models/UsersBucket';

@Options({
  props: {
    image: {
      default: (): ImageCardProps => {
        return {
          title: '',
          tags: [],
          url: ''
        }
      },
    },
    usersBucket: (): UsersBucket => {
      return {
        bucket: '',
        userId: '',
      }
    }
  },
  components: {
    'image-pill': ImagePill,
    'add-tag': Tag,
    'base-button': BaseButton,
    'confirm-dialog': Confirm,
  }
})
export default class ImageCard extends Vue {
  name = 'image-card';
  showAddTag = false;
  showConfirm = false;
  image!: ImageCardProps;
  usersBucket!: UsersBucket;

  deleteImage() {
    this.$emit('deleteImage', this.image.title)
  }

  imageSelected(url: string) {
    this.$emit('imageSelected', url)
  }

  addTag(tag: string) {
    const tags = this.image.tags;
    if (!tags.includes(tag.toLowerCase())) {
      tags.push(tag.toLowerCase());
      const imageTags: ImageTags = {
        imageName: this.image.title,
        tags: tags,
      };
      addMetaData(imageTags, this.usersBucket);
    }
    this.$emit('addTag', tag.toLowerCase())
  }

  removeTag(tag: string) {
    const tags = this.image.tags.filter((imageTag: string) => imageTag !== tag);
    const imageTags: ImageTags = {
      imageName: this.image.title,
      tags: tags,
    };
    addMetaData(imageTags, this.usersBucket);
    this.image.tags = tags;
    this.$emit('removeTag', tag)
  }

  get getMessage(): string {
    return `Confirm delete of ${this.image.title}`;
  }
}
</script>
