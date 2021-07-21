import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import { persistor, store } from './redux/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './containers/app/app.container'
import ErrorBoundary from './components/errorBoundary/errorBoundary.component'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const Root = () => (
  <>
    <CssBaseline />

    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <ErrorBoundary>
            <AppContainer />
          </ErrorBoundary>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </>
)

ReactDOM.render(<Root />, document.getElementById('root'))
