import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../src/pages/HomePage'
import Page1 from '../src/pages/Page1'
import Page2 from '../src/pages/Page2'
import Page3 from '../src/pages/Page3'
import FrameA from '../src/pages/FrameA'
import FrameB from '../src/pages/FrameB'
import FrameAPart1 from '../src/pages/FrameAPart1'
import FrameAPart2 from '../src/pages/FrameAPart2'
import FrameAPart3 from '../src/pages/FrameAPart3'
import FrameBPart1 from '../src/pages/FrameBPart1'
import FrameBPart2 from '../src/pages/FrameBPart2'
import FrameBPart3 from '../src/pages/FrameBPart3'
import FrameBPart4 from '../src/pages/FrameBPart4'
import FrameBPart5 from '../src/pages/FrameBPart5'
import Page4 from '../src/pages/Page4'
import Case1 from '../src/pages/Case1'
import Case2 from '../src/pages/Case2'
import Page6 from '../src/pages/Page6'
import Exercise from '../src/pages/Exercise'
import Page5 from '../src/pages/Page5'
import SpecialCase1 from '../src/pages/SpecialCase1'
import SpecialCase2 from '../src/pages/SpecialCase2'
import SpecialCase3 from '../src/pages/SpecialCase3'
import SpecialCase4 from '../src/pages/SpecialCase4'

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
        name='FrameB'
        component={FrameB}
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
        name='FrameBPart1'
        component={FrameBPart1}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='FrameBPart2'
        component={FrameBPart2}
        options={{
          headerShown: false
        }}
      />
       <HomeStackNav.Screen
        name='FrameBPart3'
        component={FrameBPart3}
        options={{
          headerShown: false
        }}
      />
       <HomeStackNav.Screen
        name='FrameBPart4'
        component={FrameBPart4}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='FrameBPart5'
        component={FrameBPart5}
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
      <HomeStackNav.Screen
        name='Page5'
        component={Page5}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='SpecialCase1'
        component={SpecialCase1}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='SpecialCase2'
        component={SpecialCase2}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='SpecialCase3'
        component={SpecialCase3}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='SpecialCase4'
        component={SpecialCase4}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Page6'
        component={Page6}
        options={{
          headerShown: false
        }}
      />
      <HomeStackNav.Screen
        name='Exercise'
        component={Exercise}
        options={{
          headerShown: false
        }}
      />
    </HomeStackNav.Navigator>
  )
}

export default HomeStack;