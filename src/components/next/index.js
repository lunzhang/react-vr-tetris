import React from 'react';
import propTypes from 'prop-types';

import { blockShape } from '../../unit/const';
import { View,Box } from 'react-vr';
const style = {
  next:{
    transform: [{translate: [3.8, -2, -40]}],
  },
  row:{
    flexDirection :'row'
  },
  box:{
    borderWidth: 0.7,
    borderColor:'white'
  },
  block:{

  },
  block0:{
    color:'black'
  },
  block1:{
    color:'#4CAF50'
  },
  block2:{
    color:'#F44336'
  }
};
const xy = { // 方块在下一个中的坐标
  I: [1, 0],
  L: [0, 0],
  J: [0, 0],
  Z: [0, 0],
  S: [0, 0],
  O: [0, 1],
  T: [0, 0],
};

const empty = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default class Next extends React.Component {
  constructor() {
    super();
    this.state = {
      block: empty,
    };
  }
  componentWillMount() {
    this.build(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
    this.build(nextProps.data);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data;
  }
  build(type) {
    const shape = blockShape[type];
    const block = empty.map(e => ([...e]));
    shape.forEach((m, k1) => {
      m.forEach((n, k2) => {
        if (n) {
          block[k1 + xy[type][0]][k2 + xy[type][1]] = 1;
        }
      });
    });
    this.setState({ block });
  }
  render() {
    return (
      <View style={style.next}>
      {
        this.state.block.map((row, rowNum) => (
          <View style={[style.row]} key={rowNum}>
          {
            row.map((block, blockNum) => (
              <View style={[style.box]} key={blockNum}>
              <Box style={style['block'+block]}/>
              </View>
            ))
          }
          </View>
        ))
      }
      </View>
    );
  }
}

Next.propTypes = {
  data: propTypes.string,
};
