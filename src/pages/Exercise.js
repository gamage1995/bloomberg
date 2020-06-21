import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header';
import { FullWidthButton } from '../components/FullWidthButton';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const data = require('../../assets/data/data.json')
const Image1 = require('../../assets/Case1.png')
const ModalCancel = require('../../assets/modalCancel.png')
const Arrow = require('../../assets/EventArrow.png');
const PickerIcon = require('../../assets/pickerIcon.png');
const RadioCircle = require('../../assets/radioCircle.png');
const RadioCircleHL = require('../../assets/radioCircleHL.png');

var radio_props = [
  { label: 'param1', value: 0 },
  { label: 'param2', value: 1 }
];

export default class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSizeIncrement: 0,
      showModal: false,
      index: 0,
      routes: [
        { key: 'first', title: 'DESCRIPTION' },
        { key: 'second', title: 'EXERCISE' },
      ],
      Exercise: data.CaseExercises[Number(props.route.params.index)],
      ModalOptionList: [],
      ModalLine: '',
      ModalType: '',
      checkAnswer: false,
    };
  }

  async componentDidMount() {
    await this.getFontSizeFromAsyncStorage();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFontSizeFromAsyncStorage();
    })
  }

  componentWillUnmount() {
    this.focusListener();
  }

  getFontSizeFromAsyncStorage = async () => {
    try {
      let fontSize = await AsyncStorage.getItem('fontIncrease');
      if (fontSize !== null) {
        this.setState({ fontSizeIncrement: Number(fontSize) })
      }
    } catch (err) {
      console.log(err);
    }
  }

  getEventBackGroundColor = (Event, Time, EventHeading) => {
    if (
      Event === this.state.Exercise.Exercise.CorrectAnswer[EventHeading].event &&
      Time === this.state.Exercise.Exercise.CorrectAnswer[EventHeading].time &&
      this.state.checkAnswer
      ) {
      return {backgroundColor : '#7fba77'};
    }else if(this.state.checkAnswer){
      return {backgroundColor : '#de5b68'};
    }else{
      return {backgroundColor : '#e0e0e0'};
    }
  }

  resetAnswer = () => {
    let exerciseEdit = this.state.Exercise;
    for(let [key,_value] of Object.entries(exerciseEdit.Exercise.CurrentAnswer)){
      exerciseEdit.Exercise.CurrentAnswer[key].event = 'Select an event';
      exerciseEdit.Exercise.CurrentAnswer[key].time = '0d';
    }
    this.setState({Exercise : exerciseEdit, checkAnswer : false})
  }

  showAnswer = () => {
    let exerciseEdit = this.state.Exercise;
    for(let [key,_value] of Object.entries(exerciseEdit.Exercise.CurrentAnswer)){
      exerciseEdit.Exercise.CurrentAnswer[key].event = exerciseEdit.Exercise.CorrectAnswer[key].event;
      exerciseEdit.Exercise.CurrentAnswer[key].time = exerciseEdit.Exercise.CorrectAnswer[key].time;
    }
    this.setState({Exercise : exerciseEdit, checkAnswer : false})
  }

  ModalContent = () => {
    return (
      <React.Fragment>
        <ScrollView style={styles.ModalCover} contentContainerStyle={styles.ModalInner}>
          <View style={styles.DropDownCover}>
            {this.state.ModalOptionList.map((option, index) => {
              return (
                <TouchableOpacity key={index} style={[styles.DropDownItem, {
                  backgroundColor: 
                  this.state.Exercise.Exercise.CurrentAnswer[this.state.ModalLine][this.state.ModalType] == option ? '#F8A01D' : '#ffffff'
                }]} onPress={() => {
                  let exerciseEdit = this.state.Exercise;
                  exerciseEdit.Exercise.CurrentAnswer[this.state.ModalLine][this.state.ModalType] = option;
                  this.setState({ Exercise: exerciseEdit }, () => {
                    this.setState({ showModal: false })
                  })
                }}>
                  <View style={styles.DropDownRadioCover}>
                    {/* <Image source={
                      this.state.Exercise.Exercise.CurrentAnswer[this.state.ModalLine][this.state.ModalType]==option ? 
                      RadioCircleHL : RadioCircle} style={styles.RadioCircle} /> */}
                    <Text style={styles.Line1TextModal}>{index + 1})</Text>
                  </View>
                  <View style={styles.DropDownTextCover}>
                    <Text style={styles.Line1TextModal}>{option}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  Event = (index, EventHeading, Event, Time) => {
    return (
      <View style={[styles.EventSectionCover, this.getEventBackGroundColor(Event,Time,EventHeading)]} key={index}>
        <View style={styles.EventSectionLeft}>
          <Text style={[styles.Line2Text]}>{EventHeading}</Text>
          <TouchableOpacity style={styles.PickerCover} onPress={() => {
            this.setState(
              {
                ModalOptionList: this.state.Exercise.Exercise.Question[index].eventOptions,
                ModalLine: EventHeading,
                ModalType: "event"
              }, () => {
                this.setState({ showModal: true })
              })
          }}>
            <View style={styles.PickerTextCover}>
              <Text style={[styles.Line1Text]}>{Event}</Text>
            </View>
            <View style={styles.PickerIconCover}>
              <Image source={PickerIcon} style={styles.PickerIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.EventSectionRight}>
          <Text style={[styles.Line2Text]}>{"time"}</Text>
          <TouchableOpacity style={styles.PickerCover} onPress={() => {
            this.setState({
              ModalOptionList: this.state.Exercise.Exercise.Question[index].timeOptions,
              ModalLine: EventHeading,
              ModalType: "time"
            }, () => {
              this.setState({ showModal: true })
            })
          }}>
            <View style={styles.PickerTextCover}>
              <Text style={[styles.Line1Text]}>{Time}</Text>
            </View>
            <View style={styles.PickerIconCover}>
              <Image source={PickerIcon} style={styles.PickerIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  handleTextSizeChange = (size) => {
    this.setState({ fontSizeIncrement: size })
  }

  render() {
    const FirstRoute = () => (
      <ScrollView style={styles.Body}>
        <View style={styles.ContentBodyCover}>
          <Text style={[
            styles.ContentBodyText,
            {
              fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement,
              lineHeight: (WindowWidth / 21) + this.state.fontSizeIncrement + 8
            }]}>{this.state.Exercise.Description}</Text>
        </View>
        <View style={styles.BottomPadding}>

        </View>
      </ScrollView>
    );

    const SecondRoute = () => (
      <ScrollView style={styles.Body}>
        {/* <View style={styles.ContentHeadingCover}>
          <Text style={[
            styles.ContentHeading, { fontSize: (WindowWidth / 21) + this.state.fontSizeIncrement }]}>{data.Case1.CaseApplication.Heading}
          </Text>
        </View> */}
        <View style={styles.SectionsWrapper}>
          {
            this.state.Exercise.Exercise.Question.map((question, index) => {
              return this.Event(
                index,
                question.line,
                this.state.Exercise.Exercise.CurrentAnswer[question.line].event,
                this.state.Exercise.Exercise.CurrentAnswer[question.line].time,
              )
            })
          }
        </View>
        <View style={styles.Button2Cover}>
          <TouchableOpacity style={{ width: '50%', alignItems: 'flex-start' }} onPress={() => this.resetAnswer()} disabled={!this.state.checkAnswer}>
            <FullWidthButton width={'97%'} color={'#F8A01D'} icon={require('../../assets/resetAnswer.png')} disabled={!this.state.checkAnswer}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '50%', alignItems: 'flex-end' }} onPress={() => this.showAnswer()} disabled={!this.state.checkAnswer}>
            <FullWidthButton width={'97%'} color={'#F8A01D'} icon={require('../../assets/viewAnswer.png')} disabled={!this.state.checkAnswer}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.Button1Cover} onPress={() => this.setState({ checkAnswer : true })}>
          <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' CHECK ANSWER '} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <this.ModalContent />
        </Modal>
        <View style={styles.BottomPadding}>

        </View>
      </ScrollView>
    );

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#F8A01D' }}
        style={{ backgroundColor: 'white' }}
        labelStyle={{ color: '#383838', fontFamily: 'Roboto-Medium' }}
      />
    );
    return (
      <React.Fragment>
        <Header
          navigation={this.props.navigation}
          heading={`CASE EXERCISE ${Number(this.props.route.params.index) + 1}`}
          handleChange={this.handleTextSizeChange}
          SubHeader={true}
        />
        <TabView
          navigationState={{ index: this.state.index, routes: this.state.routes }}
          renderScene={renderScene}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </React.Fragment>
    )
  }
}

const dimensions = Dimensions.get("window");
const WindowWidth = dimensions.width;
const WindowHeight = dimensions.height;

const styles = StyleSheet.create({
  Body: {
    paddingLeft: WindowWidth / 16,
    paddingRight: WindowWidth / 16,
    paddingTop: WindowHeight / 25,
  },
  ContentHeading: {
    color: '#383838',
    fontFamily: 'OpenSans-Bold'
  },
  ContentHeadingCover: {
    paddingLeft: WindowWidth / 18,
    paddingTop: WindowWidth / 60,
    paddingBottom: WindowWidth / 60,
    borderLeftWidth: 4,
    borderLeftColor: '#F8A01D',
    marginBottom: WindowHeight / 40
  },
  ContentBodyCover: {
    marginTop: WindowWidth / 20,
    marginBottom: WindowWidth / 20
  },
  ContentBodyText: {
    color: '#6A6A6A',
    fontFamily: 'OpenSans-Regular',
    // marginBottom: WindowWidth / 25
  },
  Button1Cover: {
    marginTop: WindowHeight / 70,
    marginBottom: WindowHeight / 50
  },
  Button2Cover: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: WindowHeight / 50
  },
  BottomPadding: {
    height: WindowHeight / 20
  },

  /** event styles */
  SectionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 50
  },
  Line1Text: {
    color: '#595959',
    fontFamily: 'OpenSans-Regular',
    fontSize: (WindowWidth / 21)
  },
  Line1TextModal: {
    color: '#595959',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: (WindowWidth / 21)
  },
  Line2Text: {
    color: '#474747',
    fontFamily: 'OpenSans-Bold',
    fontSize: (WindowWidth / 28),
    lineHeight: (WindowWidth / 28) + 10
  },
  Line3Text: {
    color: '#d15a52',
    fontFamily: 'OpenSans-SemiBold',
  },
  EventSectionCover: {
    paddingRight: WindowWidth / 20,
    paddingTop: WindowWidth / 25,
    paddingBottom: WindowWidth / 25,
    paddingLeft: WindowWidth / 20,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    // borderColor: '#d9d9d9',
    // backgroundColor: '#e0e0e0',
    // borderWidth: 2,
    marginBottom: WindowHeight / 40
  },
  EventSectionLeft: {
    flex: 12,
    justifyContent: 'center'
  },
  EventSectionRight: {
    flex: 3,
    justifyContent: 'center'
  },
  EventCover: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: WindowHeight / 90,
  },
  PickerCover: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor : 'green',
    // justifyContent : 'space-between',
    paddingTop: WindowWidth / 40,
    paddingBottom: WindowWidth / 40
  },
  PickerIcon: {
    width: WindowWidth / 40,
    height: WindowWidth / 40,
  },
  PickerTextCover: {
    flex: 35,
  },
  PickerIconCover: {
    flex: 5,
    // backgroundColor : 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  /** Modal styles */
  ModalCover: {
    height: WindowHeight,
    width: WindowWidth,
    backgroundColor: '#212121f1',
  },
  ModalInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  DropDownCover: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%'
  },
  DropDownItem: {
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 50,
    paddingLeft: WindowWidth / 25,
    paddingRight: WindowWidth / 20,
    marginBottom: WindowHeight / 60,
    borderRadius: 10,
    flexDirection: 'row'
  },
  DropDownTextCover: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  DropDownRadioCover: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  RadioCircle: {
    width: WindowWidth / 20,
    height: WindowWidth / 20,
    alignSelf: 'center',
    marginRight: WindowWidth / 30
  }
})
