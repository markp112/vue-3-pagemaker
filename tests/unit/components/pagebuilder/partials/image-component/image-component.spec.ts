import ImageComponent from '@/views/page-builder/partials/image-component/image-component.vue';
import { GenericComponentMixins } from '@/views/page-builder/mixins/generic-component';
import { mount } from '@vue/test-utils';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';

type propsData ={
    thisComponent: ImageElement,
}

const mixin: GenericComponentMixins = new GenericComponentMixins();

const createImageComponent = (propsData: propsData) =>
 mount(ImageComponent, {
    
    props: propsData,
    // global: {
    //     mixins: amixin,
    // }
});
describe('image-component', () => {

    beforeEach(() => {
    });
    
    it('should render a default empty image', () => {
        const props: propsData = {
            thisComponent: new PageElementBuilder().buildAnImage(),
        }
        const imageComponent = createImageComponent(props);
        expect(imageComponent.attributes('src')).toEqual('https://firebasestorage.googleapis.com/v0/b/page-maker-69fb1.appspot.com/o/hDkHXv0i06dVCPmIfRKefti9t4p1%2Fimages%2Fsite2.png?alt=media&token=46a82b23-1066-4c78-b70a-d7b69728e531');

    })



})