// test for site defaults
//
import { siteDefaultSettings } from '@/classes/settings/site-defaults/models/defaults';
import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults'

describe('site-defaults', () => {
  let siteDefaults: SiteDefaults;

  it('should instantiate with default values for colours, typography', () => {
    siteDefaults = new SiteDefaults();
    expect(siteDefaults.colours.primary).toEqual(siteDefaultSettings.colours.primary);
    expect(siteDefaults.colours.textOnPrimary).toEqual(siteDefaultSettings.colours.textOnPrimary);
    expect(siteDefaults.typography.fontName).toEqual(siteDefaultSettings.typography.fontName);
    expect(siteDefaults.typography.fontSizeBody).toEqual(siteDefaultSettings.typography.fontSizeBody);
  });


})
