import * as functions from "firebase-functions";
import { cors1 } from "..";
import { auth, database } from "../init";

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

export const getUsers = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    auth.listUsers().then(userRecords => {

      userRecords.users.forEach((user) => console.log(user.toJSON()));

      const users = userRecords.users.map(i => ({
        uid: i.uid,
        email: i.email,
      }))
      response.send(JSON.stringify({ ok: true, users }))
    });
  })
});

export const registration = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    console.log('-----hello workd======', request.body);

    auth.createUser(request.body)
      .then(newUser => {

        console.log(newUser);
        return database.ref("users").push({
          email: newUser.email,
          uid: newUser.uid,
        })
      })
      .then(() => {
        response.send(JSON.stringify({ ok: true }));
      })
      .catch(err => { response.status(500).send(JSON.stringify({ err })); });
  })
});