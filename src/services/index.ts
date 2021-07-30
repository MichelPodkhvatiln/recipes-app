import { AuthService } from './auth.service'
import { UserService } from './user.service'
import { RecipesService } from './recipes.service'
import { IAppServices } from '../interfaces'

export const services: IAppServices = {
  auth: AuthService.getInstance(),
  user: UserService.getInstance(),
  recipes: RecipesService.getInstance()
}
