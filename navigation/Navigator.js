import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../src/pages/HomePage'
import Page1 from '../src/pages/Page1'
import Page2 from '../src/pages/Page2'
import Page3 from '../src/pages/Page3'

const HomeStackNav = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator initialRouteName="Home">
      <HomeStackNav.Screen 
      name="Home" 
      component={HomePage} 
      options = {{
        headerShown : false
      }}
      />
      <HomeStackNav.Screen
        name='Page1'
        component={Page1}
        options = {{
          headerShown : false
        }}
        />
        <HomeStackNav.Screen
        name='Page2'
        component={Page2}
        options = {{
          headerShown : false
        }}
        />
         <HomeStackNav.Screen
        name='Page3'
        component={Page3}
        options = {{
          headerShown : false
        }}
        />
    </HomeStackNav.Navigator>
  )
}

export default HomeStack;