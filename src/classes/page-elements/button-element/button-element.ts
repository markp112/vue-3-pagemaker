import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults';
import { PageElementBuilder } from '../builder/page-element-builder';
import { PageElementFirebaseData } from '../firebase/model/firebase-model';
import { PageElement } from '../page-element-base/page-element-base';

export class ButtonElement extends PageElement {
  constructor(builder: PageElementBuilder) {
    super(builder);
  }

  setDefaultStyle() {
    if (this.styles.length === 0) {
      const siteDefaults = SiteDefaults.getInstance();
      this.addStyle(
        this.constructStyle("font-family", siteDefaults.typography.fontName)
      );
      this.addStyle(
        this.constructStyle("font-size", siteDefaults.typography.fontSizeBody)
      );
      const siteColours = siteDefaults.colours;
      this.addStyle(
        this.constructStyle("background-color", siteColours.secondary)
      );
      this.addStyle(this.constructStyle("color", siteColours.textOnSecondary));
    }
  }

  getElementContent(): PageElementFirebaseData {
    return this.getBaseElementContent();
  }
}
