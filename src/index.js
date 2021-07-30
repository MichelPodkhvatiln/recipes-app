import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './redux/store'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppContainer from './containers/app/app.container'
import { ErrorBoundary } from './components/shared/errorBoundary/errorBoundary.component'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const Root = () => (
  <>
    <CssBaseline />
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AppContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </>
)

ReactDOM.render(<Root />, document.getElementById('root'))
