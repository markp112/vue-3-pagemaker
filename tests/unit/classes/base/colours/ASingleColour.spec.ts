import { ASingleColour } from '../../../../../src/classes/base/colours/ASingleColour'

describe("AsingleColour", () => {

  let aSingleColour: ASingleColour;

  it("should store a single colour when constructed", () => {
    aSingleColour = new ASingleColour('background','#eeffee');
    expect(aSingleColour.colourName).toEqual('background');
    expect(aSingleColour.value).toEqual('#eeffee');

  })

  it("should return a css formatted colour style when toCssStyle is called", () => {
    aSingleColour = new ASingleColour('background','#eeffee');
    expect(aSingleColour.toCssStyle('background-color')).toEqual('background-color:#eeffee;');
    expect(aSingleColour.toCssStyle('color')).toEqual('color:#eeffee;');
    expect(aSingleColour.toCssStyle('border-color')).toEqual('border-color:#eeffee;');

  })

})