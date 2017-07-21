import React from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';

import Button from './button';
import store from '../../store';
import todo from '../../control/todo';
import { i18n, lan } from '../../unit/const';
import { View,Text,VrButton } from 'react-vr';
const style = {
  r:{
    borderWidth:0.8,
    borderColor:'white',
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [30, 0, -90]},{rotateY:-15}]
  },
  rText:{
    fontSize: 10,
    color:'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
};

export default class Keyboard extends React.Component {

  constructor(props){
    super(props);
    this.onRotate = this.onRotate.bind(this);
  }

  render() {
    return (
      <VrButton style={style.r} onClick={this.onRotate}>
        <Text style={style.rText}>
          R
        </Text>
      </VrButton>
    );
  }

  onRotate(){
    
  }

}

Keyboard.propTypes = {
  keyboard: propTypes.object.isRequired,
};
