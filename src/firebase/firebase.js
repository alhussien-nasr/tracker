import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBnRROe7jqff9oPRT_UihaMvIU4J527tYw',
  authDomain: 'tracker-e85cd.firebaseapp.com',
  projectId: 'tracker-e85cd',
  storageBucket: 'tracker-e85cd.appspot.com',
  messagingSenderId: '460743944674',
  appId: '1:460743944674:web:17483884b6ec6acf9db1bb',
};

export const app = initializeApp(firebaseConfig);
export const authantication = getAuth(app);
export const db = getFirestore(app);
