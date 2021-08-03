import firebase from 'firebase'

export type FirebaseUser = firebase.User

export type FirebaseAuth = firebase.auth.Auth
export type FirebaseUserCredential = firebase.auth.UserCredential

export type FirebaseFirestore = firebase.firestore.Firestore
export type FirebaseFieldValue = firebase.firestore.FieldValue
export type FirebaseDocumentData = firebase.firestore.DocumentData
export type FirebaseQuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>
export type FirebaseQueryDocumentSnapshot<T> = firebase.firestore.QueryDocumentSnapshot<T>
export type FirebaseDocumentSnapshot<T> = firebase.firestore.DocumentSnapshot<T>
export type FirebaseDocumentReference<T> = firebase.firestore.DocumentReference<T>

export interface IFirebaseConfig {
  apiKey: string | undefined,
  authDomain: string | undefined,
  projectId: string | undefined,
  storageBucket: string | undefined,
  messagingSenderId: string | undefined,
  appId: string | undefined
}

export interface IFirebaseAPI {
  AUTH: FirebaseAuth,
  FIRESTORE: FirebaseFirestore,
  PERSISTENCE: {
    LOCAL: string,
    NONE: string,
    SESSION: string,
  },
  getServerTimestamp: () => FirebaseFieldValue
}

