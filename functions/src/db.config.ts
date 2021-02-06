import firebase from "firebase";
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "apiKey",
    authDomain: "vanin2.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    //For example, https://your-database-123.europe-west1.firebasedatabase.app
    //https://vanin2-default-rtdb.europe-west1.firebasedatabase.app/
    databaseURL: "https://vanin2-default-rtdb.europe-west1.firebasedatabase.app/",
    // storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);

// Get a reference to the database service
export const database = firebase.database();
