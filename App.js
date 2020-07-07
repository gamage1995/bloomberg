import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native'
import HomeStack from './navigation/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex : 1}}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
