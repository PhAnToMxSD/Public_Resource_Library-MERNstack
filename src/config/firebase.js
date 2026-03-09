import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

import dotenv from "dotenv"

dotenv.config()

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);