import * as functions from "firebase-functions";
import * as cors from "cors";
import { database } from "./db.config";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript


// const cors = require('cors')({origin: true});
// And the general form of your function will be like this:

// exports.fn = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//         // your function body here - use the provided req and res from cors
//     })
// });

const cors1 = cors({origin: true});

export const helloWorld = functions.https.onRequest((request, response) => {
  // functions.logger.info("Hello logs!", {structuredData: true});
  // response.send("Hello from Firebase!");

  cors1(request, response, () => {

    // database.ref('users/').push({
    //   username: "name111" + Math.random(),
    //   email: "email1111" + Math.random(),
    // });

    functions.logger.info("Hello logs!", {structuredData: true});
    response.send(JSON.stringify({ data: "Hello from Firebase!"}));

  })
});

export const helloWorld1 = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
});

export const createParticipant = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    // console.log(request.body);

    database.ref('participants').push(request.body).then((res: any) => {

      response.send(JSON.stringify({ ok: true }));
    });
  })
});

// firebase.database().ref('posts')

export const participants = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    database.ref("participants").once('value')
      .then(snap => {

          let children: any = [];
          snap.forEach(child_snap => {
              
              children.push({ ...child_snap.val(), id: child_snap.key }); // build children
          });

          response.send(JSON.stringify({ ok: true, data: children }));
      })
  })
});