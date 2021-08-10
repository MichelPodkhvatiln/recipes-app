import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '../config/firebase.config'
import { IFirebaseAPI } from '../interfaces'

firebase.initializeApp(firebaseConfig)

export const FirebaseAPI: IFirebaseAPI = {
  AUTH: firebase.auth(),
  FIRESTORE: firebase.firestore(),
  PERSISTENCE: firebase.auth.Auth.Persistence,
  getServerTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }
}
