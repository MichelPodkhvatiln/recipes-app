import { FirebaseAPI } from '../api/FirebaseAPI'

export class RecipesService {
  static instance

  static getInstance() {
    if (!RecipesService.instance) {
      RecipesService.instance = new RecipesService()
    }

    return RecipesService.instance
  }

  getRecipesListWithPaging(limit, startAfter) {
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

  getRecipe(id) {
    return FirebaseAPI.FIRESTORE.collection('recipes').doc(id).get()
  }

  addRecipe(data) {
    const createdAt = FirebaseAPI.getServerTimestamp()

    return FirebaseAPI.FIRESTORE.collection('recipes').add({
      createdAt,
      ...data
    })
  }

  removeRecipe(id) {
    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .delete()
  }

  updateRecipe(id, updatedData) {
    const updatedAt = FirebaseAPI.getServerTimestamp()

    return FirebaseAPI.FIRESTORE
      .collection('recipes')
      .doc(id)
      .update({
        ...updatedData,
        updatedAt
      })
  }
}
