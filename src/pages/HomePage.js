import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, Image } from 'react-native';
import { MainCard } from '../components/MainCard';

const backgroundImage = require('../../assets/background.png');
const logo = require('../../assets/bloomberg.png');

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
        <ImageBackground style={styles.HomePageTop} source={backgroundImage}>
          <View style={styles.ImageBackgroundInner}>

          </View>
        </ImageBackground>
        <ScrollView style={styles.HomePageBottom} onScroll={this.handleScroll} showsVerticalScrollIndicator={false} stickyHeaderIndices={this.state.headerOffset > 0 ? [10] : [0]}>
          <View style={styles.HomePageBottomInner}>
            <View style={[styles.LogoCover, this.state.headerOffset < 0 ? [{
              shadowColor: "#616161",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.51,
              shadowRadius: 13.16,
              height : WindowHeight * 0.09,
              elevation: 20,
              backgroundColor : 'white'
            }] : [{height : WindowHeight * 0.08}]]}>
              <Image source={logo} style={this.state.headerOffset > 0 ? styles.LogoImage : styles.LogoImageInHead} />
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
                cardTitle={'INTERNATIONAL FORM'}
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
                cardTitle={'COD & UNDERLYING COD'}
                cardIcon={require(`../../assets/icons8-course-96.png`)}
                cardRoute={'Page2'} navigation={this.props.navigation}
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
    backgroundColor: '#EDEDED'
  },
  HomePageTop: {
    height: WindowHeight * 0.3,
  },
  ImageBackgroundInner: {
    flex: 1,
    backgroundColor: '#FFFFFFCB',
  },
  HomePageBottomInner: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    height: WindowHeight * 0.25,
    width: WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: WindowHeight * 0.08,
    width: WindowWidth,
  },
  LogoImage: {
    height: WindowHeight * 0.047,
    resizeMode: 'contain'
  },
  LogoImageInHead : {
    height: WindowHeight * 0.04,
    resizeMode: 'contain'
  },
  HomePageBottom: {
    height: WindowHeight,
    marginTop: -WindowHeight * 0.3,
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