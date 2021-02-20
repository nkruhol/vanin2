import * as firebase from "firebase-admin";
import { config } from "./config";

firebase.initializeApp(config);

export const database = firebase.database();
