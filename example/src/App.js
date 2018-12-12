import React, { Component } from 'react';

import ReactCodeInput from 'react-verification-code-input';

const STYLE = {
  width: '350px',
  margin: '50px auto'
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  handleChange = vals => {
    if (vals.length >= 6) {
      console.log('complete, ', vals);
      setTimeout(() => {
        this.input.current.__clearvalues__();
      }, 3000);
    } else if (vals.length === 0) {
      console.log('empty, ', vals);
    }
  };

  render() {
    return (
      <div style={STYLE}>
        <ReactCodeInput
          ref={this.input}
          className="custom-class"
          onChange={this.handleChange}
          onComplete={val => console.log('complete', val)}
        />
      </div>
    );
  }
}
