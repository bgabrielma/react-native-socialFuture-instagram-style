import React from 'react'
import { Provider } from 'react-redux'
import storeConfig from './src/store/storeConfig'

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import App from './src/App'

import axios from 'axios'
axios.defaults.baseURL = 'https://socialfuture-54ddf.firebaseio.com/'

const store = storeConfig()
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Main)
