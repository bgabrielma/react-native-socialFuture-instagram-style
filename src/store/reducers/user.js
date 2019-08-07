import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED
} from '../actions/actionsTypes'

const inicialState = {
  name: null,
  email: null,
  isLoading: false,
  token: null
}

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        token: action.payload.token
      }
    case USER_LOGGED_OUT:
      return {
        ...inicialState
      }
    case LOADING_USER:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}

export default reducer
