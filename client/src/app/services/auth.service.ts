import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { environment } from 'src/environments/environment';
import { ExtendStateAction } from "../storage/app/app.actions";
import { IStore } from "../storage/store";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private store: Store<IStore>,
    private http: HttpClient,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));

        this.store.dispatch(ExtendStateAction({ newState: { isUserLogged: true }}));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
        this.store.dispatch(ExtendStateAction({ newState: { isUserLogged: true }}));
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      // this.router.navigate(['sign-in']);
      this.store.dispatch(ExtendStateAction({ newState: { isUserLogged: false }}));
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user - ", user);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  getUser() {

    return JSON.parse(localStorage.getItem('user'));
  }

  SignUp(email, password) {

    return this.http.post(environment.api + "/registration", { email, password})
  }
}
