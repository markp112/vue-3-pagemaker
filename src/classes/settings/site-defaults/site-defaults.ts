import { MaterialColoursInterface } from '../../base/colours/material-colours';
import { SiteColours, siteDefaultColours } from '../site-colours';
import { SiteTypography } from '../site-typography';
import { SiteDefaultsInterface } from './models/SiteDefaultSettings';
import { TypographyInterface } from './models/typography';
import { useStore } from '@/store/';

export class SiteDefaults implements SiteDefaultsInterface {
  #_colours: SiteColours = siteDefaultColours();
  #_typography: SiteTypography = new SiteTypography();
  #isLoaded: boolean = false;
  store = useStore();

  private static instance: SiteDefaults;

  public static getInstance(): SiteDefaults {
    if (!SiteDefaults.instance) {
      SiteDefaults.instance = new SiteDefaults();
    }
    return SiteDefaults.instance;
  }

  public get colours(): SiteColours {
    return this.#_colours;
  }

  public get typography(): TypographyInterface {
    return this.#_typography;
  }

  public get isLoaded(): boolean {
    return this.#isLoaded;
  }

  public get siteId(): string {
    return this.store.getters.currentSite.siteId;
  }

  public get userId(): string {
    return this.store.getters.user.id;
  }

  public loadDefaults(): Promise<Notification> {
    const data = {
      userId: this.userId,
      siteId: this.siteId
    };
    return new Promise((resolve, reject) => {
      ServicesModule.firestoreGetSiteDefaultSettings(data)
        .then(response => {
          const siteDefaults: SiteDefaultsInterface = response as SiteDefaultsInterface;
          this._colours = siteDefaults.colours;
          this._typography = siteDefaults.typography;
          this._isLoaded = true;
          const notification: Notification = {
            message: "Sucess",
            status: "ok"
          };
          resolve(notification);
        })
        .catch(err => {
          const notification = err as Notification;
          notification.status = "Error";
          // if error load the default settings
          this._colours = siteDefaultSettings.colours;
          this._typography = siteDefaultSettings.typography;
          this._isLoaded = false;
          reject(notification);
        });
    });
  }

  public saveDefaults(siteId: string, userId: string): Promise<Notification> {
    const data = {
      siteDefaults: {
        colours: this._colours,
        typography: this._typography,
        siteId: siteId,
        userId: AuthModule.currentUser.id
      }
    };
    return new Promise((resolve, reject) => {
      ServicesModule.firestoreSaveSiteDefaults(data)
        .then(notificaton => {
          resolve(notificaton);
        })
        .catch(notification => reject(notification));
    });
  }
}


}
