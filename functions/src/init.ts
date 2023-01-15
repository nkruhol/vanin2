import * as firebase from "firebase-admin";
import { config } from "./config";

export const app = firebase.initializeApp(config);

export const database = app.database();
export const auth = app.auth();