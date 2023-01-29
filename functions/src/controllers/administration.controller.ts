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

    Promise.all([
      auth.listUsers(),
      database.ref('users').once('value'),
    ]).then(([userRecords, dbUsers]) => {

      let children: any = [];
      dbUsers.forEach(child_snap => {
          
          children.push({ ...child_snap.val(), id: child_snap.key });
      });

      const users = userRecords.users.map(i => {

        const user = children.filter(j => j.uid == i.uid)[0];
        
        return {
          uid: i.uid,
          email: i.email,
          ...user,
        };
      });

      response.send(JSON.stringify({ ok: true, users }))
    });
  })
});

export const updateUser = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

    const user = request.body;

    database.ref("users/" + request.body.id).set(user)
        .then(() => {

            response.send(JSON.stringify({ ok: true }));
        }, err => {

            response.status(500).send(JSON.stringify({ err }));
        });
  })
});

export const registration = functions.https.onRequest((request, response) => {

  cors1(request, response, () => {

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