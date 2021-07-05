import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,Dimensions,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from '../components/Header'

const data = require('../../assets/data/data.json')

export default class Page7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0
    };
  }
  async componentDidMount() {
    await this.getFontSizeFromAsyncStorage();
    this.focusListener = this.props.navigation.addListener('focus', () => {
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
          heading={'ILL-DEFINED CONDITIONS'}
          handleChange={this.handleTextSizeChange}
        />
        <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
          <View style={styles.ContentBodyCover}>
            <Text style={[
              styles.ContentBodyText,
              {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{data.ILLDEFINED[0]}</Text>
          </View>
          <View style={styles.ContentHeadingCover}>
            <Text style={[
              styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.ILLDEFINED[1]}</Text>
          </View>
          <View style={styles.ContentBodyCover}>
            <Text style={[
              styles.ContentBodyText,
              {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{data.ILLDEFINED[2]}</Text>
          </View>
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
    marginBottom : WindowWidth/40,
    borderLeftWidth: 4,
    borderLeftColor: '#F8A01D'
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 20
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 25
  },
  Button1Cover: {
    marginBottom: WindowHeight / 25
  },
  Button2Cover: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: WindowHeight / 25
  },
  BottomPadding: {
    height: WindowHeight / 20
  },
  ModalCover: {
    height: WindowHeight,
    width: WindowWidth,
    backgroundColor: '#212121e1',
  },
  Image1Cover: {
    width: WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image1: {
    resizeMode: 'contain',
    width: WindowWidth - (2 * WindowWidth / 30),
    height: (WindowWidth - (2 * WindowWidth / 30)) * 1.3,
    alignSelf: 'center'
  },
  CancelButtonCover: {
    position: 'absolute',
    bottom: WindowHeight / 30,
    alignSelf: 'center'
  },
  CancelButton: {
    height: WindowHeight / 12,
    width: WindowHeight / 12,
  }
})