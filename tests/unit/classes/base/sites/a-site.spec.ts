import { ASite, DEFAULT_DATE, DEFAULT_IMAGE } from '@/classes/base/sites/ASite'

describe('ASite', () => {
  let aSite: ASite;

  it('should construct a default site when called with no parameters in the constructor', () => {
    aSite = new ASite();
    expect(aSite).toBeDefined();
    expect(aSite.siteId).toEqual('');
    expect(aSite.name).toEqual('');
    expect(aSite.created).toEqual(new Date(DEFAULT_DATE));
    expect(aSite.description).toEqual('');
    expect(aSite.url).toEqual('');
    expect(aSite.published).toEqual(new Date(DEFAULT_DATE));
    expect(aSite.image).toEqual(DEFAULT_IMAGE);
  });

  it('should construct ASite with a siteId, name, and created values set when called with these', () => {
    aSite = new ASite('1234', 'my-site', new Date('01 Jan 2021'));
    expect(aSite.siteId).toEqual('1234');
    expect(aSite.name).toEqual('my-site');
    expect(aSite.created).toEqual(new Date('01 Jan 2021'));
  });

  it('should return an object when toObject is called', () => {
    aSite = new ASite('1234', 'my-site', new Date('01 Jan 2021'));
    aSite.url = 'http://somewhere';
    aSite.description = 'A description';
    aSite.image = 'http://animage';
    aSite.published = new Date('01 may 2021');
    const siteAsObject = aSite.toObject();
    expect(siteAsObject).toEqual({
      'created': new Date('01 Jan 2021'),
      'description': 'A description',
      'image': 'http://animage',
      'name': 'my-site',
      'published': new Date('01 may 2021'),
      'siteId': '1234',
      'url': 'http://somewhere',
    });
  })
})
