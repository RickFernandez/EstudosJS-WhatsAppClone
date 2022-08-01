import { Firebase } from "../utils/Firebase";
import { Model } from "./model";

export class Chat extends Model {

  constructor() {
    super();
  }

  get users() {
    this._data.users;
  }

  set users(user) {
    this._data.users = user;
  }

  get timeStamp() {
    this._data.timeStamp;
  }

  set timeStamp(timeStamp) {
    this._data.timeStamp = timeStamp;
  }

  static getRef() {
    return Firebase.db().collection('/chats');
  }

  static create(meEmail, contactEmail) {

    let users = {};

    users[btoa(meEmail)] = true;
    users[btoa(contactEmail)] = true;

    return new Promise((s, f) => {

      Chat.getRef().add({

        users,
        timeStamp: new Date()
      
      }).then(doc => {

        Chat.getRef().doc(doc.id).get().then(chat => {

          s(chat);

        }).catch(err => {

          f(err);

        });

      }).catch(err => {

        f(err);

      });

    });

  }

  static find(meEmail, contactEmail) {

    return Chat.getRef()
        .where(btoa(meEmail), '==', true)
        .where(btoa(contactEmail), '==', true)
        .get();

  }

  static createIfNotExists(meEmail, contactEmail) {

    return new Promise((s, f) => {

      Chat.find(meEmail, contactEmail).then(chats => {

        if (chats.empty) {

          Chat.create(meEmail, contactEmail).then(chat => {

            s(chat);

          })

        } else {

          chats.forEach(chat => {

            s(chat);
            
          });

        }

      }).catch (err => {

        f(err)

      });

    });

  }

}