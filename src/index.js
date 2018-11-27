import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

export default class ReactCodeInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    fields: PropTypes.number
  };

  static defaultProps = {
    fields: 6
  };

  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      values: Array(fields).fill('')
    };
  }

  render() {
    const { values } = this.state;
    return (
      <div className={styles['react-code-input']}>
        {values.map(value => (
          <input value={value} />
        ))}
      </div>
    );
  }
}
