import firebase from 'firebase';
import { SiteAndUser } from '../types/site-and-user';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { BucketImage } from './models/bucket-image';
import { UsersBucket } from './models/UsersBucket';
import { ImageTags } from './models/image-tags';


export function firestoreSaveFile(file: File, siteAndUser: SiteAndUser ): Promise<Notification> {
  const path = `${siteAndUser.userId}/images/`;
  const notification: Notification = notificationDefault;
  const fileStore = firebase.storage().ref(`${path}${file.name}`);
  return new Promise((resolve, reject) => {
    const task = fileStore.put(file);
    task.then(result => {
      fileStore.getDownloadURL().then(url => {
        notification.message = url;
        resolve(notification);
      });
    });
    task.catch(err => {
      notification.status = "Error";
      notification.message = err.message;
      reject(notification);
    });
  });
}

export function getImagesFromBucket(usersBucket: UsersBucket): Promise<BucketImage[]> {
  const path = `${usersBucket.userId}/${usersBucket.bucket}/`;
  const fileStore = firebase.storage().ref(path);
  return new Promise((resolve, reject) => {
    fileStore.listAll()
    .then (res => {
      const files: BucketImage[] = [];
      res.items.forEach(itemRef => {
          const bucketImage: BucketImage = {
            bucket: itemRef.bucket,
            fullPath: itemRef.fullPath,
            name: itemRef.name,
          }
          files.push(bucketImage);
      })
      resolve(files);
    })
    .catch(err => {
      console.log('%c⧭', 'color: #d0bfff', err);
    })
  })
}

export function getFileUrl(fileName: string, usersBucket: UsersBucket): Promise<string> {
  const path = `${usersBucket.userId}/${usersBucket.bucket}/`;
  const fileStore = firebase.storage().ref(path);
  return new Promise((resolve, reject) => {
    fileStore.child(fileName).getDownloadURL()
    .then(url => {
      resolve(url);
    })
  });
}

function getImageMetaData(fileName: string, usersBucket: UsersBucket): Promise<string[]> {
  const path = `${usersBucket.userId}/`;
  const fileStore = firebase.storage().ref(path);
  const imageRef = fileStore.child(`${usersBucket.bucket}/${fileName}`);
  return new Promise((resolve, reject) => {
    imageRef.getMetadata()
    .then(metadata => {
      const tagList: string = metadata.customMetadata === undefined ? '' : metadata.customMetadata.tags;
      const tags: string[] = tagList === '' ? [] : tagList.split(',');
      resolve(tags);
    })
  })
}

export function addMetaData(metaData: ImageTags, usersBucket: UsersBucket) {
  const path = `${usersBucket.userId}/`;
  const fileStore = firebase.storage().ref(path);
  const imageRef = fileStore.child(`${usersBucket.bucket}/${metaData.imageName}`);
  const storageMetaData = {
    customMetadata: {
      'tags': metaData.tags.toString(),
    },
  };
  return new Promise((resolve, reject) => {
    imageRef.updateMetadata(storageMetaData)
    .then(result => {
      resolve(result);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function deleteFile(fileName: string, usersBucket: UsersBucket ): Promise<boolean> {
  const path = `${usersBucket.userId}/`;
  const fileStore = firebase.storage().ref(path);
  const imageRef = fileStore.child(`${usersBucket.bucket}/${fileName}`);
  return new Promise((resolve, reject) => {
    imageRef.delete()
      .then(()=> {
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(false);
      })
  })
}
