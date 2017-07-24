import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';

import Matrix from '../components/matrix';
import Next from '../components/next';
import Pause from '../components/pause';
import Keyboard from '../components/keyboard';

import { transform, lastRecord, speeds, i18n, lan } from '../unit/const';
import { visibilityChangeEvent, isFocus } from '../unit/';
import states from '../control/states';

import { View,Text } from 'react-vr';

const style = {
  app:{
    flexDirection:'column',
    layoutOrigin:[0.25,0.5]
  },
  top:{
    flexDirection:'row',
    layoutOrigin:[0,-0.1]
  },
  bottom:{
    layoutOrigin:[0.25,0]
  },
  detail:{
    layoutOrigin:[0,0.45]
  },
  text:{
    transform: [{translate: [0, 0, -90]}],
    fontSize: 5,
    color:'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
};
class App extends React.Component {

  componentDidMount() {
    if (lastRecord) {
      if (lastRecord.cur && !lastRecord.pause) {
        const speedRun = this.props.speedRun;
        let timeout = speeds[speedRun - 1] / 2;
        timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
        states.auto(timeout);
      }
      if (!lastRecord.cur) {
        states.overStart();
      }
    } else {
      states.overStart();
    }
  }

  render() {
    return (
      <View style={style.app}>
        <View style={style.top}>
          <Matrix matrix={this.props.matrix} cur={this.props.cur} reset={this.props.reset} />
          <View style={style.detail}>
            <Text style={style.text}> Score </Text>
            <Text style={style.text}> {this.props.points} </Text>
            <Text style={style.text}> Clear Lines </Text>
            {
              this.props.cur ?
              <Text style={style.text}> {this.props.clearLines} </Text> :
              <Text style={style.text}> {this.props.startLines} </Text>
            }
            <Text style={style.text}> Level </Text>
            {
              this.props.cur ?
              <Text style={style.text}> {this.props.speedRun} </Text> :
              <Text style={style.text}> {this.props.speedStart} </Text>
            }
            <Text style={style.text}> Next </Text>
            <Next data={this.props.next} />
          </View>
        </View>
        <View style={style.bottom}>
          <Keyboard keyboard={this.props.keyboard} />
        </View>
      </View>
    );
  }
}

App.propTypes = {
  music: propTypes.bool.isRequired,
  pause: propTypes.bool.isRequired,
  matrix: propTypes.object.isRequired,
  next: propTypes.string.isRequired,
  cur: propTypes.object,
  dispatch: propTypes.func.isRequired,
  speedStart: propTypes.number.isRequired,
  speedRun: propTypes.number.isRequired,
  startLines: propTypes.number.isRequired,
  clearLines: propTypes.number.isRequired,
  points: propTypes.number.isRequired,
  max: propTypes.number.isRequired,
  reset: propTypes.bool.isRequired,
  drop: propTypes.bool.isRequired,
  keyboard: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
});

export default connect(mapStateToProps)(App);
