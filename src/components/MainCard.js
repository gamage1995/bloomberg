import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  render() {
    return (
      <TouchableOpacity style={styles.CardCover} onPress={()=>this.props.navigation.navigate(this.props.cardRoute)}>
        <View style={styles.CardIconCover}>
          <Image source={this.props.cardIcon} style={styles.CardIcon} />
        </View>
        <View style={styles.CardTextCover}>
          <Text style={styles.CardText}>{this.props.cardTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

let dimensions = Dimensions.get("window");
let cardWidth = Math.round((dimensions.width * 2.1) / 5);

const styles = StyleSheet.create({
  CardCover: {
    flexDirection: 'column',
    width: cardWidth,
    backgroundColor: '#5C3B96',
    marginBottom : cardWidth/10,
    borderRadius : cardWidth/10,
    shadowColor: '#00000029', // IOS
    shadowOffset: { height: 3, width: 4 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 10,

  },
  CardIconCover: {
    padding: cardWidth/10,
  },
  CardTextCover: {
    justifyContent: 'center',
    paddingLeft : cardWidth/10,
    paddingRight : cardWidth/10,
    paddingBottom : cardWidth/7
  },
  CardIcon: {
    width: cardWidth/4,
    height : cardWidth/4,
    resizeMode: 'contain',
  },
  CardText : {
    fontFamily : 'Roboto-Bold',
    color : 'white',
    fontSize : cardWidth/11,
  }
})
