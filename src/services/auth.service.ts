import { FirebaseAPI } from '../api/FirebaseAPI'
import { FirebaseUserCredential, IAuthService } from '../interfaces'

export class AuthService implements IAuthService {
  private static instance: AuthService | undefined

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  signIn(email: string, password: string): Promise<FirebaseUserCredential> {
    return FirebaseAPI.AUTH.signInWithEmailAndPassword(email, password)
  }

  signUp(email: string, password: string): Promise<FirebaseUserCredential> {
    return FirebaseAPI.AUTH.createUserWithEmailAndPassword(email, password)
  }

  signOut(): Promise<void> {
    return FirebaseAPI.AUTH.signOut()
  }

  setPersistence(condition: boolean): Promise<void> {
    return FirebaseAPI.AUTH
      .setPersistence(condition
        ? FirebaseAPI.PERSISTENCE.LOCAL
        : FirebaseAPI.PERSISTENCE.SESSION
      )
  }
}
