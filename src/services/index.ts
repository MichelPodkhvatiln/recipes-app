import { AuthService } from './auth/auth.service'
import { UserService } from './user/user.service'
import { RecipesService } from './recipes/recipes.service'
import { IAppServices } from '../interfaces'

export const services: IAppServices = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  recipes: RecipesService.getInstance()
}
