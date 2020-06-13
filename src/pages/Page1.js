import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from '../components/Header'

const data = require('../../assets/data/data.json')

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement : 0
    };
  }
  async componentDidMount (){
    await this.getFontSizeFromAsyncStorage();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFontSizeFromAsyncStorage();
    })
  }

  componentWillUnmount () {
    this.focusListener();
  }

  getFontSizeFromAsyncStorage = async() =>{
    try{
      let fontSize = await AsyncStorage.getItem('fontIncrease');
      if(fontSize !== null){
        this.setState({fontSizeIncrement : Number(fontSize)})
      }
    }catch(err){
      console.log(err);
    }
  }

  handleTextSizeChange = (size) => {
    this.setState({fontSizeIncrement : size})
  }

  render() {
    return (
      <React.Fragment>
        <Header 
        navigation={this.props.navigation} 
        heading={'THE IMPORTANCE OF CAUSE OF DEATH CERTIFICATION'}
        handleChange={this.handleTextSizeChange}
        /> 
        <ScrollView style={styles.Body}>
          {data.page1.data.map(section => {
            return (
              <React.Fragment key={section.head}>
                <View style={styles.ContentHeadingCover}>
                  <Text style={[styles.ContentHeading, {fontSize : (WindowWidth / 21) + this.state.fontSizeIncrement}]}>{section.head}</Text>
                </View>
                <View style={styles.ContentBodyCover}>
                  <Text style={[
                    styles.ContentBodyText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.body}</Text>
                </View>
              </React.Fragment>
            )
          })}
          <View style={styles.BottomPadding}>

          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const dimensions = Dimensions.get("window");
const WindowWidth = dimensions.width;
const WindowHeight = dimensions.height;

const styles = StyleSheet.create({
  Body: {
    paddingLeft: WindowWidth / 16,
    paddingRight: WindowWidth / 16,
    paddingTop: WindowHeight / 25,
  },
  ContentHeading: {
    color: '#383838',
    fontFamily: 'OpenSans-Bold'
  },
  ContentHeadingCover: {
    paddingLeft: WindowWidth / 18,
    paddingTop: WindowWidth / 60,
    paddingBottom: WindowWidth / 60,
    borderLeftWidth: 4,
    borderLeftColor: '#F8A01D'
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 15
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 30
  },
  BottomPadding: {
    height : WindowHeight/20
  }
})