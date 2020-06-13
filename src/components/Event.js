import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header';
import { FullWidthButton } from '../components/FullWidthButton';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export class Event extends Component {
  render() {
    return (
      <View style={styles.SectionCover}>
        <Text style={[
          styles.Line3Text,
          {
            fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
            lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 8
          }]}>{"Bleeding Oesophageal Varices"}
        </Text>
        <Text style={[
          styles.Line2Text,
          {
            fontSize: (WindowWidth / 26) + this.state.fontSizeIncrement,
            lineHeight: (WindowWidth / 26) + this.state.fontSizeIncrement + 8
          }]}>{"Immediate cause of death - Line 1 a"}
        </Text>
        <Text style={[
          styles.Line1Text,
          {
            fontSize: (WindowWidth / 23) + this.state.fontSizeIncrement,
            lineHeight: (WindowWidth / 23) + this.state.fontSizeIncrement + 8
          }]}>{"Bleeding Oesophageal Varices"}
        </Text>
      </View>
    )
  }
}

const dimensions = Dimensions.get("window");
const WindowWidth = dimensions.width;
const WindowHeight = dimensions.height;

const styles = StyleSheet.create({
  ContentHeading: {
    color: '#383838',
    fontFamily: 'OpenSans-Bold'
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 20
  },
  Line1Text: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
  },
  Line2Text: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
  },
  Line3Text: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
  },
  SectionCover: {
    paddingRight: WindowWidth / 20,
    paddingTop: WindowWidth / 25,
    paddingBottom: WindowWidth / 25,
    paddingLeft: WindowWidth / 20,
    width: '100%',
    backgroundColor: '#e8e8e8',
    marginTop: WindowHeight / 30,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column'
  },
})