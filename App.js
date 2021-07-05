import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import HomeStack from './navigation/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    SplashScreen.hide();
  }

  render() {
    return (
      <React.Fragment>
          <NavigationContainer>
            <HomeStack />
          </NavigationContainer>
      </React.Fragment>
    );
  }
}
