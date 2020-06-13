import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../src/pages/HomePage'
import Page1 from '../src/pages/Page1'
import Page2 from '../src/pages/Page2'
import Page3 from '../src/pages/Page3'
import FrameA from '../src/pages/FrameA'
import FrameAPart1 from '../src/pages/FrameAPart1'
import FrameAPart2 from '../src/pages/FrameAPart2'
import FrameAPart3 from '../src/pages/FrameAPart3'
import Page4 from '../src/pages/Page4'
import Case1 from '../src/pages/Case1'
import Case2 from '../src/pages/Case2'
const HomeStackNav = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator initialRouteName="Home">
      <HomeStackNav.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Page1'
        component={Page1}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Page2'
        component={Page2}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Page3'
        component={Page3}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='FrameA'
        component={FrameA}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='FrameAPart1'
        component={FrameAPart1}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='FrameAPart2'
        component={FrameAPart2}
        options={{
          headerShown: false
        }}
      />
       <HomeStackNav.Screen
        name='FrameAPart3'
        component={FrameAPart3}
        options={{
          headerShown: false
        }}
      />
       <HomeStackNav.Screen
        name='Page4'
        component={Page4}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Case1'
        component={Case1}
        options={{
          headerShown: false
        }}
      />
       <HomeStackNav.Screen
        name='Case2'
        component={Case2}
        options={{
          headerShown: false
        }}
      />
    </HomeStackNav.Navigator>
  )
}

export default HomeStack;