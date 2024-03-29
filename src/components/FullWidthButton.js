import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image
} from "react-native";

let dimensions = Dimensions.get("window");
let cardHeight = Math.round((dimensions.height * 1) / 15);
const screenHeight = dimensions.height;
const screenWidth = dimensions.width;

export class FullWidthButton extends Component {
  getBorderColor = () => {
    if(this.props.disabled){
      if(this.props.disabledColor){
        return this.props.disabledColor
      }
      return this.props.color;
    }
    return this.props.color
  }

  getBackgroundColor = () => {
    if(this.props.fill == 'solid'){
      if(this.props.disabled){
        if(this.props.disabledColor){
          return this.props.disabledColor
        }
        return this.props.color;
      }
      return this.props.color;
    }
    return 'transparent'
  }

  getImageSource = () =>{
    if(this.props.disabled){
      if(this.props.disabledIcon){
        return this.props.disabledIcon;
      }
      return this.props.icon;
    }
    return this.props.icon;
  }

  render() {
    return (
      <View style={{
        width : this.props.width ? this.props.width : '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: cardHeight / 8,
        minHeight: screenHeight * 0.07,
        maxHeight: screenHeight * 0.07,
        backgroundColor: this.getBackgroundColor(),
        borderColor: this.getBorderColor(),
        paddingLeft: cardHeight * 0.3,
        paddingRight: cardHeight * 0.3,
        opacity: this.props.disabled ? 0.6 : 1
      }}>
        {
          this.props.icon ?
            <Image source={this.getImageSource()} style={{
              height: screenHeight * 0.04,
              width : screenHeight * 0.04,
              opacity: this.props.disabled ? 0.5 : 1
            }} />
            :
            <Text style={{
              fontSize: screenWidth / 24,
              fontWeight: "bold",
              textAlign: 'center',
              color: this.props.fill == 'solid' ? 'white' : `${this.props.color}`,
              opacity: this.props.disabled ? 0.8 : 1
            }}>{this.props.buttonText + ' '}</Text>
        }
      </View>
    );
  }
}
