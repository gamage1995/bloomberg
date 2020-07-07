import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions, TouchableOpacity, Modal, Alert, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import AsyncStorage from '@react-native-community/async-storage';
import { Header } from '../components/Header';
import { FullWidthButton } from '../components/FullWidthButton';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Picker } from '@react-native-community/picker';

const data = require('../../assets/data/data.json');
const PickerIcon = require('../../assets/pickerIcon.png');
const addIcon = require('../../assets/addIcon.png');
const cancelIcon = require('../../assets/part2CancelImage.png');
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
      showAnswer: false,
      showAlertModal: false,
      showPart2Modal: false,
      part2SelectedEvent: data.CaseExercises[Number(props.route.params.index)].Exercise.Question.part2.eventOptions[0].full,
      part2SelectedTime: data.CaseExercises[Number(props.route.params.index)].Exercise.Question.part2.timeOptions[0].full
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

  getEventBackGroundColor = (Event, EventHeading, Time) => {
    if (this.state.checkAnswer) {
      if (
        Event === this.state.Exercise.Exercise.CorrectAnswer.part1[EventHeading].event &&
        Time === this.state.Exercise.Exercise.CorrectAnswer.part1[EventHeading].time
      ) {
        return { backgroundColor: '#7fba77' };
      } else {
        return { backgroundColor: '#de5b68' };
      }
    } else {
      return { backgroundColor: '#e0e0e0' };
    }
  }


  getPart2BackgroundColor = () => {
    if (this.state.checkAnswer) {
      if (JSON.stringify(this.state.Exercise.Exercise.CurrentAnswer.part2.sort(
        (a, b) => (a.event > b.event) ? 1 : -1
      )) == JSON.stringify(this.state.Exercise.Exercise.CorrectAnswer.part2.sort(
        (a, b) => (a.event > b.event) ? 1 : -1
      ))) {
        return { backgroundColor: '#7fba77' };
      } else {
        return { backgroundColor: '#de5b68' };
      }
    } else {
      return { backgroundColor: '#ebebeb' }
    }
  }

  resetAnswer = () => {
    let exerciseEdit = this.state.Exercise;
    for (let [key, _value] of Object.entries(exerciseEdit.Exercise.CurrentAnswer.part1)) {
      exerciseEdit.Exercise.CurrentAnswer.part1[key].event = 'Select an event';
      exerciseEdit.Exercise.CurrentAnswer.part1[key].time = '0d';
    }
    exerciseEdit.Exercise.CurrentAnswer.part2 = [];
    this.setState({ Exercise: exerciseEdit, checkAnswer: false, showAnswer: false })
  }

  showAnswer = () => {
    let exerciseEdit = this.state.Exercise;
    for (let [key, _value] of Object.entries(exerciseEdit.Exercise.CurrentAnswer.part1)) {
      exerciseEdit.Exercise.CurrentAnswer.part1[key].event = exerciseEdit.Exercise.CorrectAnswer.part1[key].event;
      exerciseEdit.Exercise.CurrentAnswer.part1[key].time = exerciseEdit.Exercise.CorrectAnswer.part1[key].time;
    }
    exerciseEdit.Exercise.CurrentAnswer.part2 = exerciseEdit.Exercise.CorrectAnswer.part2;
    this.setState({ Exercise: exerciseEdit, checkAnswer: false, showAnswer: true })
  }

  checkAnswer = () => {
    this.setState({ checkAnswer: true });
    for (let [key, _value] of Object.entries(this.state.Exercise.Exercise.CurrentAnswer.part1)) {
      if (this.state.Exercise.Exercise.CurrentAnswer.part1[key].time) {
        if (
          this.state.Exercise.Exercise.CurrentAnswer.part1[key].event != this.state.Exercise.Exercise.CorrectAnswer.part1[key].event ||
          this.state.Exercise.Exercise.CurrentAnswer.part1[key].time != this.state.Exercise.Exercise.CorrectAnswer.part1[key].time
        ) {
          return;
        }
      } else {
        if (this.state.Exercise.Exercise.CurrentAnswer.part1[key].event != this.state.Exercise.Exercise.CorrectAnswer.part1[key].event) {
          return;
        }
      }
    } if (
      JSON.stringify(this.state.Exercise.Exercise.CurrentAnswer.part2.sort(
        (a, b) => (a.event > b.event) ? 1 : -1
      )) != JSON.stringify(this.state.Exercise.Exercise.CorrectAnswer.part2.sort(
        (a, b) => (a.event > b.event) ? 1 : -1
      ))
    ) {
      return;
    }
    this.setState({ showAlertModal: true });
    return;
  }

  pushToPart2 = () => {
    let exerciseEdit = this.state.Exercise;
    exerciseEdit.Exercise.CurrentAnswer.part2.push({ event: this.state.part2SelectedEvent, time: this.state.part2SelectedTime });
    this.setState({ Exercise: exerciseEdit, showPart2Modal: false })
  }

  removeFromPart2 = (index) => {
    let exerciseEdit = this.state.Exercise;
    console.log(index)
    exerciseEdit.Exercise.CurrentAnswer.part2.splice(index, 1);
    this.setState({ Exercise: exerciseEdit, checkAnswer: false })
  }

  ModalContent = () => {
    return (
      <React.Fragment>
        <View style={styles.ModalCover} contentContainerStyle={styles.ModalInner}>
          <ScrollView style={styles.DropDownCover} contentContainerStyle={styles.ModalInner}>
          <View style={{height : WindowHeight/4}}></View>
            {this.state.ModalOptionList.map((option, index) => {
              return (
                <TouchableOpacity key={index} style={[styles.DropDownItem, {
                  backgroundColor:
                    this.state.Exercise.Exercise.CurrentAnswer.part1[this.state.ModalLine][this.state.ModalType] == option.short ? '#F8A01D' : '#ffffff'
                }]} onPress={() => {
                  let exerciseEdit = this.state.Exercise;
                  exerciseEdit.Exercise.CurrentAnswer.part1[this.state.ModalLine][this.state.ModalType] = option.short;
                  this.setState({ Exercise: exerciseEdit }, () => {
                    this.setState({ showModal: false });
                  })
                }}>
                  <View style={styles.DropDownRadioCover}>
                    {/* <Image source={
                      this.state.Exercise.Exercise.CurrentAnswer[this.state.ModalLine][this.state.ModalType]==option ? 
                      RadioCircleHL : RadioCircle} style={styles.RadioCircle} /> */}
                    <Text style={styles.Line1TextModal}>{index + 1})</Text>
                  </View>
                  <View style={styles.DropDownTextCover}>
                    <Text style={styles.Line1TextModal}>{option.full}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
            <View style={styles.BottomPadding}></View>
          </ScrollView>
        </View>
      </React.Fragment>
    )
  }

  AlertModalContent = () => {
    return (
      <View style={styles.AlertModalBackground}>
        <View style={styles.AlertModalCover}>
          <View style={styles.AlertModalTextCover}>
            <Text style={styles.Line1TextModal}>You got it right!</Text>
          </View>
          <TouchableOpacity style={styles.AlertModalCancelCover} onPress={() => this.setState({ showAlertModal: false })}>
            <Text style={styles.AlertModalCancelText}>DISMISS</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  Event = (index, EventHeading, Event, Time) => {
    return (
      <View style={[styles.EventSectionCover, this.getEventBackGroundColor(Event, EventHeading, Time)]} key={index}>
        <View style={styles.EventSectionLeft}>
          <Text style={[styles.EventLine2Text, { color: this.state.checkAnswer ? '#ffffff' : '#474747' }]}>{EventHeading}</Text>
          <TouchableOpacity style={styles.PickerCover} disabled={this.state.showAnswer} onPress={() => {
            this.setState(
              {
                ModalOptionList: this.state.Exercise.Exercise.Question.part1[index].eventOptions,
                ModalLine: EventHeading,
                ModalType: "event",
                checkAnswer: false,
                showAnswer: false
              }, () => {
                this.setState({ showModal: true })
              })
          }}>
            <View style={styles.PickerTextCover}>
              <Text style={[styles.EventLine1Text, { color: this.state.checkAnswer ? '#ffffff' : '#595959' }]}>{Event}</Text>
            </View>
            <View style={styles.PickerIconCover}>
              <Image source={PickerIcon} style={styles.PickerIcon} />
            </View>
          </TouchableOpacity>
        </View>
        {
          Time &&
          <View style={styles.EventSectionRight}>
            <Text style={[styles.EventLine2Text, { color: this.state.checkAnswer ? '#ffffff' : '#474747' }]}>{"time"}</Text>
            <TouchableOpacity style={styles.PickerCover} disabled={this.state.showAnswer} onPress={() => {
              this.setState({
                ModalOptionList: this.state.Exercise.Exercise.Question.part1[index].timeOptions,
                ModalLine: EventHeading,
                ModalType: "time",
                checkAnswer: false,
                showAnswer: false
              }, () => {
                this.setState({ showModal: true })
              })
            }}>
              <View style={styles.PickerTextCover}>
                <Text style={[styles.EventLine1Text, { color: this.state.checkAnswer ? '#ffffff' : '#595959' }]}>{Time}</Text>
              </View>
              <View style={styles.PickerIconCover}>
                <Image source={PickerIcon} style={styles.PickerIcon} />
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }

  part2Event = ({ event, time }, index) => {
    return (
      <View key={index} style={styles.Part2ItemCover}>
        <View style={styles.Part2ItemLeft}>
          <Text style={styles.Part2ItemText}>{`${event} (${time})`}</Text>
        </View>
        <View style={styles.Part2ItemRight}>
          <TouchableOpacity onPress={() => this.removeFromPart2(index)}>
            <Image source={cancelIcon} style={styles.Part2Icon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  Part2ModalContent = () => {
    return (
      <React.Fragment>
        <ScrollView style={styles.ModalCover} contentContainerStyle={styles.EventModalInner}>
          <View style={[styles.ModalEventSectionCover, { backgroundColor: '#e0e0e0' }]}>
            <View style={styles.ModalEventItem}>
              <Text style={[styles.EventLine2Text, { color: '#474747' }]}>{"Event"}</Text>
              <Picker
                selectedValue={this.state.part2SelectedEvent}
                style={{ height: WindowHeight / 15, width: '100%' }}
                mode={'dropdown'}
                itemStyle={{ fontFamily: 'OpenSans-Regular', fontSize: (WindowWidth / 21) }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ part2SelectedEvent: itemValue })
                }>
                {
                  this.state.Exercise.Exercise.Question.part2.eventOptions.map((option, index) => {
                    return (<Picker.Item key={index} label={option.full} value={option.full} />)
                  })
                }
              </Picker>
            </View>
            <View style={styles.ModalEventItem}>
              <Text style={[styles.EventLine2Text, { color: '#474747' }]}>{"Time"}</Text>
              <Picker
                selectedValue={this.state.part2SelectedTime}
                style={{ height: WindowHeight / 15, width: '100%' }}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ part2SelectedTime: itemValue })
                }>
                {
                  this.state.Exercise.Exercise.Question.part2.timeOptions.map((option, index) => {
                    return (<Picker.Item key={index} label={option.full} value={option.full} />)
                  })
                }
              </Picker>
            </View>
            <View style={styles.EventModalButtonCover}>
              <TouchableOpacity onPress={() => this.setState({ showPart2Modal: false })} style={[styles.EventModalButton, { borderRightColor: '#595959', borderRightWidth: 0.6 }]}>
                <Text style={styles.EventModalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pushToPart2()} style={[styles.EventModalButton, { borderLeftColor: '#595959', borderLeftWidth: 0.6 }]}>
                <Text style={styles.EventModalAddText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  handleTextSizeChange = (size) => {
    this.setState({ fontSizeIncrement: size })
  }

  FirstRoute = () => {
    return (
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
    )
  };

  SecondRoute = () => {
    return (
      <ScrollView style={styles.Body}>
        <View style={styles.SectionsWrapper}>
          {
            this.state.Exercise.Exercise.Question.part1.map((question, index) => {
              return this.Event(
                index,
                question.line,
                this.state.Exercise.Exercise.CurrentAnswer.part1[question.line].event,
                this.state.Exercise.Exercise.CurrentAnswer.part1[question.line].time,
              )
            })
          }
          <View style={[styles.Part2EventSectionCover, this.getPart2BackgroundColor()]}>
            <Text style={styles.EventLine2Text}>
              {"Part 2 - Other significant conditions contributing to death"}
            </Text>
            <View style={styles.Part2EventSectionInner}>
              {
                this.state.Exercise.Exercise.CurrentAnswer.part2.map((answer, index) => {
                  return (this.part2Event(answer, index))
                })
              }
              <TouchableOpacity onPress={() => this.setState({ showPart2Modal: true, checkAnswer: false })}>
                <Image source={addIcon} style={styles.addEventIcon} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        <View style={styles.Button2Cover}>
          <TouchableOpacity style={{ width: '50%', alignItems: 'flex-start' }} onPress={() => this.resetAnswer()} disabled={!this.state.checkAnswer && !this.state.showAnswer}>
            <FullWidthButton width={'97%'} color={'#F8A01D'} disabledColor={'#e0e0e0'} icon={require('../../assets/resetAnswer.png')} disabledIcon={require('../../assets/resetAnswerDisabled.png')} disabled={!this.state.checkAnswer && !this.state.showAnswer} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: '50%', alignItems: 'flex-end' }} onPress={() => this.showAnswer()} iconDisabled={require('../../assets/viewAnswerDisabled.png')} disabled={!this.state.checkAnswer}>
            <FullWidthButton width={'97%'} color={'#F8A01D'} disabledColor={'#e0e0e0'} icon={require('../../assets/viewAnswer.png')} disabled={!this.state.checkAnswer} disabledIcon={require('../../assets/viewAnswerDisabled.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.Button1Cover} onPress={() => this.checkAnswer()} disabled={this.state.showAnswer || this.state.checkAnswer}>
          <FullWidthButton fill={'solid'} color={'#F8A01D'} buttonText={' CHECK ANSWER '} disabled={this.state.showAnswer || this.state.checkAnswer} />
        </TouchableOpacity>
        <View style={styles.BottomPadding}>

        </View>
      </ScrollView>
    )
  }

  render() {
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
          renderScene={({ route }) => {
            switch (route.key) {
              case 'first':
                return <this.FirstRoute />
              case 'second':
                return <this.SecondRoute />
              default:
                return null;
            }
          }}
          onIndexChange={index => this.setState({ index })}
          renderTabBar={renderTabBar}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <this.ModalContent />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showAlertModal}
          onRequestClose={() => this.setState({ showAlertModal: false })}
        >
          <this.AlertModalContent />
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showPart2Modal}
          onRequestClose={() => this.setState({ showAlertModal: false })}
        >
          <this.Part2ModalContent />
        </Modal>
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
  EventLine1Text: {
    fontFamily: 'OpenSans-Regular',
    fontSize: (WindowWidth / 21)
  },
  EventLine2Text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: (WindowWidth / 28),
    lineHeight: (WindowWidth / 28) + 10
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

  Part2EventSectionCover: {
    paddingRight: WindowWidth / 20,
    paddingTop: WindowWidth / 25,
    paddingBottom: WindowWidth / 25,
    paddingLeft: WindowWidth / 20,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: WindowHeight / 40
  },
  Part2EventSectionInner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: WindowWidth / 25
  },
  addEventIcon: {
    height: WindowWidth / 8,
    width: WindowWidth / 8
  },
  Part2ItemCover: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    paddingTop: WindowWidth / 30,
    paddingBottom: WindowWidth / 30,
    paddingLeft: WindowWidth / 25,
    paddingRight: WindowWidth / 25,
    borderRadius: 10,
    marginBottom: WindowHeight / 40,
    display: 'flex',
    flexDirection: 'row'
  },
  Part2ItemLeft: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  Part2ItemRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor : 'blue'
  },
  Part2ItemText: {
    color: '#595959',
    fontFamily: 'OpenSans-Regular',
    fontSize: (WindowWidth / 25)
  },
  Part2Icon: {
    width: WindowWidth / 15,
    height: WindowWidth / 15
  },

  /** Modal styles */
  ModalCover: {
    height: WindowHeight,
    width: WindowWidth,
    backgroundColor: '#212121f1',
  },
  ModalInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  DropDownCover: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  DropDownItem: {
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 50,
    paddingLeft: WindowWidth / 25,
    paddingRight: WindowWidth / 20,
    marginBottom: WindowHeight / 60,
    borderRadius: 10,
    flexDirection: 'row',
    width: '85%',
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
  },

  /** Alert Modal */
  AlertModalBackground: {
    height: WindowHeight,
    width: WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121a1',
    // backgroundColor: '#212121f1',
  },
  AlertModalCover: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 8
  },
  AlertModalTextCover: {
    marginTop: WindowHeight / 30,
    marginBottom: WindowHeight / 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AlertModalCancelCover: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 50,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1
  },
  AlertModalCancelText: {
    color: '#F8A01D',
    fontFamily: 'Roboto-Medium'
  },
  /**Part2 ModalStyles */
  EventModalInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: WindowWidth / 20,
    paddingLeft: WindowWidth / 20,
  },
  ModalEventSectionCover: {
    // paddingRight: WindowWidth / 20,
    paddingTop: WindowWidth / 25,
    // paddingBottom: WindowWidth / 25,
    // paddingLeft: WindowWidth / 20,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: WindowHeight / 40
  },
  ModalEventItem: {
    paddingRight: WindowWidth / 20,
    paddingLeft: WindowWidth / 20,
  },
  EventModalButtonCover: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: WindowHeight / 40
  },
  EventModalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingTop: WindowHeight / 50,
    paddingBottom: WindowHeight / 50,
    borderTopColor: '#595959',
    borderTopWidth: 1
  },
  EventModalAddText: {
    // color: '#F8A01D',
    fontFamily: 'Roboto-Medium'
  },
  EventModalCancelText: {
    fontFamily: 'Roboto-Medium'
  }
})
