import firebase from 'firebase';
import { PageContainerFirebaseDataInterface, PageIdentity } from '../builder/types/types';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { PageElementFirebaseData } from '../model/firebase-model';



const PAGES = "pagecontent";

export class FirestorePage {
  notification: Notification = notificationDefault;

  public savePage(
    data: PageContainerFirebaseDataInterface
  ): Promise<Notification> {
    const siteId = data.pageIdentity.siteId;
    const userId = data.pageIdentity.userId;
    const pageId = data.pageIdentity.pageId;
    const pageData = { data: data.containerData };
    return new Promise((resolve, reject) => {
      const collectionId = `${userId}${siteId}::${PAGES}`;
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc(pageId)
        .set(pageData)
        .then(() => {
          this.notification.message = "Page content saved";
          this.notification.status = "ok";
          resolve(this.notification);
        })
        .catch(err => {
          console.log('%c⧭', 'color: #5200cc', err);
          this.notification.status = "Error";
          this.notification.message = err;
          reject(this.notification);
        });
    });
  }

  public LoadPageData(
    data: PageIdentity
    ): Promise<PageElementFirebaseData[] | Notification> {
    console.log('%c%s', 'color: #364cd9', 'LoadPageData');
    const pageId = data.pageId;
    const siteId = data.siteId;
    const userId = data.userId;
    return new Promise((resolve, reject) => {
      const collectionId = `${userId}${siteId}::${PAGES}`;
      const firestore = firebase.firestore();
      firestore
        .collection(collectionId)
        .doc(pageId)
        .get()
        .then(response => {
          const docData = response.data();
          resolve(docData ? docData.data : []);
        })
        .catch(err => {
          console.log('%c⧭', 'color: #33cc99', err);
          this.notification.status = "Error";
          this.notification.message = err;
          reject(this.notification);
        });
    });
  }

}
