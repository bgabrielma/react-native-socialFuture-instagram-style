import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED
} from './actionsTypes'

import axios from 'axios'

import { setMessage } from './message'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyBY_Ts_p1zQ2pidSBvdygackysG_6km7lo'

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: ''
  }
}

export const createUser = (user) => {
  return dispatch => {
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
      .catch(_err =>
        dispatch(setMessage({
          title: 'Erro',
          text: `${authBaseURL}/signupNewUser?key=${API_KEY}`
        })))
      .then(res => {
        if (res.data.localId) {
          axios.put(`/users/${res.data.localId}.json`, {
            name: user.name
          })
            .catch(_err =>
              dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
              })))
            .then(() => {
              delete user.password
              user.id = res.data.localId
              dispatch(userLogged(user))
              dispatch(userLoaded())
            })
        }
      })
  }
}

export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export const userLoaded = () => {
  return {
    type: USER_LOADED
  }
}

export const login = user => {
  return dispatch => {
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
      .catch(_err =>
        dispatch(setMessage({
          title: 'Erro',
          text: 'Ocorreu um erro inesperado!'
        })))
      .then(res => {
        if (res.data.localId) {
          user.token = res.data.idToken
          axios.get(`/users/${res.data.localId}.json`)
            .catch(_err =>
              dispatch(setMessage({
                title: 'Erro',
                text: 'Ocorreu um erro inesperado!'
              })))
            .then(res => {
              delete user.password
              user.name = res.data.name
              dispatch(userLogged(user))
              dispatch(userLoaded())
            })
        }
      })
  }
}
