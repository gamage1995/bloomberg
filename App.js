import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
  }
}
