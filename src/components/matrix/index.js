import React from 'react';
import immutable, { List } from 'immutable';
import classnames from 'classnames';
import propTypes from 'prop-types';

import { isClear } from '../../unit/';
import { fillLine, blankLine } from '../../unit/const';
import states from '../../control/states';
import { View,Box,Plane,Text } from 'react-vr';

const style = {
  matrix:{
    transform: [{translate: [0, 0, -45]}]
  },
  row:{
    flexDirection :'row'
  },
  box:{
    borderWidth: 0.8,
    borderColor:'white'
  },
  block:{

  },
  block0:{
      color:'black'
  },
  block1:{
      color:'grey'
  }
};
const t = setTimeout;

export default class Matrix extends React.Component {
  constructor() {
    super();
    this.state = {
      clearLines: false,
      animateColor: 2,
      isOver: false,
      overState: null,
    };
  }
  componentWillReceiveProps(nextProps = {}) {
    const clears = isClear(nextProps.matrix);
    const overs = nextProps.reset;
    this.setState({
      clearLines: clears,
      isOver: overs,
    });
    if (clears && !this.state.clearLines) {
      this.clearAnimate(clears);
    }
    if (!clears && overs && !this.state.isOver) {
      this.over(nextProps);
    }
  }
  shouldComponentUpdate(nextProps = {}) {
    const props = this.props;
    return !(
      immutable.is(nextProps.matrix, props.matrix) &&
      immutable.is(
        (nextProps.cur && nextProps.cur.shape),
        (props.cur && props.cur.shape)
      ) &&
      immutable.is(
        (nextProps.cur && nextProps.cur.xy),
        (props.cur && props.cur.xy)
      )
    ) || this.state.clearLines
    || this.state.isOver;
  }
  getResult(props = this.props) {
    const cur = props.cur;
    const shape = cur && cur.shape;
    const xy = cur && cur.xy;

    let matrix = props.matrix;
    const clearLines = this.state.clearLines;
    if (clearLines) {
      const animateColor = this.state.animateColor;
      clearLines.forEach((index) => {
        matrix = matrix.set(index, List([
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
          animateColor,
        ]));
      });
    } else if (shape) {
      shape.forEach((m, k1) => (
        m.forEach((n, k2) => {
          if (n && xy.get(0) + k1 >= 0) { // 竖坐标可以为负
            let line = matrix.get(xy.get(0) + k1);
            let color;
            if (line.get(xy.get(1) + k2) === 1 && !clearLines) { // 矩阵与方块重合
              color = 2;
            } else {
              color = 1;
            }
            line = line.set(xy.get(1) + k2, color);
            matrix = matrix.set(xy.get(0) + k1, line);
          }
        })
      ));
    }
    return matrix;
  }
  clearAnimate() {
    const anima = (callback) => {
      t(() => {
        this.setState({
          animateColor: 0,
        });
        t(() => {
          this.setState({
            animateColor: 2,
          });
          if (typeof callback === 'function') {
            callback();
          }
        }, 100);
      }, 100);
    };
    anima(() => {
      anima(() => {
        anima(() => {
          t(() => {
            states.clearLines(this.props.matrix, this.state.clearLines);
          }, 100);
        });
      });
    });
  }
  over(nextProps) {
    let overState = this.getResult(nextProps);
    this.setState({
      overState,
    });

    const exLine = (index) => {
      if (index <= 19) {
        overState = overState.set(19 - index, List(fillLine));
      } else if (index >= 20 && index <= 39) {
        overState = overState.set(index - 20, List(blankLine));
      } else {
        states.overEnd();
        return;
      }
      this.setState({
        overState,
      });
    };

    for (let i = 0; i <= 40; i++) {
      t(exLine.bind(null, i), 40 * (i + 1));
    }
  }
  render() {
    let matrix;
    if (this.state.isOver) {
      matrix = this.state.overState;
    } else {
      matrix = this.getResult();
    }
    let cell = [];
    matrix.map((row,rowNum)=>{
        row.map((block,blockNum)=>{
            cell.push(block);
        });
    });
    return (
      <View style={style.matrix}>
      {
        matrix.map((row, rowNum) => (
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

Matrix.propTypes = {
  matrix: propTypes.object.isRequired,
  cur: propTypes.object,
  reset: propTypes.bool.isRequired,
};
