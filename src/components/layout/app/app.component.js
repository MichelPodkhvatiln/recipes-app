import { Container } from '@material-ui/core'
import Header from '../../header/header/header.component'
import AppRouter from '../../../router'

const App = () => (
  <>
    <Header />

    <Container component='main'>
      <AppRouter />
    </Container>
  </>
)

export default App
