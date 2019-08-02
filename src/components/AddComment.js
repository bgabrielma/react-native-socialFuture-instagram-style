import React, { Component } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback as TWF,
  Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

class AddComment extends Component {
    state = {
      comment: '',
      editMode: false
    }

    handleAddComment = () => {
      Alert.alert('Adicionado!', this.state.comment)
    }

    render () {
      let commentArea = null
      if (this.state.editMode) {
        commentArea = (
          <View style={styles.container}>
            <TextInput
              placeholder='Pode comentar...'
              style={styles.input}
              autoFocus={true}
              value={this.state.comment}
              onChangeText={comment => this.setState({ comment })}
              onSubmitEditing={this.handleAddComment}
            />
            <TWF onPress={() => this.setState({ editMode: false })}>
              <Icon name='times' size={15} color='#555' />
            </TWF>
          </View>
        )
      } else {
        commentArea = (
          <TWF onPress={() => this.setState({ editMode: true })}>
            <View style={styles.container}>
              <Icon name='comment-o' size={25} color='#555' />
              <Text style={styles.caption}>Adicione um comentário</Text>
            </View>
          </TWF>
        )
      }
      return <View style={{ flex: 1 }}>{commentArea}</View>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  caption: {
    marginLeft: 10,
    fontSize: 12,
    color: '#CCC',
    backgroundColor: 'rgba(1,1,1,0.024)',
    padding: 5,
    borderRadius: 3,
    width: '90%'
  },
  input: {
    width: '90%',
    marginRight: 10,
    color: '#CCC',
    backgroundColor: 'rgba(66, 134, 244, 0.05)',
    borderRadius: 30,
    padding: 10
  }
})

export default AddComment
