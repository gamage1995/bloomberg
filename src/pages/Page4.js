import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from '../components/Header'
const data = require('../../assets/data/data.json')


export default class Page4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0
    };
  }

  async componentDidMount() {
    await this.getFontSizeFromAsyncStorage();
    this.focusListener = await this.props.navigation.addListener('focus', () => {
      this.getFontSizeFromAsyncStorage();
    })
  }

  componentWillUnmount() {
    this.focusListener();
  }

  getFontSizeFromAsyncStorage = async () => {
    try {
      let fontSize = await AsyncStorage.getItem('fontIncrease');
      if (fontSize !== null) {
        this.setState({ fontSizeIncrement: Number(fontSize) })
      }
    } catch (err) {
      console.log(err);
    }
  }

  handleTextSizeChange = (size) => {
    this.setState({ fontSizeIncrement: size })
  }

  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#5C3B96F7' }} />
        <Header
          navigation={this.props.navigation}
          heading={'IMPORTANT POINTS TO REMEMBER WHILE CERTIFYING'}
          handleChange={this.handleTextSizeChange}
        />
        <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
          {data.Page4.data.map((section, index) => {
            return (
              <React.Fragment key={index}>
                <View style={[styles.ContentBodyCover, { borderTopWidth: index == 0 ? 0 : 1 }]}>
                  <View style={styles.ContentBodyCoverInner}>
                    <Text style={[styles.ContentBodyText, {
                      fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
                      lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
                    }]}>{section}</Text>
                  </View>
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
    color: '#383838',
    fontFamily: 'OpenSans-Bold'
  },
  ContentHeadingCover: {
    paddingLeft: WindowWidth / 18,
    paddingTop: WindowWidth / 60,
    paddingBottom: WindowWidth / 60,
    borderLeftWidth: 2,
    borderLeftColor: '#F8A01D',
    marginBottom: WindowHeight / 40
  },
  ContentBodyCover: {
    paddingTop: WindowHeight / 45,
    paddingBottom: WindowHeight / 45,
    borderTopColor: '#e0e0e0',
  },
  ContentBodyCoverInner: {
    paddingTop: WindowHeight / 75,
    paddingBottom: WindowHeight / 75,
    // borderLeftWidth: 4,
    // borderLeftColor: '#F8A01D',
    // paddingLeft : WindowWidth/25
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-SemiBold',
    // marginBottom: WindowWidth / 30
  },
  BottomPadding: {
    height: WindowHeight / 20
  }
})