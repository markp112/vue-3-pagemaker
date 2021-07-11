import ImagePicker from '@/components/pickers/image-gallery/image-gallery.vue'

export default {
  title: "components/pickers/Image Gallery",
  component: ImagePicker,
  argTypes: {
    closeClicked: {},
    imageClicked: {},
  }
};

const sampleImage = [
  {
    title:'test',
    tags: [],
    url: 'https://www.carscoops.com/wp-content/uploads/2020/01/Maserati-Millemiglia-.jpg',
  },
  {
    title:'test',
    tags: [],
    url: 'https://pixfeeds.com/images/flowers/lotuses/1280-149133082-pink-bloomed-lotus-flower-with-stem.jpg',
  },
  {
    title:'test',
    tags: [],
    url: 'https://hips.hearstapps.com/countryliving.cdnds.net/17/01/1600x800/landscape-1483531892-scotland-mountains.jpg?',
  },
  {
    title:'test',
    tags: [],
    url: 'https://tse4.mm.bing.net/th/id/OIP.Cw0HcLyAHMnW32ziFIG0owHaEK?pid=ImgDet&rs=1',
  }
];

const Template = (args) => ({
  components: { ImagePicker },
  setup() {
    return { args };
  },
  template: `<div class="p-2">
    <image-picker
      v-bind="args"
    />
    </div>`
});

export const Default = Template.bind({});
Default.args = {
  parentImages: sampleImage,
};
