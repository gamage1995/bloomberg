import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,Dimensions, Image,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Header } from '../components/Header'

const data = require('../../assets/data/data.json')
const logo = require('../../assets/bloomberg.png');
const uniMelbLogo = require('../../assets/unimelbLogo2.png');

export default class Page9 extends Component {
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
          heading={'ABOUT APPLICATION'}
          handleChange={this.handleTextSizeChange}
          SubHeader={true}
        />
        <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
          <React.Fragment>
            <View style={[styles.ContentBodyCover, {marginTop : WindowHeight/80}]}>
              <Text style={[styles.ContentHeading, { fontSize: (WindowWidth / 22) + this.state.fontSizeIncrement }]}>
              {"This application guides doctors worldwide in correctly filling out death certificates"}
              </Text>
            </View>
            <View style={styles.UniMelbLogoCover}>
              <Image source={uniMelbLogo} style={styles.UniMelbLogo}/>
            </View>
            <View style={styles.ContentBodyCover,{marginBottom : WindowHeight/60}}>
              <Text style={[styles.ContentHeading, { 
                fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 8
                 }]}>
              {"Published by the University of Melbourne, Civil Registration and Vital Statistics Improvement, Bloomberg Philanthropies Data for Health Initiative."}
              </Text>
            </View>
            <View style={styles.ContentBodyCover}>
              <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"Melbourne School of Population and Global Health Building 379,"}</Text>
                <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"207 Bouverie Street,"}</Text>
                <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"Carlton, VIC 3053"}</Text>
                <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"Australia"}</Text>
                <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"CRVS-info@unimelb.edu.au"}</Text>
                <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"www.mspgh.unimelb.edu.au/dataforhealth"}</Text>
            </View>
            <View style={styles.UniMelbLogoCover}>
              <Image source={logo} style={styles.UniMelbLogo}/>
            </View>
            <View style={styles.ContentBodyCover,{marginBottom : WindowHeight/60, marginTop : WindowHeight/80}}>
              <Text style={[styles.ContentHeading, { 
                fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 8
                 }]}>
              {"Made possible through funding from Bloomberg Philanthropies"}
              </Text>
            </View>
            <View style={styles.ContentBodyCover}>
              <Text style={[
                styles.ContentBodyText,
                {
                  fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
                  lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 4
                }]}>{"www.bloomberg.org"}</Text>
            </View>
          </React.Fragment>
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
    fontFamily: 'OpenSans-SemiBold'
  },
  ContentHeadingCover: {
    paddingLeft: WindowWidth / 18,
    paddingTop: WindowWidth / 60,
    paddingBottom: WindowWidth / 60,
    borderLeftWidth: 4,
    borderLeftColor: '#F8A01D'
  },
  ContentBodyCover: {
    // marginTop: WindowWidth / 20,
    // marginBottom: WindowWidth / 15
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 60
  },
  BottomPadding: {
    height: WindowHeight / 10
  },
  UniMelbLogoCover : {
    width : '100%',
    height : WindowHeight/8,
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : WindowHeight/60
  },
  UniMelbLogo : {
    height : WindowHeight/20,
    resizeMode : 'contain',
  }
})