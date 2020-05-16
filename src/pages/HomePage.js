import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView, ImageBackground,Dimensions } from 'react-native';
import { MainCard } from '../components/MainCard';

const backgroundImage = require('../../assets/background.png');

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ImageBackground style={styles.BackgroundImage} source={backgroundImage}>
        <ScrollView style={styles.BackgroundView} contentContainerStyle={styles.CardContainer}>
          <View style={styles.CardColumn}>
            <MainCard 
            cardTitle={'THE IMPORTANCE OF COD CERTIFICATION'} 
            cardIcon={require(`../../assets/icons8-info-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'INTERNATIONAL FORM '} 
            cardIcon={require(`../../assets/icons8-google-forms-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'CERTIFYING SPECIFIC CAUSES'} 
            cardIcon={require(`../../assets/icons8-bookmark-book-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'CASE EXERCISES'} 
            cardIcon={require(`../../assets/icons8-development-skill-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            
          </View>
          <View style={styles.CardColumn}>
            <MainCard 
            cardTitle={'COD AND UNDERLYING COD'} 
            cardIcon={require(`../../assets/icons8-course-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'CASE EXAMPLES'} 
            cardIcon={require(`../../assets/icons8-list-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'FRAME B'} 
            cardIcon={require(`../../assets/icons8-user-manual-96.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />
            <MainCard 
            cardTitle={'ABOUT APP'} 
            cardIcon={require(`../../assets/icons8-medical-mobile-app-90.png`)} 
            cardRoute={'Page1'} navigation={this.props.navigation}
            />          
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const WindowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  BackgroundView : {
    flex : 1,
    backgroundColor : '#5C3B96CB', 
    // backgroundColor : '#FFFFFFCB', 

  },
  CardContainer : {
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  CardColumn : {
    flexDirection : 'column',
    flexWrap : 'wrap',
    paddingTop : WindowHeight/22,
  },
  BackgroundImage : {
    height : '100%',
    width : '100%',
    alignSelf : 'center'
  }
})