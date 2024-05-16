import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLIdX67aAt4trpe-64SBPn0V9qGq75iG8",
  authDomain: "dwfd-c37d9.firebaseapp.com",
  projectId: "dwfd-c37d9",
  storageBucket: "dwfd-c37d9.appspot.com",
  messagingSenderId: "411415637977",
  appId: "1:411415637977:web:2b298308675d119739b3c8",
  measurementId: "G-HG7RXWEL71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
createApp(App).use(store).use(router).mount('#app')
