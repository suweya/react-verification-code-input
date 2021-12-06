import React, { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ReactCodeInput, { CODE } from '.';

const TestComponent = () => {
  const ref = useRef(null);

  return (
    <>
      <button type="button" onClick={() => ref.current.clearValues()}>
        Clean code input
      </button>
      <ReactCodeInput ref={ref} fields={3} />
    </>
  );
};

describe('<ReactCodeInput /> tests', () => {
  it('should render <ReactCodeInput /> and change focus', () => {
    const { container } = render(<ReactCodeInput />);
    const inputs = container.querySelectorAll('input');

    for (let i = 0; i < inputs.length - 1; i += 1) {
      fireEvent.change(inputs[i], { target: { value: '1' } });
      expect(inputs[i + 1]).toHaveFocus();
    }
  });

  it('should set the number of inputs', () => {
    const { container } = render(<ReactCodeInput fields={2} />);
    const inputs = container.querySelectorAll('input');

    expect(inputs.length).toBe(2);
  });

  it('should call onComplete', () => {
    const onComplete = jest.fn();

    const { container } = render(<ReactCodeInput onComplete={onComplete} />);
    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      fireEvent.change(inputs[i], { target: { value: i } });
    }

    expect(onComplete).toBeCalled();
  });

  it('should call clearValues', () => {
    const { container } = render(<TestComponent />);
    const inputs = container.querySelectorAll('input');

    for (let i = 0; i < inputs.length - 1; i += 1) {
      fireEvent.change(inputs[i], { target: { value: i } });
    }

    fireEvent.click(screen.getByText('Clean code input'));

    for (let i = 0; i < inputs.length - 1; i += 1) {
      expect(inputs[i].value).toBe('');
    }
  });

  it('should set some values and split it into chunks', () => {
    const { container } = render(<ReactCodeInput values="1111" fields={4} />);

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].value).toBe('1');
    }
  });

  it('should split long values', () => {
    const { container } = render(<ReactCodeInput fields={4} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.change(inputs[0], { target: { value: '1111' } });

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].value).toBe('1');
    }
  });

  it('should stay focused on the last input if the value length is bigger than a number of inputs', () => {
    const { container } = render(<ReactCodeInput fields={4} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.change(inputs[0], { target: { value: '11111' } });

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].value).toBe('1');
    }

    expect(inputs[3]).toHaveFocus();
  });

  it('should not change the focus if the value is empty', () => {
    const { container } = render(<ReactCodeInput fields={4} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '' } });

    expect(inputs[1]).toHaveFocus();

    fireEvent.change(inputs[1], { target: { value: 'r' } });

    expect(inputs[1].value).toBe('');
    expect(inputs[1]).toHaveFocus();
  });

  it('should change the focus on keyDown', () => {
    const { container } = render(<ReactCodeInput fields={2} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.keyDown(inputs[0], { code: CODE.right });
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { code: CODE.right });
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { code: CODE.left });
    expect(inputs[0]).toHaveFocus();

    fireEvent.keyDown(inputs[0], { code: CODE.left });
    expect(inputs[0]).toHaveFocus();

    fireEvent.keyDown(inputs[0], { code: CODE.up });
    expect(inputs[0]).toHaveFocus();

    fireEvent.keyDown(inputs[0], { code: CODE.down });
    expect(inputs[0]).toHaveFocus();

    fireEvent.keyDown(inputs[0], { code: 'Digit1' });
    expect(inputs[0]).toHaveFocus();
  });

  it('should delete value and set focus to the previous field on backspace', () => {
    const { container } = render(<ReactCodeInput values="11" fields={3} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.keyDown(inputs[2], { code: CODE.backspace });
    expect(inputs[2].value).toBe('');
    expect(inputs[1]).toHaveFocus();

    fireEvent.keyDown(inputs[1], { code: CODE.backspace });
    expect(inputs[1].value).toBe('');
    expect(inputs[0]).toHaveFocus();

    fireEvent.keyDown(inputs[0], { code: CODE.backspace });
    expect(inputs[0].value).toBe('');
    expect(inputs[0]).toHaveFocus();
  });

  it('should delete value and set focus to the previous field on backspace 2', () => {
    const { container } = render(<ReactCodeInput values="11" fields={2} />);

    const inputs = container.querySelectorAll('input');

    fireEvent.keyDown(inputs[1], { code: CODE.backspace });
    expect(inputs[1].value).toBe('');
    expect(inputs[0]).toHaveFocus();
  });

  it('should show loading component', () => {
    const { container } = render(
      <ReactCodeInput loading values="11" fields={2} />
    );

    const loader = container.querySelector('.loading');

    expect(!!loader).toBe(true);
  });

  it('should render inputs with IDs', () => {
    const { container } = render(
      <ReactCodeInput id="test-id" values="11" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].getAttribute('id')).toBe(`test-id-${i}`);
    }
  });

  it('should render inputs as a "number" type', () => {
    const { container } = render(
      <ReactCodeInput type="number" values="11" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].getAttribute('type')).toBe('tel');
      expect(inputs[i].getAttribute('pattern')).toBe('[0-9]*');
    }
  });

  it('should render inputs as a "text" type', () => {
    const { container } = render(
      <ReactCodeInput type="text" values="11" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].getAttribute('type')).toBe('text');
      expect(inputs[i].getAttribute('pattern')).toBe(null);
    }
  });

  it('should render inputs as a required', () => {
    const { container } = render(
      <ReactCodeInput required values="11" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].hasAttribute('required')).toBe(true);
    }
  });

  it('should render inputs as a disabled', () => {
    const { container } = render(
      <ReactCodeInput disabled values="11" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].hasAttribute('disabled')).toBe(true);
    }
  });

  it('should render inputs with placeholders', () => {
    const { container } = render(
      <ReactCodeInput
        placeholder={['test-placeholder-1', 'test-placeholder-2']}
        fields={2}
      />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].getAttribute('placeholder')).toBe(
        `test-placeholder-${i + 1}`
      );
    }
  });

  it('should render inputs with a placeholder (string)', () => {
    const { container } = render(
      <ReactCodeInput placeholder="test-placeholder" fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].getAttribute('placeholder')).toBe('test-placeholder');
    }
  });

  it('should render inputs with classes', () => {
    const { container } = render(
      <ReactCodeInput
        className="wrapper-test-class"
        inputClassNames={['test-class-1', 'test-class-2']}
        fields={2}
      />
    );

    expect(!!container.querySelector('.wrapper-test-class')).toBe(true);

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].classList.contains(`test-class-${i + 1}`)).toBe(true);
    }
  });

  it('should render inputs with class (string)', () => {
    const { container } = render(
      <ReactCodeInput
        className="wrapper-test-class"
        inputClassNames="test-class"
        fields={2}
      />
    );

    expect(!!container.querySelector('.wrapper-test-class')).toBe(true);

    const inputs = container.querySelectorAll('input');

    for (let i = 0; i <= inputs.length - 1; i += 1) {
      expect(inputs[i].classList.contains('test-class')).toBe(true);
    }
  });

  it('should set autoFocus', () => {
    const { container } = render(<ReactCodeInput fields={2} />);

    const inputs = container.querySelectorAll('input');

    expect(document.activeElement).toBe(inputs[0]);
    expect(inputs[0]).toHaveFocus();
  });

  it('should not set autoFocus', () => {
    const { container } = render(
      <ReactCodeInput autoFocus={false} fields={2} />
    );

    const inputs = container.querySelectorAll('input');

    expect(document.activeElement === inputs[0]).toBeFalsy();
  });
});
