import React, { Component } from 'react'
import { Alert } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as messageActions from './store/actions/message'

import Navigator from './Navigator'

class App extends Component {
    componentDidUpdate = () => {
      if (this.props.text && this.props.text.toString().trim()) {
        Alert.alert(this.props.title || 'Mensagem', this.props.text.toString())
        this.props.setMessage({ title: '', text: '' })
      }
    }

    render () {
      return (
        <Navigator />
      )
    }
}

const mapStateToProps = ({ message }) => {
  return {
    title: message.title,
    text: message.text
  }
}

const mapDisptachToProps = dispatch =>
  bindActionCreators(messageActions, dispatch)

export default connect(mapStateToProps, mapDisptachToProps)(App)
