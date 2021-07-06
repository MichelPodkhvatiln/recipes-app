import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '../config/firebase.config'

firebase.initializeApp(firebaseConfig)

export const createUserProfileDocument = async (user, additionalData = {}) => {
  if (!user) return

  const userRef = firestore.doc(`users/${user.uid}`)

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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const Persistence = firebase.auth.Auth.Persistence

export default firebase
