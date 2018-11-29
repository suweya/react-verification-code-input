import React, { Component } from 'react';

import ReactCodeInput from 'react-verification-code-input';

const STYLE = {
  width: '350px',
  margin: '50px auto'
};

export default class App extends Component {
  handleChange = vals => {
    if (vals.length >= 6) {
      console.log('complete, ', vals);
    } else if (vals.length === 0) {
      console.log('empty, ', vals);
    }
  };

  render() {
    return (
      <div style={STYLE}>
        <ReactCodeInput
          onChange={this.handleChange}
          onComplete={this.handleChange}
        />
      </div>
    );
  }
}
