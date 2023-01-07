import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAdmzFk12bvVUWZQchJnchjuSsnADSn4bc',
  authDomain: 'shopy-25a24.firebaseapp.com',
  projectId: 'shopy-25a24',
  storageBucket: 'shopy-25a24.appspot.com',
  messagingSenderId: '334805858613',
  appId: '1:334805858613:web:d01745e6dabc349f54347c',
  measurementId: 'G-XVNKKC2CX4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
