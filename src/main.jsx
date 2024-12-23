import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { Provider } from 'react-redux'
import reduxStore from './redux/configureStore.js'


createRoot(document.getElementById('root')).render(
  <>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </>,
)
