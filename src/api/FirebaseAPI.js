import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '../config/firebase.config'

firebase.initializeApp(firebaseConfig)

export const FirebaseAPI = {
  AUTH: firebase.auth(),
  FIRESTORE: firebase.firestore(),
  PERSISTENCE: firebase.auth.Auth.Persistence,
  getServerTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }
}
