import * as functions from "firebase-functions";
import * as cors from "cors";
import { database } from "./db.config";
import { sendRegistrationEmail } from "./services/send-emails.service";

const cors1 = cors({origin: true});

export const approveParticipant = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    sendRegistrationEmail(request.body)
      .then(res => {

        database.ref("participants/" + request.body.id + "/isApproved").set(true);
        response.send(JSON.stringify({ ok: true }));
      }, err => {

        response.status(500).send(JSON.stringify({ err }));
      });
  })
});

export const createParticipant = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    database.ref('participants').push(request.body).then((res: any) => {

      response.send(JSON.stringify({ ok: true }));
    });
  })
});

export const participants = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    database.ref("participants").once('value')
      .then(snap => {

          let children: any = [];
          snap.forEach(child_snap => {
              
              children.push({ ...child_snap.val(), id: child_snap.key });
          });

          response.send(JSON.stringify({ ok: true, data: children }));
      })
  })
});
