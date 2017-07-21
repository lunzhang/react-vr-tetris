import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

import { transform } from '../../../unit/const';
import { View } from 'react-vr';

const style = {

};

export default class Button extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }
  render() {
    const {
      active, color, size, top, left, label, position, arrow,
    } = this.props;
    return (
      <View className={cn({ [style.button]: true, [style[color]]: true, [style[size]]: true })}
        style={{ top, left }} >
      </View>
    );
  }
}

Button.propTypes = {
  color: propTypes.string.isRequired,
  size: propTypes.string.isRequired,
  top: propTypes.number.isRequired,
  left: propTypes.number.isRequired,
  label: propTypes.string.isRequired,
  position: propTypes.bool,
  arrow: propTypes.string,
  active: propTypes.bool.isRequired,
};
