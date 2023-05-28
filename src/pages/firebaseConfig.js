// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA7YmBrKY_wFpKPijt73aTbaNQXuus5RdQ',
  authDomain: 'conferencify-e6615.firebaseapp.com',
  projectId: 'conferencify-e6615',
  storageBucket: 'conferencify-e6615.appspot.com',
  messagingSenderId: '283966692277',
  appId: '1:283966692277:web:97cb267bdee4403e5297fc',
};
// const storage = getStorage(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default storage;

const storage = getStorage(app);
export default storage;
