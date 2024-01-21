// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuxGVOMj2hI3n6e8IpNA0Xxh1CNakftk0",
  authDomain: "samparcfund-9abbc.firebaseapp.com",
  projectId: "samparcfund-9abbc",
  storageBucket: "samparcfund-9abbc.appspot.com",
  messagingSenderId: "29747065917",
  appId: "1:29747065917:web:cd26bcc6f11b1bcd58a654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth , RecaptchaVerifier, signInWithPhoneNumber};
export const firebaseApp = app;