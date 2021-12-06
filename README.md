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
import React from 'react';

import ReactCodeInput from 'react-verification-code-input';

const Example = () => <ReactCodeInput />;
```

## PropTypes

| Key              |  Type                   | Default value | Desc                                                                                            |
| :--------------: | :---------------------: | :-----------: | :---------------------------------------------------------------------------------------------: |
| type             | `'text' \| 'number'`    | `'number'`    | one of 'number' or 'text'                                                                       |
| fields           | `number`                | `6`           | The count of characters                                                                         |
| onChange         | `(val: string) => void` | `undefined`   | Trigger on character change                                                                     |
| onComplete       | `(val: string) => void` | `undefined`   | Trigger on all character inputs                                                                 |
| autoFocus        | `boolean`               | `true`        | auto focus first input on init                                                                  |
| title            | `string`                | `undefined`   | code input title                                                                                |
| loading          | `boolean`               | `''`          | show loading flag                                                                               |
| className        | `string`                | `undefined`   | wrapper class name                                                                              |
| values           | `string \| string[]`    | `undefined`   | default values                                                                                  |
| placeholder      | `string \| string[]`    | `[]`          | input placeholder. If `string`, the one placeholder will be added to all inputs                 |
| inputClassNames  | `string \| string[]`    | `[]`          | input classnames. If `string`, the one class will be added to all inputs                        |
| disabled         | `boolean`               | `false`       | disables all inputs                                                                             |
| required         | `boolean`               | `false`       | sets all inputs to be required                                                                  |
| id               | `string`                | `undefined`   | adds id prefix to all inputs. If `id` is not defined, id of each input won]'t be befined either |
| loadingComponent | `JSX.Element`           | `Loader`      | custom loader component                                                                         |

## Methods
You can add `ref` to `ReactCodeInput` component to get access to methods

| Method           | Description                           |
| :--------------: | :-----------------------------------: |
| clearValues      | Will clear all inputs                 |

```jsx
import React from 'react';

import ReactCodeInput from 'react-verification-code-input';

const Example = () => {
  const codeInput = useRef(null);

  return (
    <>
      <button type="button" onClick={() => codeInput.current.clearValues()}>
        Clean code input
      </button>
      <ReactCodeInput ref={codeInput} />
    </>
  );
};
```

## License

MIT © [suweya](https://github.com/suweya)
