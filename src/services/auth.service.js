import { FirebaseAPI } from '../api/FirebaseAPI'

export class AuthService {
  static instance

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  signIn(email, password) {
    return FirebaseAPI.AUTH.signInWithEmailAndPassword(email, password)
  }

  signUp(email, password) {
    return FirebaseAPI.AUTH.createUserWithEmailAndPassword(email, password)
  }

  signOut() {
    return FirebaseAPI.AUTH.signOut()
  }

  setPersistence(condition = false) {
    return FirebaseAPI.AUTH
      .setPersistence(condition ? FirebaseAPI.PERSISTENCE.LOCAL : FirebaseAPI.PERSISTENCE.SESSION)
  }
}
