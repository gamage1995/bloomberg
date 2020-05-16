import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
const backgroundImage = require('../../assets/background.png');
import { Accordion } from '../components/Accordion';
const data = require('../../assets/data/data.json')

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    // const accordions = []
    // for(let topic of data.page1.data){
    //   accordions.push(<Accordion header={topic.head} body={topic.body}/>)
    // }
    return (
      <ImageBackground style={styles.BackgroundImage} source={backgroundImage}>
        <ScrollView style={styles.BackgroundView} contentContainerStyle={styles.CardContainer}>
          {/* {accordions} */}
          {data.page1.data.map(function(topic, index){
            return <Accordion header={topic.head} body={topic.body} key={index}/>
          })}
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
    flexDirection : "column",
    alignItems : 'center',
    paddingTop : WindowHeight/20,
  },
  BackgroundImage : {
    height : '100%',
    width : '100%',
    alignSelf : 'center'
  }
})