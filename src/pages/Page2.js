import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Header } from '../components/Header'
const data = require('../../assets/data/data.json')


export default class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement : 0
    };
  }

  handleTextSizeChange = (size) => {
    this.setState({fontSizeIncrement : size})
  }

  render() {
    return (
      <React.Fragment>
        <Header 
        navigation={this.props.navigation} 
        heading={'CAUSE OF DEATH & UNDERLYING CAUSE OF DEATH'} 
        handleChange={this.handleTextSizeChange}
        />
        <ScrollView style={styles.Body}>
          {data.page2.data.map(section => {
            return (
              <React.Fragment>
                <View style={styles.ContentHeadingCover}>
                  <Text style={[styles.ContentHeading, {fontSize : (WindowWidth / 23) + this.state.fontSizeIncrement}]}>{section.head}</Text>
                </View>
                <View style={styles.ContentBodyCover}>
                  <Text style={[styles.ContentBodyText,{fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement}]}>{section.body}</Text>
                </View>
              </React.Fragment>
            )
          })}
          <View style={styles.BottomPadding}>

          </View>
        </ScrollView>
      </React.Fragment>
    )
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
    color: '#6C6C6C',
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
    height: WindowHeight / 20
  }
})