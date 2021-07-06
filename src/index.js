import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './containers/app/app.container'

const Root = () => (
  <>
    <CssBaseline />

    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  </>
)

ReactDOM.render(<Root />, document.getElementById('root'))
