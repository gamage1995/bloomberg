import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions
} from "react-native";

let dimensions = Dimensions.get("window");
let cardHeight = Math.round((dimensions.height * 1) / 15);
const screenHeight = dimensions.height;
const screenWidth = dimensions.width;

export class FullWidthButton extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: cardHeight / 8,
        minHeight: screenHeight * 0.07,
        maxHeight: screenHeight * 0.07,
        backgroundColor: this.props.fill == 'solid' ? `${this.props.color}` : 'transparent',
        borderColor: `${this.props.color}`,
        paddingLeft: cardHeight * 0.3,
        paddingRight: cardHeight * 0.3,
        opacity : this.props.disabled ? 0.6 : 1
      }}>
        <Text style={{
          fontSize: screenWidth / 24,
          fontWeight: "bold",
          textAlign: 'center',
          color: this.props.fill == 'solid' ? 'white' : `${this.props.color}`,
          opacity : this.props.disabled ? 0.8 : 1
        }}>{this.props.buttonText+' '}</Text>
      </View>
    );
  }
}
