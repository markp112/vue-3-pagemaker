import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './index.css';
// import { firestorePlugin } from "vuefire";
import Firebase from "firebase/app";
import "firebase/firestore";


// export const firebaseApp = Firebase.initializeApp(secrets.google);

createApp(App).use(store).use(router).mount("#app");
