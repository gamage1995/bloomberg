import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';

const backgroundImage = require('../../assets/background.png');
const backButton = require('../../assets/back.png');
const IncreaseIcon = require('../../assets/increaseFont.png')
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFontSize : 0
    };
  }

  async componentDidMount (){
    await this.getFontSizeFromAsyncStorage();
  }

  getFontSizeFromAsyncStorage = async() =>{
    try{
      let fontSize = await AsyncStorage.getItem('fontIncrease');
      if(fontSize !== null){
        this.setState({initialFontSize : Number(fontSize)})
      }
    }catch(err){
      console.log(err);
    }
  }

  setFontSize = async (increase) => {
    try{
      await AsyncStorage.setItem('fontIncrease',String(increase))
    }catch(err){
      console.log(err);
    }
  }

  render() {
    return (
      <ImageBackground style={styles.HeaderCover} source={backgroundImage}>
        <View style={styles.ImageBackgroundInner}>
          <View style={styles.HeaderTopCover}>
            <TouchableOpacity style={styles.BackButtonCover} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.BackButton} source={backButton} />
            </TouchableOpacity>
            <View style={styles.SliderCover}>
              <View style={styles.SliderSliderCover}>
              <Slider
                style={styles.SliderSlider}
                minimumValue={0}
                maximumValue={5}
                value={this.state.initialFontSize}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                onValueChange={async (val) => {
                  await this.setFontSize(val);
                  this.props.handleChange(val)
                }}
              />
              </View>
              <View style={styles.SliderIconCover}>
                <Image style={styles.SliderIcon} source={IncreaseIcon} />
              </View>
            </View>
          </View>
          <View style={styles.HeadingCover}>
            <Text style={styles.HeadingText}>
              {this.props.heading}
            </Text>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const dimensions = Dimensions.get("window");
const WindowWidth = dimensions.width;
const WindowHeight = dimensions.height;

const styles = StyleSheet.create({
  HeaderCover: {
    height: WindowHeight / 3.5,
    // backgroundColor : 'green'
  },
  ImageBackgroundInner: {
    height: '100%',
    backgroundColor: '#5C3B96F7',
    display: 'flex',
    flexDirection: 'column',
    padding: WindowWidth / 20
  },
  HeaderTopCover: {
    height: (WindowHeight / 3.5 - WindowWidth / 10) / 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  BackButton: {
    height: WindowHeight / 35,
    resizeMode: 'contain',
    width: WindowHeight / 35
  },
  BackButtonCover: {
    width: WindowHeight / 15,
    height: '100%'
  },
  SliderCover: {
    width: WindowWidth * 0.9 - WindowHeight / 15,
    height: (WindowHeight / 3.5 - WindowWidth / 10) / 5,
    display: 'flex',
    flexDirection: 'row'
  },
  SliderIconCover: {
    width : (WindowHeight / 3.5 - WindowWidth / 10) / 8,
    height : '100%',
    justifyContent : 'center',
    alignItems : 'center'
  },
  SliderIcon : {
    height: (WindowHeight / 3.5 - WindowWidth / 10) / 11,
    width : (WindowHeight / 3.5 - WindowWidth / 10) / 11,
  },
  SliderSliderCover : {
    width: (WindowWidth * 0.9 - WindowHeight / 15) - (WindowHeight / 3.5 - WindowWidth / 10) / 8,
    height : '100%',
    justifyContent : 'center',
    alignItems : 'flex-end'
  }, 
  SliderSlider : {
    width : ((WindowWidth * 0.9 - WindowHeight / 15) - (WindowHeight / 3.5 - WindowWidth / 10) / 4) * 0.75,
    height : '100%'
  }, 
  HeadingCover: {
    height: ((WindowHeight / 3.5 - WindowWidth / 10) / 5) * 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingLeft: WindowHeight / 25,
    paddingBottom: WindowHeight / 30,
    paddingRight: WindowWidth / 50
  },
  HeadingText: {
    textAlign: 'right',
    fontSize: WindowWidth / 20,
    lineHeight: WindowWidth / 14,
    color: '#ffffff',
    fontFamily: 'Roboto-Medium',
  }
})
