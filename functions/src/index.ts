import * as functions from "firebase-functions";
import * as cors from "cors";
import { database } from "./db.config";
import { sendRegistrationEmail } from "./services/send-emails.service";
import { storage } from './storage.config';

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

    console.log(request.params);

    database.ref("participants-" + request.params[0]).once('value')
      .then(snap => {

          let children: any = [];
          snap.forEach(child_snap => {
              
              children.push({ ...child_snap.val(), id: child_snap.key });
          });

          response.send(JSON.stringify({ ok: true, data: children }));
      })
  })
});

export const getArticle = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    const storageRef = storage.ref();
    
    storageRef.child(request.body.file).getDownloadURL()
      .then((url) => {

        response.send(JSON.stringify({ ok: true, url }));


        // sendRegistrationEmail(request.body)
        // .then(res => {
  
        //   database.ref("participants/" + request.body.id + "/isApproved").set(true);
        //   response.send(JSON.stringify({ ok: true }));
        // }, err => {
  
        //   response.status(500).send(JSON.stringify({ err }));
        // });
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   var blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

        // // Or inserted into an <img> element
        // var img = document.getElementById('myimg');
        // img.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });

  });
})
