import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Header } from '../components/Header'
import { FullWidthButton } from '../components/FullWidthButton'
const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/Image1.png')
const ModalCancel = require('../../assets/modalCancel.png')
export default class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0,
      showModal: false
    };
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
            imageWidth={(WindowWidth)}
            imageHeight={WindowWidth * 1.3}>
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
          heading={'INTERNATIONAL FORM OF MEDICAL CERTIFICATE OF CAUSE OF DEATH'}
          handleChange={this.handleTextSizeChange}
        />
        <ScrollView style={styles.Body}>
          <View style={styles.ContentBodyCover}>
            <Text style={[
              styles.ContentBodyText,
              {
                fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                lineHeight: (WindowWidth / 24) + this.state.fontSizeIncrement + 8
              }]}>{data.Page3.section1}</Text>
          </View>
          <TouchableOpacity style={styles.Button1Cover} onPress={() => this.setState({ showModal: true })}>
            <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' VIEW CERTIFICATE '} />
          </TouchableOpacity>
          <View style={styles.ContentHeadingCover}>
            <Text style={[
              styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.Page3.section2}</Text>
          </View>
          <View style={styles.Button2Cover}>
            <TouchableOpacity style={{ flex: 1, paddingRight: WindowWidth / 50 }}>
              <FullWidthButton color={"#636363"} buttonText={' FRAME A '} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, paddingLeft: WindowWidth / 50 }}>
              <FullWidthButton color={"#636363"} buttonText={' FRAME B '} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
          >
            <this.ModalContent />
          </Modal>
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
    alignSelf : 'center'
  },
  CancelButtonCover: {
    position: 'absolute',
    bottom: 10,
    alignSelf : 'center'
  },
  CancelButton: {
    height: WindowHeight / 12,
    width: WindowHeight / 12,
  }
})
