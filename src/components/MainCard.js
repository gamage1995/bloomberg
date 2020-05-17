import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  render() {
    return (
      <TouchableOpacity style={styles.CardCover} onPress={() => this.props.navigation.navigate(this.props.cardRoute)}>
        <View style={styles.CardIconCover}>
          <Image source={this.props.cardIcon} style={styles.CardIcon} />
        </View>
        <View style={styles.CardTextCover}>
            <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.CardText}>{this.props.cardTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const dimensions = Dimensions.get("window");
const cardWidth = Math.round((dimensions.width * 2.1) / 5);
const WindowHeight = dimensions.height;

const styles = StyleSheet.create({
  CardCover: {
    flexDirection: 'column',
    width: cardWidth,
    backgroundColor: '#5C3B96',
    borderRadius: 5,
    shadowColor: '#00000029', // IOS
    shadowOffset: { height: 3, width: 4 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 10,
    height : cardWidth,
    // height: WindowHeight * 0.18,
    marginBottom: WindowHeight * 0.02,
  },
  CardIconCover: {
    paddingLeft: cardWidth / 10,
    // height: WindowHeight * 0.09,
    height : cardWidth/2,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'flex-start',
  },
  CardTextCover: {
    display: 'flex',
    flex : 1,
    justifyContent: 'flex-end',
    paddingLeft: cardWidth / 8,
    paddingRight: cardWidth / 8,
    paddingBottom : cardWidth/7,
    // height: WindowHeight * 0.9,
    height : cardWidth/2
  },
  CardIcon: {
    height: cardWidth * 0.27,
    width: cardWidth * 0.27,
    resizeMode: 'contain',

  },
  CardText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize : cardWidth * 0.092,
    lineHeight : WindowHeight * 0.022
  },
})
