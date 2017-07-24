import React from 'react';
import Immutable from 'immutable';
import propTypes from 'prop-types';

import store from '../../store';
import todo from '../../control/todo';
import { i18n, lan } from '../../unit/const';
import { View,Text,Sphere,VrButton } from 'react-vr';
const style = {
  keyboard:{
    transform: [{translate: [0, 0, -90]}]
  },
  options:{
    flexDirection: 'row',
    transform: [{translate: [7, 0, 0]}]
  },
  p:{
    borderWidth:0.5,
    borderColor:'white',
    margin:2,
    width:10
  },
  pText:{
    fontSize: 5,
    color:'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  m:{
    borderWidth:0.5,
    borderColor:'white',
    margin:2,
    width:10
  },
  mText:{
    fontSize: 5,
    color:'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  r:{
    borderWidth:0.5,
    borderColor:'white',
    margin:2,
    width:10
  },
  rText:{
    fontSize: 5,
    color:'red',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  arrows:{
    transform: [{translate: [15, -10, 0]}],
    flexDirection: 'row'
  },
  up:{
    transform: [{translate: [0, 7, 0]}]
  },
  down:{
    transform: [{translate: [0, -7, 0]}]
  },
  left:{
    transform: [{translate: [-7, 0, 0]}]
  },
  right:{
    transform: [{translate: [7, 0, 0]}]
  },
  space:{
    transform: [{translate: [25, -10, 0]}]
  }
};

export default class Keyboard extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={style.keyboard}>
        <View style={style.options}>
          <VrButton style={style.p} onButtonPress={()=>todo.p.down(store)} onButtonRelease={()=>todo.p.up(store)}>
            <Text style={style.pText}>
              P
            </Text>
          </VrButton>
          <VrButton style={style.m} onButtonPress={()=>todo.s.down(store)} onButtonRelease={()=>todo.s.up(store)}>
            <Text style={style.mText}>
              M
            </Text>
          </VrButton>
          <VrButton style={style.r} onButtonPress={()=>todo.r.down(store)} onButtonRelease={()=>todo.r.up(store)}>
            <Text style={style.rText}>
              R
            </Text>
          </VrButton>
        </View>
        <View style={style.arrows}>
          <VrButton style={style.up} onButtonPress={()=>todo.rotate.down(store)} onButtonRelease={()=>todo.rotate.up(store)}>
            <Sphere radius={3} widthSegments={100}/>
          </VrButton>
          <VrButton style={style.down} onButtonPress={()=>todo.down.down(store)} onButtonRelease={()=>todo.down.up(store)}>
            <Sphere radius={3} widthSegments={100}/>
          </VrButton>
          <VrButton style={style.left} onButtonPress={()=>todo.left.down(store)} onButtonRelease={()=>todo.left.up(store)}>
            <Sphere radius={3} widthSegments={100}/>
          </VrButton>
          <VrButton style={style.right} onButtonPress={()=>todo.right.down(store)} onButtonRelease={()=>todo.right.up(store)}>
            <Sphere radius={3} widthSegments={100}/>
          </VrButton>
        </View>
        <VrButton style={style.space} onButtonPress={()=>todo.space.down(store)} onButtonRelease={()=>todo.space.up(store)}>
          <Sphere radius={5} widthSegments={100}/>
        </VrButton>
      </View>
    );
  }
}

Keyboard.propTypes = {
  keyboard: propTypes.object.isRequired,
};
