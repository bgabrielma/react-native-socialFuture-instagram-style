import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'

const MenuRoutes = {
  Feed: {
    name: 'Feed',
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='home' size={30} color={tintColor} />
    }
  },
  Add: {
    name: 'AddPhoto',
    screen: AddPhoto,
    navigationOptions: {
      title: 'Picture',
      tabBarIcon: ({ tintColor, focused }) =>
        <View style={{ margin: 0, padding: 0 }} style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: tintColor,
          position: 'absolute',
          padding: 13,
          color: '#FFF',
          borderRadius: 50,
          top: focused ? -28 : -33,
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 10
        }}>
          <Icon name='camera' size={30} color='#FFF'/>
        </View>
    }
  },
  Profile: {
    name: 'Profile',
    screen: Feed,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor }) =>
        <Icon name='user' size={30} color={tintColor} />
    }
  }
}

const MenuConfig = {
  initialRouteName: 'Feed',
  tabBarOptions: {
    allowFontScaling: true,
    showLabel: true
  }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)

export default createAppContainer(MenuNavigator)
