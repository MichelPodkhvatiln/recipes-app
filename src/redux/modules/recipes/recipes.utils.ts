import {
  FirebaseDocumentData,
  FirebaseDocumentSnapshot,
  FirebaseQueryDocumentSnapshot,
  IRecipeData
} from '../../../interfaces'

type IAllowedClientData = Omit<IRecipeData, 'id'>

export function normalizeRecipeDocData(
  doc: FirebaseQueryDocumentSnapshot<FirebaseDocumentData> | FirebaseDocumentSnapshot<FirebaseDocumentData>): IRecipeData {
  const docData = doc.data()

  const allowedClientDocData: IAllowedClientData = {
    author: docData?.author,
    description: docData?.description,
    imageUrl: docData?.imageUrl,
    ingredients: docData?.ingredients,
    name: docData?.name
  }

  return {
    id: doc.id,
    ...allowedClientDocData
  }
}
