export interface IAuthFormData {
  email: string,
  password: string,
  rememberMe: boolean
}

export interface ICurrentUser {
  id: string,
  email: string
}

export interface IUserState {
  currentUser: ICurrentUser | null
}
