import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'

import App from './components/app/App'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <>
    <CssBaseline />

    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
)
