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
    this._firebaseConfig = {
      apiKey: 'AIzaSyAjKOJISbG6ZoAOrZdC44JHDalRPLKJXGI',
      authDomain: 'whatsapp-clone-a0aaf.firebaseapp.com',
      projectId: 'whatsapp-clone-a0aaf',
      storageBucket: 'whatsapp-clone-a0aaf.appspot.com',
      messagingSenderId: '565744249453',
      appId: '1:565744249453:web:c314c77c0c36593a94ed64'
    }

    this.init()
  }

  init() {
    if (!window._initializedFirebase) {
      // Initialize Firebase
      firebase.initializeApp(this._firebaseConfig)

      // Faz com que o programa fique contanstemente de olho no Firebase
      firebase.firestore().settings({
        timestampsInSnapshots: true
      })

      window._initializedFirebase = true
    }
  }

  static db() {
    return firebase.firestore()
  }

  static hd() {
    return firebase.storage()
  }

  initAuth() {
    return new Promise((res, rej) => {
      let provider = new firebase.auth.GoogleAuthProvider()

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken
          let user = result.user

          res({
            user,
            token
          })
        })
        .catch(err => {
          rej(err)
        })
    })
  }
}
