import { ALocation } from "@/classes/base/location/a-location";
import { ImageManipulator } from "@/classes/images/image-manipulator/image-manipulator"
import Pan from "@/classes/images/pan/pan";
import { ImageElement } from "@/classes/page-elements/image-element/image-element";
import { MousePosition } from "@/classes/page-elements/types/mouse-position";
import { mocked } from 'ts-jest/utils'; 
import { instance, mock, verify } from "ts-mockito";
import buildAnImage from "../common/common";

// jest.mock('@/classes/images/pan/pan');



// jest.mock('@/classes/images/pan/pan', () => {
  //   return {
    //     Pan: jest.fn().mockImplementation(() => {
      //       return {
        //         constructor:(imageElement: ImageElement) =>  {},
        //         pan:(deltaMouse: MousePosition, location: ALocation) => {},
        //       }
        //     })
        //   }
        // });
        
        
        
        // const mockedPan = mocked(Pan, true);
        
        
// const mockedPan = <jest.Mock<Pan>>Pan;

const mousePosition: MousePosition ={ x: 1, y: 0 };

describe('ImageManipulator', () => {
  let imageManipulator: ImageManipulator;

  let imageElement: ImageElement | null;

    beforeEach(() => {
      // mockedPan.mockClear();
      imageElement = buildAnImage();
    });

    afterEach(() => {
        imageElement = null;
    });

    const deltaMouse: MousePosition = { x:1, y: 0 };

    it('should when apply is called with pan call the pan.pan method', () => {
      if (imageElement) {
        // const pan = new Pan(imageElement);
        const mockedPan: Pan = mock(Pan);
        const pan: Pan = instance(mockedPan)
        
        imageManipulator = new ImageManipulator(mockedPan);
        imageManipulator.apply('pan', mousePosition);
        verify(mockedPan.pan(mousePosition)).called();
      }
    });

})