import * as functions from "firebase-functions";
import { cors1 } from "..";
import { database } from "../init";

export const getSiteOptions = functions.https.onRequest((request, response) => {

      cors1(request, response, () => {
    
        database.ref("site-options").once('value')
          .then(data => {
    
              response.send(JSON.stringify({ ok: true, data }));
          })
      })
    });

