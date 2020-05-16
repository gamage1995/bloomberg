import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
const dp_down = require('../../assets/dp-down.png');
const dp_up = require('../../assets/dp-up.png');

export class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      header: props.header,
      body: props.body
    };
    this.animatedValue = new Animated.Value(0);
    this.animatedListenerValue = 0;
    this.animatedValue.addListener((value) => {
      this.animatedListenerValue = value.value;
      console.log(this.animatedListenerValue)
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange : [0 ,180],
      outputRange : ['0deg','180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange : [0,180],
      outputRange : ['180deg','360deg']
    })
  }
  toggleAccordion = () => {
    this.setState({
      expanded: !this.state.expanded
    });
    if(this.animatedListenerValue >= 90){
      console.log('r')
      Animated.spring(this.animatedValue, {
        toValue : 0,
        friction : 8,
        tension : 10
      }).start();
    }else {
      console.log('b')
      Animated.spring(this.animatedValue, {
        toValue : 180,
        friction : 8,
        tension : 10
      }).start();
    }
    
  }
  handleViewRef = ref => this.view = ref;
  
  render() {
    const frontAnimatedStyle = {
      transform : [
        { rotateX : this.frontInterpolate }
      ]
    };
    const backAnimatedStyle = {
      transform : [
        { rotateX : this.backInterpolate }
      ]
    }
    return (
      <View style={styles.AccCover}>
        <TouchableOpacity style={styles.AccHead} onPress={() => {
          if(this.state.expanded){
            // this.view.fadeOut(200).then(() => this.toggleAccordion())  
            this.toggleAccordion();      
          }else{
            this.toggleAccordion();          
            this.view.fadeInDown(400)
          }
        }
        }>
          <View style={styles.AccHeadTextCover}>
            <Text style={styles.AccHeadText}>{this.state.header}</Text>
          </View>
          <View style={styles.AccHeadIconCover}>
            <Animated.Image source={dp_down} style={[styles.AccHeadIcon, frontAnimatedStyle]} />     
            <Animated.Image source={dp_up} style={[styles.AccHeadIcon,styles.AccHeadIconBack, backAnimatedStyle]} />            
            {/* <Image source={this.state.expanded ? dp_up : dp_down} style={styles.AccHeadIcon} /> */}
          </View>
        </TouchableOpacity>
        {
          // this.state.expanded &&
          <Animatable.View
            ref={this.handleViewRef}
            style={{
                display : this.state.expanded ? 'flex' : 'none',
                width: WindowWidth * 0.93,
                paddingTop: WindowWidth * 0.06,
                paddingLeft: WindowWidth * 0.06,
                paddingRight: WindowWidth * 0.06,
                paddingBottom: WindowWidth * 0.09,
                backgroundColor: '#5C3B96CE',
                // backgroundColor: '#ffffffAC',
                borderRadius: WindowWidth * 0.02,
                marginTop: WindowWidth * 0.015,
                
            }}>
            <Text style={styles.AccBodyText}>{this.state.body}</Text>
          </Animatable.View>
        }
      </View>
    );
  }
}
const WindowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  AccCover: {
    flexDirection: 'column',
    marginBottom: WindowWidth * 0.035,
    
  },
  AccHead: {
    width: WindowWidth * 0.93,
    padding: WindowWidth * 0.06,
    backgroundColor: '#5C3B96',
    borderRadius: WindowWidth * 0.02,
    flexDirection: 'row',
    shadowColor: '#00000029', // IOS
    shadowOffset: { height: 3, width: 4 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 10,
    // marginBottom: WindowWidth * 0.015
  },
  AccHeadTextCover: {
    flex: 5,
    alignItems: "flex-start",
    justifyContent: 'center',
  },
  AccHeadText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize: WindowWidth * 0.04,
    lineHeight : WindowWidth * 0.05,
  },
  AccHeadIconCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccHeadIcon: {
    height: WindowWidth * 0.07,
    resizeMode: 'contain',
    backfaceVisibility : 'hidden'
  },
  AccHeadIconBack : {
    position : 'absolute',
    // top : 0,
  },
  // AccBody: {
  //   display : this.state.
  //   width: WindowWidth * 0.93,
  //   padding: WindowWidth * 0.06,
  //   backgroundColor: '#5C3B96AC',
  //   borderRadius: WindowWidth * 0.02,
  // },
  AccBodyText: {
    fontFamily: 'Roboto-Medium',
    color: 'white',
    fontSize: WindowWidth * 0.0415,
    lineHeight : WindowWidth * 0.06
  }
})