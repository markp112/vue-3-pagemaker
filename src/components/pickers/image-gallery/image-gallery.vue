<template>
  <section class="flex flex-col justify-start h-72 p-1 w-full rounded-sm bg-white shadow-lg border-2 border-gray-400">
    <p class="flex justify-end flex-row w-full">
      <close-button @onClick="closeClicked()">
      </close-button>
    </p>
    <div class="flex flex-row flex-nowrap w-full justify-between items-center h-full">
      <img
        src="@/assets/icons/left-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="leftArrowClick()"
      >
      <span
        v-for="image in getImages"
        :key="image.url"
        class="w-44 h-auto border border-gray-200 inline-block ml-1 mr-1"
      >
        <img :src="image.url" alt="" @click="imageClicked(image.url)" class="cursor-pointer">
      </span>
      <img
        src="@/assets/icons/right-grey-32.png"
        alt=""
        class="nav-arrow"
        @click="rightArrowClick()"
      >
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import CloseButton from '@/components/base/buttons/close-button/close-button.vue';
import { ImageCardProps } from '@/components/base/cards/image-card/model/image-type';

const IMAGE_BUCKET = 'images';

@Options({
  props: {
    parentImages: { default: (): ImageCardProps[] => {
      return [];
    }}
  },
  components: {
    'close-button': CloseButton,
  }
})
export default class ImagePicker extends Vue {
  name = 'image-picker';
  imagePointer = 0;
  maxImages = 0;
  parentImages!: ImageCardProps[];
  images: ImageCardProps[] = [];

  created() {
    if (this.parentImages.length !== 0) {
      this.images = this.parentImages;
    } else {
      this.getImagesFromBucket();
    }
  }

  get getImages() {
    this.maxImages = this.images.length < 3 ? this.images.length : 3;
    const imageBuffer: ImageCardProps[] = [];
    for (let index = this.imagePointer; index < this.maxImages + this.imagePointer; index++) {
      imageBuffer.push(this.images[index]);
    }
    return imageBuffer;
  }

  closeClicked() {
    this.$emit('closeClicked')
  }

  imageClicked(url: string) {
    this.$emit('imageClicked')
  }

  leftArrowClick() {
    this.imagePointer--;
    if (this.imagePointer < 0) this.imagePointer = this.images.length - this.maxImages;
  }

  rightArrowClick() {
    this.imagePointer++;
    if (this.imagePointer + this.maxImages > this.images.length) this.imagePointer = 0;
  }

  getImagesFromBucket() {
    this.images = [];
    CloudStorageModule.updateBucketName('images');
    this.getImageDetailsFromStorage()
    .then(files => {
      const fileList = files;
      this.getFileUrls(fileList);
    });
  }

  private getImageDetailsFromStorage(): Promise<BucketImage[]> {
    let fileList: BucketImage[] = [];
    return new Promise((resolve, reject) => {
      CloudStorageModule.getImagesFromBucket()
      .then(files => {
        fileList = (files as BucketImage[]);
        resolve(fileList);
      });
    });
  }

  private getFileUrls(fileList: BucketImage[]) {
    fileList.forEach(bucketImage => {
      CloudStorageModule.getFileUrl(bucketImage.name)
      .then (url => {
        const image: ImageCardProps = {
          url: url,
          title: bucketImage.name,
          tags: [],
        };
        CloudStorageModule.getImageMetaData(bucketImage.name)
        .then (tags => {
          if (tags.length > 0) {
            image.tags = tags;
            this.addTagsToTags(tags)
          }
          this.images.push(image);
        })
      });
    });
  }

  addTagsToTags(tags: string[]) {
    const tempTags = new Set([...this.tags, ...tags]);
    this.tags = [...tempTags];
    this.tags.sort();
  }

}
</script>

<style lang="css">
  .nav-arrow {
    @apply cursor-pointer;
    @apply rounded-full;
  }

  .nav-arrow:hover {
    @apply bg-gray-400;
  }
</style>>
