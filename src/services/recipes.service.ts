import { FirebaseAPI } from '../api/FirebaseAPI'
import {
  FirebaseDocumentData,
  FirebaseDocumentReference,
  FirebaseDocumentSnapshot,
  FirebaseQueryDocumentSnapshot,
  FirebaseQuerySnapshot,
  IRecipesService
} from '../interfaces'

export class RecipesService implements IRecipesService {
  private static instance: RecipesService | undefined

  static getInstance(): RecipesService {
    if (!RecipesService.instance) {
      RecipesService.instance = new RecipesService()
    }

    return RecipesService.instance
  }

  getRecipesListWithPaging(
    limit: number,
    startAfter: FirebaseQueryDocumentSnapshot<FirebaseDocumentData>
  ): Promise<FirebaseQuerySnapshot<FirebaseDocumentData>> {
    if (!startAfter) {
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

  getRecipe(id: string): Promise<FirebaseDocumentSnapshot<FirebaseDocumentData>> {
    return FirebaseAPI.FIRESTORE.collection('recipes').doc(id).get()
  }

  addRecipe(data: FirebaseDocumentData): Promise<FirebaseDocumentReference<FirebaseDocumentData>> {
    const createdAt = FirebaseAPI.getServerTimestamp()

    return FirebaseAPI.FIRESTORE.collection('recipes').add({
      ...data,
      createdAt
    })
  }

  removeRecipe(id: string): Promise<void> {
    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .delete()
  }

  updateRecipe(id: string, data: FirebaseDocumentData): Promise<void> {
    const updatedAt = FirebaseAPI.getServerTimestamp()

    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .update({
        ...data,
        updatedAt
      })
  }
}
