import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Unorderedlist from 'react-native-unordered-list';

import { Header } from '../components/Header'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const data = require('../../assets/data/data.json')

export default class Page10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement : 0
    };
  }
  async componentDidMount (){
    await this.getFontSizeFromAsyncStorage();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFontSizeFromAsyncStorage();
    })
  }

  componentWillUnmount () {
    this.focusListener();
  }

  getFontSizeFromAsyncStorage = async() =>{
    try{
      let fontSize = await AsyncStorage.getItem('fontIncrease');
      if(fontSize !== null){
        this.setState({fontSizeIncrement : Number(fontSize)})
      }
    }catch(err){
      console.log(err);
    }
  }

  handleTextSizeChange = (size) => {
    this.setState({fontSizeIncrement : size})
  }

  /*render() {*/
  FirstRoute = () => {
    return (
      <React.Fragment>
        <Header 
        navigation={this.props.navigation} 
        heading={'ASCERTAINMENT OF MANNER OF DEATH'}
        handleChange={this.handleTextSizeChange}
        /> 
        <ScrollView style={styles.Body}>
          {data.Page10.data.map((section,index) => {
            return (
              <React.Fragment key={section.head}>
                <View style={styles.ContentHeadingCover}>
                  <Text style={[styles.ContentHeading, {fontSize : (WindowWidth / 21) + this.state.fontSizeIncrement}]}>{section.head}</Text>
                </View>
                <View key={index} style={styles.ContentBodyCover}>
                  <Text style={[
                    styles.ContentBodyText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.body[0]}</Text>
               
                
                  <Unorderedlist bulletUnicode={0x2022}style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}><Text style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.bulletlist[0]}</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2022}style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}><Text style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.bulletlist[1]}</Text></Unorderedlist>
                  <Unorderedlist bulletUnicode={0x2022}style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}><Text style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.bulletlist[2]}</Text></Unorderedlist>
                    <Unorderedlist bulletUnicode={0x2022}style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}><Text style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.bulletlist[3]}</Text></Unorderedlist>
                    <Unorderedlist bulletUnicode={0x2022}style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}><Text style={[
                    styles.ContentBodyBulletText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.bulletlist[4]}</Text></Unorderedlist>
                    <Text style={[
                    styles.ContentBodyText,
                    {
                      fontSize: (WindowWidth / 24) + this.state.fontSizeIncrement,
                      lineHeight : (WindowWidth / 24) + this.state.fontSizeIncrement + 8
                      }]}>{section.body[1]}</Text>
                </View>
                
              </React.Fragment>
            )
          })}
          <View style={styles.BottomPadding}>

          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
  SecondRoute = () => {
    return(
      <ScrollView style={styles.Body}>
      <View style={styles.ContentBodyCover}>
        <Text style={[
          styles.ContentBodyText,
          {
            fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
            lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
          }]}>{data.SpecialCases[0].CaseExample}</Text>
      </View>
      <View style={styles.BottomPadding}>
  
      </View>
    </ScrollView>
    )
  }
  
  ThirdRoute = () => {
  return (
    <ScrollView style={styles.Body}>
      <View style={styles.ContentBodyCover}>
        <Text style={[
          styles.ContentBodyText,
          {
            fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
            lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
          }]}>{data.SpecialCases[0].CaseExample}</Text>
      </View>
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
        <Header
          navigation={this.props.navigation}
          heading={data.SpecialCases[0].Title.toUpperCase()}
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
    borderLeftColor: '#F8A01D'
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 15
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 30
  },
  ContentBodyBulletText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    marginBottom: WindowWidth / 30,
    marginLeft: WindowWidth /10,
  },
  BottomPadding: {
    height : WindowHeight/20
  }
})