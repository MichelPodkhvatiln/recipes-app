import { FC } from 'react'
import { Container } from '@material-ui/core'
import { Header } from '../../header/header/header.component'
import { AppRouter } from '../../../router'

export const App: FC = () => (
  <>
    <Header />

    <Container component='main'>
      <AppRouter />
    </Container>
  </>
)
