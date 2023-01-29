import firebase from "firebase/app";
import { config } from "./config";
import 'firebase/storage';

firebase.initializeApp(config);

export const storage = firebase.storage();