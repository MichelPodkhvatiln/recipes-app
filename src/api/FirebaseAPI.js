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

  static setPersistence(condition = false) {
    return FirebaseAPI.AUTH
      .setPersistence(condition ? FirebaseAPI.PERSISTENCE.LOCAL : FirebaseAPI.PERSISTENCE.SESSION)
  }

  static signIn(email, password) {
    return FirebaseAPI.AUTH.signInWithEmailAndPassword(email, password)
  }

  static signUp(email, password) {
    return FirebaseAPI.AUTH.createUserWithEmailAndPassword(email, password)
  }

  static signOut() {
    return FirebaseAPI.AUTH.signOut()
  }

  static getRecipesList() {
    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .orderBy('createdAt', 'desc')
      .get()
  }

  static getRecipesListWithPaging(limit, startAfter) {
    if(!startAfter){
      return FirebaseAPI.FIRESTORE
        .collection('recipes')
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get()
    }


    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .orderBy('createdAt', 'desc')
      .startAfter(startAfter)
      .limit(limit)
      .get()
  }

  static getRecipe(id) {
    return FirebaseAPI.FIRESTORE.collection('recipes').doc(id).get()
  }

  static addRecipe(data) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()

    return FirebaseAPI.FIRESTORE.collection('recipes').add({
      createdAt,
      ...data
    })
  }

  static removeRecipe(id) {
    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .delete()
  }

  static updateRecipe(id, updatedData) {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp()

    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .update({
        ...updatedData,
        updatedAt
      })
  }
}
