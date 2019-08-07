import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      const addComment = this.props.name
        ? <AddComment postId={this.props.id} /> : null

      const styles = StyleSheet.create({
        container: {
          flex: 1
        },
        image: {
          width: this.state.width,
          height: this.state.height,
          resizeMode: 'cover'
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
            source={{ uri: `${this.props.image}` }}
            style={styles.image} />
          <Author
            email={this.props.emai}
            nickname={this.props.nickname} />
          <Comments
            comments={this.props.comments} />
          {addComment}
        </View>
      )
    }
}

const mapStateToProps = ({ user }) => {
  return {
    name: user.name
  }
}

export default connect(mapStateToProps)(Post)
