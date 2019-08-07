import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import user from './reducers/user'
import posts from './reducers/posts'
import message from './reducers/message'

const reducers = combineReducers({
  user,
  posts,
  message
})

const storeConfig = () => {
  return createStore(reducers,
    compose(applyMiddleware(thunk))
  )
}

export default storeConfig
