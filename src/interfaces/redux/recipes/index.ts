import { FirebaseDocumentData, FirebaseQueryDocumentSnapshot } from '../../firebase'

export interface IRecipeEditFormData {
  description: string,
  imageUrl: string,
  ingredients: IRecipeIngredients[],
  name: string
}

export interface IRecipeIngredients {
  name: string,
  amount: string | number,
}

export interface IRecipeData extends IRecipeEditFormData {
  id: string
  author: string,
}

export interface IRecipeState {
  recipesList: IRecipeData[],
  currentRecipe: IRecipeData | null
}

export interface IFetchRecipesListWithPaging {
  hasNextPage: boolean,
  lastQueryDoc: FirebaseQueryDocumentSnapshot<FirebaseDocumentData>,
  docsData: IRecipeData[]
}
