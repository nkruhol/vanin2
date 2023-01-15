import * as functions from "firebase-functions";
import { cors1 } from "..";
import { database } from "../db.config";

export const getSiteOptionsLayout = functions.https.onRequest((request, response) => {

      cors1(request, response, () => {
    
        database.ref("site-options/layout").once('value')
          .then(data => {
    
              response.send(JSON.stringify({ ok: true, data }));
          })
      })
    });

export const updateSiteOptionsLayout = functions.https.onRequest((request, response) => {

      cors1(request, response, () => {

        database.ref('site-options/layout').set(request.body)
            .then(() => {

                response.send(JSON.stringify({ ok: true }));
            }, err => {
    
                response.status(500).send(JSON.stringify({ err }));
            });
      })
    });

export const getSiteOptionsPages = functions.https.onRequest((request, response) => {

      cors1(request, response, () => {

        database.ref("site-options/pages").once('value')
          .then(data => {

              response.send(JSON.stringify({ ok: true, data }));
          })
      })
    });

export const updateSiteOptionsPages = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    database.ref('site-options/pages').set(request.body)
        .then(() => {

            response.send(JSON.stringify({ ok: true }));
        }, err => {

            response.status(500).send(JSON.stringify({ err }));
        });
  })
});