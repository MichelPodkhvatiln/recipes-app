export function normalizeRecipeDocData(doc) {
  if (!doc) return

  const docData = doc.data()

  const allowedClientDocData = {
    author: docData.author,
    description: docData.description,
    imageUrl: docData.imageUrl,
    ingredients: docData.ingredients,
    name: docData.name
  }

  return {
    id: doc.id,
    ...allowedClientDocData
  }
}
