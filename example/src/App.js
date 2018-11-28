import React, { Component } from 'react';

import ReactCodeInput from 'react-verify-code-input';

const STYLE = {
  width: '350px',
  margin: '50px auto'
};

export default class App extends Component {
  render() {
    return (
      <div style={STYLE}>
        <ReactCodeInput
          fields={5}
          onChange={v => console.log(v)}
          onComplete={v => console.log(`complete : ${v}`)}
        />
      </div>
    );
  }
}
