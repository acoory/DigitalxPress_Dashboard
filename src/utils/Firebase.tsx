import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

export class FirebaseManager {
  private app: any;
  public messaging: any;

  constructor() {
    this.app = initializeApp({
      apiKey: "AIzaSyCpsEnsZarg0kkL_nGWuPJ190eB3I_SFkA",
      authDomain: "final-epitech.firebaseapp.com",
      projectId: "final-epitech",
      storageBucket: "final-epitech.appspot.com",
      messagingSenderId: "435489977303",
      appId: "1:435489977303:web:ed85c1f786acacf54e9192",
      measurementId: "G-42Z4ZJ2TX7",
    });
    this.messaging = getMessaging(this.app);
  }

  public getToken(setNotifiableToken: any) {
    getToken(this.messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
          setNotifiableToken(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // catch error while creating client token
      });
  }

  public async onMessage(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        onMessage(this.messaging, (payload) => {
          console.log("payload", payload);
          resolve(payload); // Résoudre la promesse avec le payload de la notification
        });
      } catch (error) {
        reject(error); // Rejeter la promesse en cas d'erreur
      }
    });
  }
}
