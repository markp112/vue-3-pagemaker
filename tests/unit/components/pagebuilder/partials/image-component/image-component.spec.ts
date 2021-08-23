import ImageComponent from '@/views/page-builder/partials/image-component/image-component.vue';
import { GenericComponentMixins } from '@/views/page-builder/mixins/generic-component';
import { mount } from '@vue/test-utils';
import { ImageElement } from '@/classes/page-elements/image-element/image-element';
import { PageElementBuilder } from '@/classes/page-elements/builder/page-element-builder';
import defaultSettings from '@/common/defaults/defaults';

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
    
    it('should render a default image which is the empty image placeholder', () => {
        const props: propsData = {
            thisComponent: new PageElementBuilder().buildAnImage(),
        }
        const imageComponent = createImageComponent(props);
        expect(imageComponent.attributes('src')).toEqual(defaultSettings.imageDefaults.defaultImage);
    });

    it('should render an image with default dimensions all set the same', () => {
        const props: propsData = {
            thisComponent: new PageElementBuilder().buildAnImage(),
        };
        expect(props.thisComponent.naturalSize.height).toEqual(defaultSettings.imageDefaults.natural_height);
        expect(props.thisComponent.naturalSize.width).toEqual(defaultSettings.imageDefaults.natural_width);

    })



})