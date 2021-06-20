import { ImageElementFirebaseData, PageContainerFirebaseData, PageElementFirebaseData } from '../../model/firebase-model'

export type PageIdentity = {
  siteId: string;
  userId: string;
  pageId: string;
};

export type  PageContainerFirebaseDataInterface = {
  pageIdentity: PageIdentity;
  containerData: PageElementFirebaseData[];
};

export type FirebasePageDataTypes =
| PageContainerFirebaseData
| PageElementFirebaseData
| ImageElementFirebaseData;
