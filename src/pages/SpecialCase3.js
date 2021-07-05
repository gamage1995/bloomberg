import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView,Dimensions, TouchableOpacity, Modal,Image,SafeAreaView } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header';
import { FullWidthButton } from '../components/FullWidthButton';
import { TabView,TabBar } from 'react-native-tab-view';

const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/specialCase3.png')
const ModalCancel = require('../../assets/modalCancel.png')
const Arrow = require('../../assets/EventArrow.png');
export default class SpecialCase3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0,
      showModal: false,
      index: 0,
      routes: [
        { key: 'first', title: 'EXPLAINATION' },
        { key: 'second', title: 'EXAMPLE' },
        { key: 'third', title: 'APPLICATION' },
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
              imageHeight={(WindowWidth - (2 * WindowWidth / 60)) * 0.7}
            >
              <Image source={Image1} style={styles.Image1} />
            </ImageZoom>
          </View>
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
        <View style={[styles.EventArrowCover, { display: index == 0 || line2 == 'Contributory cause' ? 'none' : 'flex' }]}>
          <Image style={styles.EventArrow} source={Arrow} />
        </View>
        <View style={[styles.EventSectionCover, {marginTop : line2 == 'Contributory cause' ? WindowHeight / 30 : 0}]}>
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
              lineHeight: (WindowWidth / 28) + this.state.fontSizeIncrement + 10,
              display: line2 != undefined ? 'flex' : 'none'
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

  FirstRoute = () => {
    return (
      <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
        <View style={styles.ContentBodyCover}>
          <Text style={[
            styles.ContentBodyText,
            {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{data.SpecialCases[2].CaseDescription}</Text>
        </View>
        <View style={styles.BottomPadding}>
  
        </View>
      </ScrollView>
    )
  };

  SecondRoute = () => {
      return(
        <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
        <View style={styles.ContentBodyCover}>
          <Text style={[
            styles.ContentBodyText,
            {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{data.SpecialCases[2].CaseExample}</Text>
        </View>
        <View style={styles.BottomPadding}>
  
        </View>
      </ScrollView>
      )
  }

  ThirdRoute = () => {
    return (
      <ScrollView style={styles.Body} showsVerticalScrollIndicator={false}>
        <View style={styles.ContentHeadingCover}>
          <Text style={[
            styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.SpecialCases[0].CaseApplication.Heading}
          </Text>
        </View>
        <View style={styles.SectionsWrapper}>
          {
            data.SpecialCases[2].CaseApplication.Events.map((event, index) => {
              return this.Event(index, event.line1, event.line2, event.line3)
            })
          }
        </View>
        <TouchableOpacity style={styles.Button1Cover} onPress={() => this.setState({ showModal: true })}>
          <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' VIEW CERTIFICATE '} />
        </TouchableOpacity>
        <View style={styles.BottomPadding}>
  
        </View>
      </ScrollView>
    )
  };


  render() {
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
      <SafeAreaView style={{ flex: 0, backgroundColor: '#5C3B96F7' }} />
        <Header
          navigation={this.props.navigation}
          heading={data.SpecialCases[2].Title.toUpperCase()}
          handleChange={this.handleTextSizeChange}
          SubHeader={true}
        />
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'first':
                return <this.FirstRoute />
              case 'second':
                return <this.SecondRoute />
              case 'third':
                return <this.ThirdRoute />
              default:
                return null;
            }
          }}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <this.ModalContent />
        </Modal>
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
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 20
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
  EventCover: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: WindowHeight / 90,
  },
  EventArrow: {
    height: WindowHeight / 30,
    width: WindowHeight / 30,
  },
  EventArrowCover: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: WindowHeight / 90
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
    height: (WindowWidth - (2 * WindowWidth / 60)) * 0.7,
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
  },
})
