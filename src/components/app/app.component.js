import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Header from '../header/header.component'
import AppRouter from '../../router'

const App = () => (
  <Router>
    <Header />
    <Container component='main'>
      <AppRouter />
    </Container>
  </Router>
)

export default App
