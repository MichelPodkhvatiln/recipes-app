import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './containers/app/app.container'
import ErrorBoundary from './components/errorBoundary/errorBoundary.component'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const Root = () => (
  <>
    <CssBaseline />
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </>
)

ReactDOM.render(<Root />, document.getElementById('root'))
