import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { RecipesService } from './recipes.service'

export const services = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  recipes: RecipesService.getInstance()
}
