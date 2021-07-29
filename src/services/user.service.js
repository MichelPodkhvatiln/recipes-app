import { FirebaseAPI } from '../api/FirebaseAPI'
import firebase from 'firebase'

export class UserService {
  static instance

  static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = FirebaseAPI.AUTH.onAuthStateChanged(userAuth => {
        unsubscribe()
        resolve(userAuth)
      }, reject)
    })
  }

  async createUserProfileDocument(user, additionalData = {}) {
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
}
