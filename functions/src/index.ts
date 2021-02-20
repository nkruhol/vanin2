import * as functions from "firebase-functions";
import * as cors from "cors";
import { database } from "./db.config";
import * as sendPulse from "sendpulse-api";

const cors1 = cors({origin: true});

sendPulse

export const approveParticipant = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    console.log(111, request.body);

    database.ref("participants/" + request.body.id + "/isApproved").set(true)
    .then(res => {

      console.log(222, res);

      const email = {
        // "email": {
          "html": "PHA+RXhhbXBsZSB0ZXh0PC9wPg==",
          "text": "Example text",
          "subject": "Example subject",
          "from": {
            "name": "Example name",
            "email": "symposium@dsmmph.org.ua"
          },
          "to": [
            {
              "name": "Recipient1 name",
              "email": "n.kruhol@gmail.com"
            }
          ]
        // }
      }

      sendPulse.init("3815cbe1b0ce90f3e1055b7634e85ee4", "ed71526e0732ad85b76108bc3d87ab19" , "/tmp/", (token) => {

        sendPulse.smtpSendMail(data => {
          console.log(555, data)
        }, email);
      })
    })
    .then(res => {

      console.log(333, res);

      response.send(JSON.stringify({ ok: true }))
    })
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
