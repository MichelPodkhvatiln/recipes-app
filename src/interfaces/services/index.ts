import {
  FirebaseDocumentData,
  FirebaseDocumentReference,
  FirebaseDocumentSnapshot,
  FirebaseQueryDocumentSnapshot,
  FirebaseQuerySnapshot,
  FirebaseUser,
  FirebaseUserCredential
} from '../firebase'
import { AuthService } from '../../services/auth/auth.service'
import { UserService } from '../../services/user/user.service'
import { RecipesService } from '../../services/recipes/recipes.service'
import { IRecipeEditFormData } from '../redux'

export interface IAppServices {
  auth: AuthService,
  user: UserService,
  recipes: RecipesService
}

export interface IAuthService {
  signIn: (email: string, password: string) => Promise<FirebaseUserCredential>,
  signUp: (email: string, password: string) => Promise<FirebaseUserCredential>,
  signOut: () => Promise<void>,
  setPersistence: (condition: boolean) => Promise<void>
}

export interface IUserService {
  getCurrentUser: () => Promise<FirebaseUser | null>,
  createUserProfileDocument: ({ user, additionalData }: {
    user: FirebaseUser,
    additionalData?: Record<string, any> | Record<string, never>
  }) => Promise<FirebaseDocumentReference<FirebaseDocumentData>>
}

export interface IRecipesService {
  getRecipesListWithPaging: (
    limit: number,
    startAfter: FirebaseQueryDocumentSnapshot<FirebaseDocumentData>
  ) => Promise<FirebaseQuerySnapshot<FirebaseDocumentData>>,
  getRecipe: (id: string) => Promise<FirebaseDocumentSnapshot<FirebaseDocumentData>>,
  addRecipe: (data: IRecipeEditFormData) => Promise<FirebaseDocumentReference<FirebaseDocumentData>>,
  removeRecipe: (id: string) => Promise<void>,
  updateRecipe: (id: string, data: IRecipeEditFormData) => Promise<void>
}
