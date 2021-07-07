import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '../config/firebase.config'

firebase.initializeApp(firebaseConfig)

export default class FirebaseAPI {
  static AUTH = firebase.auth()

  static FIRESTORE = firebase.firestore()

  static PERSISTENCE = firebase.auth.Auth.Persistence

  static async createUserProfileDocument(user, additionalData = {}) {
    if (!user) return

    const userRef = FirebaseAPI.FIRESTORE.doc(`users/${user.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
      const { email } = user
      const createdAt = firebase.firestore.FieldValue.serverTimestamp()
      try {
        await userRef.set({
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef
  }

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = FirebaseAPI.AUTH.onAuthStateChanged(userAuth => {
        unsubscribe()
        resolve(userAuth)
      }, reject)
    })
  }

  static async setPersistence(condition = false) {
    return await FirebaseAPI.AUTH.setPersistence(condition ? FirebaseAPI.PERSISTENCE.LOCAL : FirebaseAPI.PERSISTENCE.SESSION)
  }

  static async signIn(email, password) {
    return await FirebaseAPI.AUTH.signInWithEmailAndPassword(email, password)
  }

  static async signUp(email, password) {
    return await FirebaseAPI.AUTH.createUserWithEmailAndPassword(email, password)
  }

  static async signOut() {
    return await FirebaseAPI.AUTH.signOut()
  }
}
