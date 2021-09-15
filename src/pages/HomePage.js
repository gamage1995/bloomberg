import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { MainCard } from '../components/MainCard';

const backgroundImage = require('../../assets/background.png');
const logo = require('../../assets/bloomberg.png');
const uniMelbLogo = require('../../assets/unimelbLogo.png');
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // logoOpacity: 1,
      headerOffset: WindowHeight * 0.085
    };
  }

  handleScroll = (event) => {
    // this.setState({ logoOpacity: (1 - (event.nativeEvent.contentOffset.y / (WindowHeight * 0.1015))) })
    this.setState({ headerOffset: WindowHeight * 0.085 - event.nativeEvent.contentOffset.y })
  }

  render() {
    return (
      <View style={styles.PageWrapper}>
        <View style={styles.UniMelbCover}>
          <Image source={uniMelbLogo} style={styles.UniMelbLogo} />
        </View>
        <ScrollView style={styles.HomePageBottom} onScroll={this.handleScroll} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
          <View style={styles.HomePageBottomInner}>
            <View style={[styles.LogoCover]}>
              <Image source={logo} style={styles.LogoImageInHead} />
            </View>
          </View>
          <View style={styles.CardContainer}>
            <View style={styles.CardColumn}>
              <MainCard
                cardTitle={'THE IMPORTANCE OF COD CERTIFICATION'}
                cardIcon={require(`../../assets/icons8-info-96.png`)}
                cardRoute={'Page1'} navigation={this.props.navigation}
              />
              <MainCard
                cardTitle={'ASCERTAINMENT OF MANNER OF DEATH'}
                cardIcon={require(`../../assets/icons8-google-forms-96.png`)}
                cardRoute={'Page10'} navigation={this.props.navigation}
              /> 
              <MainCard
                cardTitle={'INTERNATIONAL FORM'}
                cardIcon={require(`../../assets/icons8-google-forms-96.png`)}
                cardRoute={'Page3'} navigation={this.props.navigation}
              />
              <MainCard
                cardTitle={'CASE EXAMPLES'}
                cardIcon={require(`../../assets/icons8-list-96.png`)}
                cardRoute={'Page5'} navigation={this.props.navigation}
              />
               <MainCard
                cardTitle={'ILL-DEFINED CONDITIONS'}
                cardIcon={require(`../../assets/illdefined.png`)}
                cardRoute={'Page7'} navigation={this.props.navigation}
              />
               <MainCard
                cardTitle={'ABOUT APP'}
                cardIcon={require(`../../assets/icons8-medical-mobile-app-90.png`)}
                cardRoute={'Page9'} navigation={this.props.navigation}
              />
            </View>
            <View style={styles.CardColumn}>
              <MainCard
                cardTitle={'COD & UNDERLYING COD'}
                cardIcon={require(`../../assets/icons8-course-96.png`)}
                cardRoute={'Page2'} navigation={this.props.navigation}
              />
              <MainCard
                cardTitle={'IMPORTANT POINTS TO REMEMBER WHILE CERTIFYING'}
                cardIcon={require(`../../assets/icons8-user-manual-96.png`)}
                cardRoute={'Page4'} navigation={this.props.navigation}
              />
              <MainCard
                cardTitle={'CERTIFYING SPECIFIC CAUSES'}
                cardIcon={require(`../../assets/icons8-bookmark-book-96.png`)}
                cardRoute={'Page6'} navigation={this.props.navigation}
              />
               <MainCard
                cardTitle={'CASE EXERCISES'}
                cardIcon={require(`../../assets/icons8-development-skill-96.png`)}
                cardRoute={'Page8'} navigation={this.props.navigation}
              />
              
            </View>
          </View>
        </ScrollView>
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
    backgroundColor: '#fafafa'
  },
  UniMelbCover: {
    height: WindowHeight * 0.075,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b2e55'
  },
  UniMelbLogo: {
    height: WindowHeight * 0.035,
    resizeMode: 'contain'
  },
  HomePageBottomInner: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    height: WindowHeight * 0.14,
    width: WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: WindowWidth,
    shadowColor: "#616161",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    height: WindowHeight * 0.09,
    elevation: 20,
    backgroundColor: 'white'
  },
  LogoImage: {
    height: WindowHeight * 0.047,
    resizeMode: 'contain'
  },
  LogoImageInHead: {
    height: WindowHeight * 0.04,
    resizeMode: 'contain'
  },
  HomePageBottom: {
    height: WindowHeight,
    // marginTop: -WindowHeight * 0.3,
    width: WindowWidth,
  },
  CardContainer: {
    flexDirection: 'row',
    paddingLeft: WindowWidth * 0.035,
    paddingRight: WindowWidth * 0.035
  },
  CardColumn: {
    width: WindowWidth * 0.465,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})