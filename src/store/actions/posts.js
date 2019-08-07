import React from 'react'
import Alert from 'react-native'

import {
  SET_POSTS,
  ADD_COMMENT,
  CREATING_POST,
  POST_CREATED
} from './actionsTypes'

import { setMessage } from './message'
import axios from 'axios'

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost())
    axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-socialfuture-54ddf.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64
      }
    })
      .catch(_err =>
        dispatch(setMessage({
          title: 'Erro',
          text: 'Ocorreu um erro inesperado!'
        })))
      .then(res => {
        post.image = res.data.imageUrl

        axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
          .catch(_err =>
            dispatch(setMessage({
              title: 'Erro',
              text: 'Ocorreu um erro inesperado!'
            })))
          .then(res => {
            dispatch(fetchPosts())
            dispatch(postCreated())
            dispatch(setMessage({
              title: 'Sucesso',
              text: 'Post inserido com sucesso!'
            }))
          })
      })
  }
}

export const addComment = payload => {
  return (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`)
      .catch(_err =>
        dispatch(setMessage({
          title: 'Erro',
          text: 'Ocorreu um erro inesperado!'
        })))
      .then(res => {
        const comments = res.data.comments || []
        comments.push(payload.comment)
        axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
          .catch(_err =>
            dispatch(setMessage({
              title: 'Erro',
              text: 'Ocorreu um erro inesperado!'
            })))
          .then(res => {
            dispatch(fetchPosts())
          })
      })
  }
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const fetchPosts = () => {
  return dispatch => {
    axios.get('/posts.json')
      .catch(err => console.log(err))
      .then(res => {
        const rawPosts = res.data
        const posts = []
        for (const key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key
          })
        }
        dispatch(setPosts(posts.reverse()))
      })
  }
}

export const creatingPost = () => {
  return {
    type: CREATING_POST
  }
}

export const postCreated = () => {
  return {
    type: POST_CREATED
  }
}
