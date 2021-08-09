import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../interfaces'

export const useAppDispatch = () => useDispatch<AppDispatch>()
