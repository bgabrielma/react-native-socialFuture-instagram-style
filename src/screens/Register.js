import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'

import { connect } from 'react-redux'
import * as userActions from '../store/actions/user'
import { bindActionCreators } from 'redux'

class Register extends Component {
    state = {
      name: '',
      email: '',
      password: ''
    }

    componentDidUpdate = prevProps => {
      if (prevProps.isLoading && !this.props.isLoading) {
        this.setState({
          name: '',
          email: '',
          password: ''
        })

        this.props.navigation.navigate('Profile')
      }
    }

    render () {
      const isValid = this.state.password.length >= 6

      return (
        <View style={styles.container}>
          <TextInput placeholder='Nome'
            style={styles.input}
            autoFocus={true}
            value={this.state.name}
            onChangeText={name => this.setState({ name })} />

          <TextInput placeholder='Email'
            style={styles.input}
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })} />

          <TextInput placeholder='Password'
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password => this.setState({ password })} />

          <TouchableOpacity
            onPress={() => this.props.createUser(this.state)}
            style={[styles.button, !isValid ? { backgroundColor: '#AAA' } : null]}
            disabled={!isValid}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF'
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#eee',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    paddingLeft: 15
  }
})

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
