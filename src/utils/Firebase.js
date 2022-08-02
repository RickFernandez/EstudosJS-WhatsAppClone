/**
 * Conexão com Firebase
 *-------- original do curso
const firebase = require('firebase');
require('firebase/firestore');
 *---------
*/
/** https://firebase.google.com/docs/web/setup?hl=pt-br#aplicativos-node.js*/
import firebase from 'firebase/app'
// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

export class Firebase {

    constructor() {

        this.init();

    }

    init(){

        if (!window._initializedFirebase) {

            firebase.initializeApp({
                apiKey: 'AIzaSyAjKOJISbG6ZoAOrZdC44JHDalRPLKJXGI',
                authDomain: 'whatsapp-clone-a0aaf.firebaseapp.com',
                projectId: 'whatsapp-clone-a0aaf',
                storageBucket: 'gs://whatsapp-clone-a0aaf.appspot.com/',
            });

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }

    initAuth(){

        return new Promise((resolve, reject)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve(user, token);

            }).catch(function (error) {

                reject(error);

            });

        });        

    }

    static db(){

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}