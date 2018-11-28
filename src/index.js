import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

export default class ReactCodeInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    fields: PropTypes.number,
    loading: PropTypes.bool,
    title: PropTypes.string,
    fieldWidth: PropTypes.number,
    fieldHeight: PropTypes.number,
    autoFocus: PropTypes.bool
  };

  static defaultProps = {
    fields: 6,
    fieldWidth: 58,
    fieldHeight: 54,
    autoFocus: true
  };

  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      values: Array(fields).fill('')
    };

    this.iRefs = [];
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(React.createRef());
    }
    this.id = +new Date();

    this.handleKeys = Array(fields).fill(false);
  }

  triggerChange = (values = this.state.values) => {
    const { onChange, onComplete, fields } = this.props;
    const val = values.join('');
    onChange && onChange(val);
    if (onComplete && val.length >= fields) {
      onComplete(val);
    }
  };

  onChange = e => {
    const index = parseInt(e.target.dataset.id);
    this.handleKeys[index] = false;
    if (!e.target.validity.valid) {
      return;
    }
    const { fields } = this.props;
    const nextIndex = index + 1;
    const next = this.iRefs[nextIndex];
    const value = e.target.value;
    let { values } = this.state;
    if (value.length > 1) {
      if (nextIndex < fields) {
        const split = value.split('');
        const last = split[split.length - 1];
        values[nextIndex] = last;
        this.setState({ values });
      }
    } else {
      values = Object.assign([], values);
      values[index] = value;
      this.setState({ values });
    }

    if (next) {
      next.current.focus();
      next.current.select();
    }

    this.triggerChange(values);
  };

  onKeyDown = e => {
    const index = parseInt(e.target.dataset.id);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = this.iRefs[prevIndex];
    const next = this.iRefs[nextIndex];
    switch (e.keyCode) {
      case KEY_CODE.backspace:
        e.preventDefault();
        const vals = [...this.state.values];
        if (this.state.values[index]) {
          vals[index] = '';
          this.setState({ values: vals });
          this.triggerChange();
        } else if (prev) {
          vals[prevIndex] = '';
          prev.current.focus();
          this.setState({ values: vals });
          this.triggerChange();
        }
        break;
      case KEY_CODE.left:
        e.preventDefault();
        if (prev) {
          prev.current.focus();
        }
        break;
      case KEY_CODE.right:
        e.preventDefault();
        if (next) {
          next.current.focus();
        }
        break;
      case KEY_CODE.up:
      case KEY_CODE.down:
        e.preventDefault();
        break;
      default:
        this.handleKeys[index] = true;
        break;
    }
  };

  onKeyUp = e => {
    const index = parseInt(e.target.dataset.id);
    if (this.handleKeys[index]) {
      this.handleKeys[index] = false;
      const next = this.iRefs[index + 1];
      if (next) {
        next.current.focus();
      }
    }
  };

  onFocus = e => {
    e.target.select(e);
  };

  render() {
    const { values } = this.state;
    const {
      loading,
      title,
      fieldHeight,
      fieldWidth,
      fields,
      autoFocus
    } = this.props;
    const INPUT_STYLE = {
      width: fieldWidth,
      height: fieldHeight
    };
    const ROOT_STYLE = {
      width: fields * fieldWidth
    };
    const LOADING_STYLE = {
      lineHeight: `${fieldHeight}px`
    };
    return (
      <div className={styles['react-code-input-container']} style={ROOT_STYLE}>
        {title && <p className={styles['title']}>{title}</p>}
        <div className={styles['react-code-input']}>
          {values.map((value, index) => (
            <input
              type="text"
              pattern="[0-9]*"
              autoFocus={autoFocus && index === 0}
              style={INPUT_STYLE}
              key={`${this.id}-${index}`}
              data-id={index}
              value={value}
              ref={this.iRefs[index]}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              onKeyUp={this.onKeyUp}
              onFocus={this.onFocus}
            />
          ))}
        </div>
        {loading && (
          <div className={styles['loading']} style={LOADING_STYLE}>
            <div className={styles['blur']} />
            <svg
              className={styles['spin']}
              viewBox="0 0 1024 1024"
              data-icon="loading"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill="#006fff"
                d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
}
