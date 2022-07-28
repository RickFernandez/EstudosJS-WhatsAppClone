const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._firebaseConfig = {
            
          };

        this.init();

    }

    init() {

        if (!this._initialized) {

            // Initialize Firebase
            firebase.initializeApp(this._firebaseConfig);

            // Faz com que o programa fique contanstemente de olho no Firebase
            firebase.firestore().settings({
                
                timestampsInSnapshots: true

            });

            this._initialized = true;
        }
    }
    

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}