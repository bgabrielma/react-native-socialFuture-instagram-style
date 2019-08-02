import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Alert
} from 'react-native'

import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'

const getWidth = () => {
  return Dimensions.get('window').width
}
class Post extends Component {
    state = {
      width: getWidth(),
      height: getWidth() * 4 / 6
    }

    render () {
      const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        image: {
          width: this.state.width,
          height: this.state.height,
          resizeMode: 'contain'
        }
      })

      Dimensions.addEventListener('change', () => {
        this.setState({
          width: getWidth(),
          height: getWidth() * 4 / 6
        })
      })

      return (
        <View style={styles.container}>
          <Image
            source={this.props.image}
            style={styles.image} />
          <Author
            email={this.props.emai}
            nickname={this.props.nickname}/>
          <Comments
            comments={this.props.comments} />
          <AddComment />
        </View>
      )
    }
}

export default Post
