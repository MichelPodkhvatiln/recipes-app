import { FirebaseAPI } from '../api/FirebaseAPI'
import { FirebaseDocumentData, FirebaseDocumentReference, FirebaseUser, IUserService } from '../interfaces'

export class UserService implements IUserService {
  private static instance: UserService | undefined

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }

    return UserService.instance
  }

  getCurrentUser(): Promise<FirebaseUser | null> {
    return new Promise<FirebaseUser | null>((resolve, reject) => {
      const unsubscribe = FirebaseAPI.AUTH.onAuthStateChanged(userAuth => {
        unsubscribe()
        resolve(userAuth)
      }, reject)
    })
  }

  async createUserProfileDocument(
    {
      user,
      additionalData
    }: {
      user: FirebaseUser,
      additionalData?: Record<string, any> | Record<string, never>
    }): Promise<FirebaseDocumentReference<FirebaseDocumentData>> {
    const userRef = FirebaseAPI.FIRESTORE.doc(`users/${user.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
      const { email } = user
      const createdAt = FirebaseAPI.getServerTimestamp()
      try {
        await userRef.set({
          email,
          createdAt,
          ...(additionalData || {})
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef
  }
}
