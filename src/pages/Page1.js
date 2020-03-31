import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
const backgroundImage = require('../../assets/background.png');
import { Accordion } from '../components/Accordion'

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <ImageBackground style={styles.BackgroundImage} source={backgroundImage}>
        <ScrollView style={styles.BackgroundView} contentContainerStyle={styles.CardContainer}>
          <Accordion/>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const WindowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  BackgroundView : {
    flex : 1,
    backgroundColor : '#5C3B96CB', 
  },
  CardContainer : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    paddingTop : WindowHeight/20,
  },
  BackgroundImage : {
    height : '100%',
    width : '100%',
    alignSelf : 'center'
  }
})