import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header';
import { FullWidthButton } from '../components/FullWidthButton';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/Case2.png')
const ModalCancel = require('../../assets/modalCancel.png')
const Arrow = require('../../assets/EventArrow.png');
const linkArray = ['FrameAPart1', 'FrameAPart2', 'FrameAPart3'];
export default class Case2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0,
      showModal: false,
      index: 0,
      routes: [
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'APPLICATION' },
      ]
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
  ModalContent = () => {
    return (
      <React.Fragment>
        <ScrollView style={styles.ModalCover}>
          <View style={styles.Image1Cover}>
            <ImageZoom
              cropWidth={WindowWidth}
              cropHeight={WindowHeight}
              imageWidth={WindowWidth - (2 * WindowWidth / 60)}
              imageHeight={(WindowWidth - (2 * WindowWidth / 60)) * 0.4}
            >
              <Image source={Image1} style={styles.Image1} />
            </ImageZoom>
          </View>
          {/* <View style={styles.CancelButtonCover}> */}
          {/* </View> */}
        </ScrollView>
        <TouchableOpacity style={styles.CancelButtonCover} onPress={() => this.setState({ showModal: false })}>
          <Image source={ModalCancel} style={styles.CancelButton} />
        </TouchableOpacity>
      </React.Fragment>
    )
  }

  Event = (index, line1, line2, line3) => {
    return (
      <View style={styles.EventCover} key={index}>
       <View style={[styles.EventArrowCover, {display : index == 0 ? 'none' : 'flex'}]}>
            <Image style={styles.EventArrow} source={Arrow}/>
        </View>
        <View style={styles.EventSectionCover}>
          <Text style={[
            styles.Line3Text,
            {
              fontSize: (WindowWidth / 28) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 28) + this.state.fontSizeIncrement + 10,
              display: line3 != undefined ? 'flex' : 'none'
            }]}>{line3}
          </Text>
          <Text style={[
            styles.Line2Text,
            {
              fontSize: (WindowWidth / 28) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 28) + this.state.fontSizeIncrement + 10
            }]}>{line2}
          </Text>
          <Text style={[
            styles.Line1Text,
            {
              fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 24) + this.state.fontSizeIncrement + 10
            }]}>{line1}
          </Text>
        </View>
      </View>
    )
  }

  handleTextSizeChange = (size) => {
    this.setState({ fontSizeIncrement: size })
  }

  render() {
    const FirstRoute = () => (
      <ScrollView style={styles.Body}>
        <View style={styles.ContentBodyCover}>
          <Text style={[
            styles.ContentBodyText,
            {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{data.Case2.CaseDescription}</Text>
        </View>
        <View style={styles.BottomPadding}>

        </View>
      </ScrollView>
    );

    const SecondRoute = () => (
      <ScrollView style={styles.Body}>
        <View style={styles.ContentHeadingCover}>
          <Text style={[
            styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.Case2.CaseApplication.Heading}
          </Text>
        </View>
        <View style={styles.SectionsWrapper}>
          {
            data.Case2.CaseApplication.Events.map((event, index) => {
              return this.Event(index, event.line1, event.line2, event.line3)
            })
          }
        </View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
          >
            <this.ModalContent />
          </Modal>
          <TouchableOpacity style={styles.Button1Cover} onPress={() => this.setState({ showModal: true })}>
            <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' VIEW CERTIFICATE '} />
          </TouchableOpacity>
        <View style={styles.BottomPadding}>

        </View>
      </ScrollView>
    );

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#F8A01D' }}
        style={{ backgroundColor: 'white' }}
        labelStyle={{ color: '#383838', fontFamily: 'Roboto-Medium' }}
      />
    );
    return (
      <React.Fragment>
        <Header
          navigation={this.props.navigation}
          heading={'CASE EXAMPLE 2'}
          handleChange={this.handleTextSizeChange}
          SubHeader={true}
        />
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={renderScene}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
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

  /** event styles */
  SectionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop : WindowHeight/50,
    paddingBottom : WindowHeight/20
  },
  Line1Text: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-SemiBold',
  },
  Line2Text: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 30
  },
  Line3Text: {
    color: '#d15a52',
    fontFamily: 'OpenSans-SemiBold',
  },
  EventSectionCover: {
    paddingRight: WindowWidth / 20,
    paddingTop: WindowWidth / 25,
    paddingBottom: WindowWidth / 25,
    paddingLeft: WindowWidth / 20,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    borderColor: '#d9d9d9',
    borderWidth: 2
  },
  EventCover : {
    display : 'flex',
    flexDirection : 'column',
    marginTop: WindowHeight / 90,
  },
  EventArrow : {
    height : WindowHeight/30,
    width : WindowHeight/30,
  },
  EventArrowCover : {
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : WindowHeight/90
  },

  /** Modal styles */
  ModalCover: {
    height: WindowHeight,
    width: WindowWidth,
    backgroundColor: '#212121e1',
  },
  Image1Cover: {
    width: WindowWidth,
    height: WindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image1: {
    resizeMode: 'contain',
    width: WindowWidth - (2 * WindowWidth / 60),
    height: (WindowWidth - (2 * WindowWidth / 60)) * 0.4,
    alignSelf: 'center'
  },
  CancelButtonCover: {
    position: 'absolute',
    bottom: WindowHeight/30,
    alignSelf: 'center'
  },
  CancelButton: {
    height: WindowHeight / 12,
    width: WindowHeight / 12,
  },
})
