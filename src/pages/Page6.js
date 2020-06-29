import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header'
import { FullWidthButton } from '../components/FullWidthButton'
const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/Image1.png')
const ModalCancel = require('../../assets/modalCancel.png')
const Arrow = require('../../assets/arrowDark.png')

export default class Page6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0,
      showModal: false
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
  Section = (heading,nextLink,index) => {
    return (
      <TouchableOpacity key={heading} style={styles.SectionCover} onPress={() => this.props.navigation.navigate(nextLink,{index})}>
        <View style={styles.SectionTextCover}>
          <Text style={[
            styles.ContentHeading,
            {
              fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 24) + this.state.fontSizeIncrement + 8
            }]}>{heading}
          </Text>
        </View>
        <View style={styles.SectionArrowCover}>
          <Image source={Arrow} style={styles.SectionArrow} />
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <React.Fragment>
        <Header
          navigation={this.props.navigation}
          heading={'CASE EXERCISES'}
          handleChange={this.handleTextSizeChange}
          SubHeader={false}
        />
        <ScrollView style={styles.Body}>
          <View style={styles.SectionsWrapper}>
            {
              data.Page6.Data.map((section,index) => {
                return this.Section(section,'Exercise',index)
              })
            }
          </View>
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
    color: '#5e5e5e',
    fontFamily: 'OpenSans-Bold'
  },
  ContentHeadingCover: {
    paddingLeft: WindowWidth / 18,
    paddingTop: WindowWidth / 60,
    paddingBottom: WindowWidth / 60,
    borderLeftWidth: 4,
    borderLeftColor: '#F8A01D',
    marginBottom: WindowHeight / 40
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 20
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
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
  SectionsWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  SectionCover: {
    paddingRight: WindowWidth / 40,
    paddingTop : WindowWidth/20,
    paddingBottom : WindowWidth/20,
    paddingLeft : WindowWidth/20,
    width: '100%',
    backgroundColor: '#ebebeb',
    borderLeftWidth : 2,
    borderLeftColor : '#F8A01D',
    marginTop: WindowHeight / 30,
    borderRadius: 10,
    display : 'flex',
    flexDirection : 'row'
  },
  SectionTextCover : {
    flex : 7,
    justifyContent : 'center',
    alignItems : 'flex-start'
  },
  SectionArrowCover : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'flex-end',
    // backgroundColor : 'blue',
    padding : 0
  },
  SectionArrow : {
    width : WindowWidth/20,
    height : WindowWidth/20,
  }
})
