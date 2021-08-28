import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import Firebase from "firebase/app";
import "firebase/firestore";
import { secrets } from '@/firebase/secrets';
import "@/assets/styles/custom-styles.css";

export const firebaseApp = Firebase.initializeApp(secrets.google);

firebaseApp.firestore().settings({
  cacheSizeBytes: 4000000
});

firebaseApp
  .firestore()
  .enablePersistence()
  .catch((err: { code: string; }) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
