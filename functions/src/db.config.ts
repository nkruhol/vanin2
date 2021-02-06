import * as firebase from "firebase-admin";

const config = {
    apiKey: "",
    appId: "",
    authDomain: "vanin2.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    //For example, https://your-database-123.europe-west1.firebasedatabase.app
    //https://vanin2-default-rtdb.europe-west1.firebasedatabase.app/
    databaseURL: "https://vanin2-default-rtdb.europe-west1.firebasedatabase.app/",
    // storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);

export const database = firebase.database();
