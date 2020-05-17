import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, View,Dimensions , Text} from 'react-native';
import HomePage from '../src/pages/HomePage'
import Page1 from '../src/pages/Page1'

const bloombergLogo = require('../assets/blmbrgLogo.jpg');
let dimensions = Dimensions.get("window");
let cardHeight = Math.round((dimensions.height * 1) / 15);
let WindowWidth = dimensions.width;

const LogoTitle = () => {
  return (
    <Image
      style={{height: cardHeight * 0.7 , resizeMode : 'contain' }}
      source={bloombergLogo}
    />
  );
}

const StackNavHeader = (props) => {
  return(
    <View style={{marginLeft : WindowWidth/10, justifyContent : 'flex-start', alignContent : 'center', overflow : 'hidden'}}>
      <Text numberOfLines={1} style={{fontFamily : 'Roboto-Bold',fontWeight : "bold",color : '#F8A01D', fontSize : WindowWidth/22,}}>{props.title}</Text>
    </View>
  )
}

const HomeStackNav = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator initialRouteName="Home">
      <HomeStackNav.Screen 
      name="Home" 
      component={HomePage} 
      options = {{
        headerShown : false
      }}
      // headerTitle options={{ 
      //   headerTitle: props => <LogoTitle {...props} />, 
      //   headerTitleAlign : 'center', 
      //   headerStyle : {height : cardHeight * 1.5,
      //     shadowColor: 'transparent',
      //     elevation : 0,
      //     } 
      //   }} 
        />
      <HomeStackNav.Screen
        name='Page1'
        component={Page1}
        headerTitle options = {{
          // title : 'THE IMPORTANCE OF COD CERTIFICATION ',
          headerTitle : props => <StackNavHeader title={'THE IMPORTANCE OF COD CERTIFICATION'}/>,
          headerTitleAlign : 'center',
          headerStyle : {height : cardHeight * 1.5,
            shadowColor: 'transparent',
            elevation : 0,
            },
          // headerTitleStyle : {
            // fontFamily : 'Roboto-Bold',
            // fontWeight : "bold",
            // color : '#F8A01D',
          // },
          // headerTitleAlign : 'center'
        }}
        />
    </HomeStackNav.Navigator>
  )
}

export default HomeStack;