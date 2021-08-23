import { MaterialColoursInterface } from '@/classes/base/colours/models/material-colours';
import { TypographyInterface } from '../site-typography/models/typogrpahy';
import { SiteDefaultsInterface } from './models';
import { siteDefaultSettings } from './models/defaults';
import { firestoreGetSiteDefaultSettings, firestoreSaveSiteDefaults } from '@/classes/settings/firebase';
import { SiteAndUser } from '@/common/types/site-and-user';
import { getSiteAndUserId } from '@/common/site-and-user/site-and-user';
import { Notification } from '@/models/notification/notification';

export class SiteDefaults implements SiteDefaultsInterface {
  private _colours: MaterialColoursInterface = siteDefaultSettings.colours;
  private _typography: TypographyInterface = siteDefaultSettings.typography;
  private _isLoaded = false;
  private static instance: SiteDefaults;

  public static getInstance(): SiteDefaults {
    if (!SiteDefaults.instance) {
      SiteDefaults.instance = new SiteDefaults();
    }
    return SiteDefaults.instance;
  }

  public get colours(): MaterialColoursInterface {
    return this._colours;
  }

  public get typography(): TypographyInterface {
    return this._typography;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

  // class should be passed function to get user and siteud
  public loadDefaults(): Promise<Notification> {

    return new Promise((resolve, reject) => {
      const siteAndUser: SiteAndUser = getSiteAndUserId();
      firestoreGetSiteDefaultSettings(siteAndUser)
        .then(response => {
          const siteDefaults: SiteDefaultsInterface = response as SiteDefaultsInterface;
          this._colours = siteDefaults.colours;
          this._typography = siteDefaults.typography;
          this._isLoaded = true;
          const notification: Notification = {
            message: "sucess",
            status: "ok"
          };
          resolve(notification);
        })
        .catch(err => {
          console.log('%c%s', 'color: #00ff88', err);
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

  public saveDefaults(): Promise<Notification> {
    const siteDefaults: SiteDefaultsInterface = {
        colours: this._colours,
        typography: this._typography,
            }
    return new Promise((resolve, reject) => {
      firestoreSaveSiteDefaults(getSiteAndUserId(), siteDefaults)
        .then(notificaton => {
          resolve(notificaton);
        })
        .catch(notification => reject(notification));
    });
  }

}
