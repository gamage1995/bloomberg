import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { MainCard } from '../components/MainCard';

const backgroundImage = require('../../assets/background.png');
const logo = require('../../assets/bloomberg.png');

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoOpacity: 1
    };
  }

  handleScroll = (event) => {
    this.setState({ logoOpacity: (1 - (event.nativeEvent.contentOffset.y / (WindowHeight * 0.1015))) })
    console.log(WindowHeight * 0.25 - event.nativeEvent.contentOffset.y)
  }

  render() {
    return (
      <View style={styles.PageWrapper}>
        <ImageBackground style={styles.HomePageTop} source={backgroundImage}>
          <View style={styles.HomePageTopInner}>
            <View style={styles.LogoCover}>
              <Image source={logo} style={[styles.LogoImage, { opacity: this.state.logoOpacity }]} />
            </View>
          </View>
        </ImageBackground>
        <ScrollView style={styles.HomePageBottom} contentContainerStyle={styles.CardContainer} onScroll={this.handleScroll} showsVerticalScrollIndicator={false}>
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
        {/* <ScrollView style={styles.BackgroundView} contentContainerStyle={styles.CardContainer}>
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
        </ScrollView> */}
      </View>
    );
  }
}

const WindowHeight = Dimensions.get("window").height;
const WindowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  PageWrapper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EDEDED'
  },
  HomePageTop: {
    height: WindowHeight * 0.3,
  },
  HomePageTopInner: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFFCB',
    justifyContent: 'flex-start'
  },
  LogoCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: WindowHeight * 0.25,
    width: '100%',
  },
  LogoImage: {
    height: WindowHeight * 0.047,
    resizeMode: 'contain'
  },
  HomePageBottom: {
    height: WindowHeight,
    // backgroundColor : 'blue',
    marginTop: -WindowHeight * 0.3
  },
  CardContainer: {
    flexDirection: 'row',
    paddingTop: WindowHeight * 0.25,
    // alignContent : 'space-around',
    paddingLeft: WindowWidth * 0.035,
    paddingRight: WindowWidth * 0.035
    // backgroundColor : 'green'
  },
  CardColumn: {
    width: WindowWidth * 0.465,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  // BackgroundView : {
  //   flex : 1,
  //   backgroundColor : '#5C3B96CB', 

  // },
  // CardContainer : {
  //   flexDirection : 'row',
  //   justifyContent : 'space-around'
  // },
  // CardColumn : {
  //   flexDirection : 'column',
  //   flexWrap : 'wrap',
  //   paddingTop : WindowHeight/22,
  // },
  // BackgroundImage : {
  //   height : '100%',
  //   width : '100%',
  //   alignSelf : 'center'
  // }
})