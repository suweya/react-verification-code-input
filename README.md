# react-code-input

> 🎉A verification code input

[![NPM](https://img.shields.io/npm/v/react-code-input.svg)](https://www.npmjs.com/package/react-code-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-code-input
```

## Usage

```jsx
import React, { Component } from 'react'

import ReactCodeInput from 'react-code-input'

class Example extends Component {
  render () {
    return (
      <ReactCodeInput />
    )
  }
}
```

## PropTypes

| Key        |  Type  | Desc  |
| :---------:| :------:| :--: |
| fields     | number | The count of characters  |
| onChange   | func   | Trigger on character change  |
| onComplete | func   | Trigger on all character inputs  |

## License

MIT © [suweya](https://github.com/suweya)
