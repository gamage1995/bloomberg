import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const dp_down = require('../../assets/dp-down.png');
const dp_up = require('../../assets/dp-up.png');

export class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      header : props.header,
      body : props.body
    };
  }

  toggleAccordion = () => {
    this.setState({
      expanded : !this.state.expanded
    })
  }

  render() {
    return (
      <View style={styles.AccCover}>
        <TouchableOpacity style={styles.AccHead} onPress={() => this.toggleAccordion()}>
          <View style={styles.AccHeadTextCover}>
            <Text style={styles.AccHeadText}>{this.state.header}</Text>
          </View>
          <View style={styles.AccHeadIconCover}>
            <Image source={this.state.expanded ? dp_up : dp_down} style={styles.AccHeadIcon} />
          </View>
        </TouchableOpacity>
        {
          this.state.expanded &&
          <View style={styles.AccBody}>
            <Text style={styles.AccBodyText}>{this.state.body}</Text>
          </View>
        }
      </View>
    );
  }
}
const WindowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  AccCover: {
    flexDirection: 'column'
  },
  AccHead: {
    width: WindowWidth * 0.93,
    padding: WindowWidth * 0.06,
    backgroundColor: '#5C3B96',
    borderRadius: WindowWidth * 0.02,
    flexDirection: 'row',
    marginBottom: WindowWidth * 0.02
  },
  AccHeadTextCover: {
    flex: 5,
    alignItems: 'center'
  },
  AccHeadText: {
    fontFamily: 'Roboto-Bold',
    color: 'white',
    fontSize: WindowWidth * 0.04
  },
  AccHeadIconCover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AccHeadIcon: {
    height: WindowWidth * 0.07,
    resizeMode: 'contain'
  },
  AccBody: {
    width: WindowWidth * 0.93,
    padding: WindowWidth * 0.06,
    backgroundColor: '#5C3B96AC',
    borderRadius: WindowWidth * 0.02,
  },
  AccBodyText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: WindowWidth * 0.04
  }
})