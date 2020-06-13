import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header'
import { FullWidthButton } from '../components/FullWidthButton'
const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/FrameBPart2.png')
const ModalCancel = require('../../assets/modalCancel.png')

export default class FrameBPart2 extends Component {
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
  ModalContent = () => {
    return (
      <React.Fragment>
        <ScrollView style={styles.ModalCover}>
          <View style={styles.Image1Cover}>
            <ImageZoom
              cropWidth={WindowWidth}
              cropHeight={WindowHeight}
              imageWidth={WindowWidth - (2 * WindowWidth / 60)}
              imageHeight={(WindowWidth - (2 * WindowWidth / 60)) * 0.24}
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

  render() {
    return (
      <React.Fragment>
        <Header
          navigation={this.props.navigation}
          heading={'FRAME B - SECTION 2'}
          handleChange={this.handleTextSizeChange}
          SubHeader={true}
        />
        <ScrollView style={styles.Body} stickyHeaderIndices={[1]}>
          <View style={styles.ContentHeadingCover}>
            <Text style={[
              styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.FrameB.sections[1]}
            </Text>
          </View>
          <TouchableOpacity style={styles.Button1Cover} onPress={() => this.setState({ showModal: true })}>
            <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' VIEW SECTION '} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
          >
            <this.ModalContent />
          </Modal>
          {/* <View style={styles.ContentBodyCover}>
            <Text style={[
              styles.ContentHeading, { fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement }]}>{"How to fill Part 1"}
            </Text>
          </View> */}
          <View style={styles.BodyContentWrapper}>
            {
              data.FrameBPart2.data.map((section, index) => {
                return (
                  <React.Fragment key={index}>
                    <View style={[styles.ContentSubHeadingCover, {display: section.head == undefined ? 'none' : 'flex'}]}>
                      <Text style={[
                        styles.ContentHeading,
                        {
                          fontSize: (WindowWidth / 22) + this.state.fontSizeIncrement,
                          lineHeight: (WindowWidth / 22) + this.state.fontSizeIncrement + 8,
                        }]}>{section.head}</Text>
                    </View>
                    <View >
                      <Text style={[
                        styles.ContentBodyText,
                        {
                          fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                          lineHeight: (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                        }]}>{section.body}</Text>
                    </View>
                  </React.Fragment>
                )
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
    // paddingTop: WindowHeight / 25,
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
    // marginBottom: WindowHeight / 40,
    marginTop: WindowHeight / 25
  },
  ContentSubHeadingCover : {
    marginTop: WindowWidth / 15,
    marginBottom: WindowWidth / 40
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 30,
    marginBottom: WindowWidth / 40
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
  },
  BodyContentWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  Button1Cover: {
    // marginBottom: WindowHeight / 40,
    marginTop: WindowHeight / 50,
    paddingTop: WindowHeight / 40,
    paddingBottom: WindowHeight / 25,
    // backgroundColor : '#FFFFFF'
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
    height: WindowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image1: {
    resizeMode: 'contain',
    width: WindowWidth - (2 * WindowWidth / 60),
    height: (WindowWidth - (2 * WindowWidth / 60)) * 0.24,
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
