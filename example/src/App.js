import React, { Component } from 'react';

import ReactCodeInput from 'react-code-input';

export default class App extends Component {
  render() {
    return (
      <div>
        <ReactCodeInput
          fields={5}
          onChange={v => console.log(v)}
          onComplete={v => console.log(`complete : ${v}`)}
        />
      </div>
    );
  }
}
