import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  StyleSheet,
  FlatList,
  View
} from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'

import * as postActions from '../store/actions/posts'
import { bindActionCreators } from 'redux'

class Feed extends Component {
    state = { }

  componentDidMount = () => {
    this.props.fetchPosts()
  }

  render () {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) =>
            <Post key={item.id} {...item} /> } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(postActions, dispatch)

const mapStateToProps = ({ posts: { posts } }) => {
  return {
    posts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
