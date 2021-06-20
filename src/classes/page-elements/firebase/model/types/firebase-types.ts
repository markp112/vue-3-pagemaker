import { ImageElementFirebaseData, PageContainerFirebaseData, PageElementFirebaseData } from '../firebase-model';

export type FirebasePageDataTypes =
  | PageContainerFirebaseData
  | PageElementFirebaseData
  | ImageElementFirebaseData;
