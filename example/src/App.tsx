import React, { useRef } from 'react';
import ReactCodeInput from 'react-verification-code-input';

const STYLE = {
  width: '350px',
  margin: '50px auto'
};

const App: React.FC = () => {
  const input = useRef(null);

  const handleChange = (vals: string): void => {
    if (vals.length >= 6) {
      console.log('complete, ', vals);
    } else if (vals.length === 0) {
      console.log('empty, ', vals);
    }
  };

  return (
    <div style={STYLE}>
      <ReactCodeInput
        ref={input}
        className='custom-class'
        onChange={handleChange}
        onComplete={val => console.log('complete', val)}
      />
    </div>
  );
};

export default App;
