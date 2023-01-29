import * as functions from "firebase-functions";
import { cors1 } from "..";
import { database } from "../init";

export const getSiteOptions = functions.https.onRequest((request, response) => {

      cors1(request, response, () => {

        Promise.all([
          database.ref("site-options").once('value'),
          request.query?.uid
            ? database.ref("users")
              .orderByChild('uid')
              .startAt(request.query.uid as string)
              .endAt(request.query.uid as string)
              .once('value')
            : Promise.resolve(null) as any,
        ])
          .then(([data, dbUsers]) => {

              if (dbUsers) {
                const users = dbUsers.val();
                const keys = Object.keys(users);
                
                const user = users[keys[0]];

                response.send(JSON.stringify({ ok: true, data, user }));
                return;
              }
    
              response.send(JSON.stringify({ ok: true, data }));
          })
      })
    });

