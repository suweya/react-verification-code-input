# react-verification-code-input

> 🎉A verification code input

[![NPM](https://img.shields.io/npm/v/react-verification-code-input.svg)](https://www.npmjs.com/package/react-verification-code-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![NPM](https://nodei.co/npm/react-verification-code-input.png)](https://nodei.co/npm/react-verification-code-input/)

## Live demo

- [Demo](https://suweya.github.io/react-verification-code-input/)

## Install

```bash
npm install --save react-verification-code-input
```

## Usage

```jsx
import React, { Component } from 'react';

import ReactCodeInput from 'react-verification-code-input';

class Example extends Component {
  render() {
    return <ReactCodeInput />;
  }
}
```

## PropTypes

|     Key     |  Type  |              Desc               |
| :---------: | :----: | :-----------------------------: |
|    type     |  text  |      one of number or text      |
|   fields    | number |     The count of characters     |
|  onChange   |  func  |   Trigger on character change   |
| onComplete  |  func  | Trigger on all character inputs |
| fieldWidth  | number |           input width           |
| fieldHeight | number |          input height           |
|  autoFocus  |  bool  | auto focus first input on init  |
|    title    | string |        code input title         |
|   loading   |  bool  |        show loading flag        |
|  className  | string |           class name            |
|   values    | array  |         default values          |
| placeholder | array  |        input placeholder        |

## License

MIT © [suweya](https://github.com/suweya)
