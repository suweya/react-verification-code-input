import React, {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  createRef
} from 'react';

import styles from './styles.css';

export const CODE = {
  backspace: 'Backspace',
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown'
};

interface ReactCodeInputRefInstance {
  clearValues(): void;
}

interface ReactCodeInputProps {
  type?: 'text' | 'number';
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  fields?: number;
  loading?: boolean;
  title?: string;
  autoFocus?: boolean;
  className?: string;
  inputClassNames?: string | string[];
  values?: string | string[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string | string[];
  id?: string;
  loadingComponent?: JSX.Element
}

export const Loading: React.FC = () => (
  <div className={styles['loading']}>
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
);

const ReactCodeInput = React.forwardRef<
  ReactCodeInputRefInstance,
  ReactCodeInputProps
>(
  (
    {
      className = '',
      inputClassNames = [],
      disabled = false,
      required = false,
      placeholder = [],
      type = 'number',
      id,
      values,
      onChange,
      onComplete,
      loading = false,
      fields = 6,
      autoFocus = true,
      title,
      loadingComponent = <Loading />
    },
    ref
  ) => {
    const [valuesState, setValuesState] = useState([]);
    const [autoFocusIndexState, setAutoFocusIndexState] = useState(0);
    const inputRefs = useRef([]);
    const idRef = useRef(+new Date());

    useEffect(() => {
      let vals = [];
      let autoFocusIndex = 0;

      if (values?.length) {
        vals = [];

        for (let i = 0; i < fields; i++) {
          vals.push(values[i] || '');
        }

        autoFocusIndex = values.length >= fields ? 0 : values.length;
      } else {
        vals = Array(fields).fill('');
      }

      setValuesState(vals);
      setAutoFocusIndexState(autoFocusIndex);

      for (let i = 0; i < fields; i++) {
        inputRefs.current.push(createRef());
      }
      idRef.current = +new Date();
    }, [fields, values]);

    const clearValues = () => {
      setValuesState(Array(fields).fill(''));
      inputRefs.current[0].current.focus();
    };

    useImperativeHandle(ref, () => ({
      clearValues: () => {
        clearValues();
      }
    }));

    const triggerChange = (vals = valuesState): void => {
      const val = vals.join('');
      onChange && onChange(val);

      if (onComplete && val.length >= fields) {
        onComplete(val);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      const target = e.target as HTMLElement;
      const index = parseInt(target.dataset.id);
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const prev: RefObject<HTMLInputElement> = inputRefs.current[prevIndex];
      const next: RefObject<HTMLInputElement> = inputRefs.current[nextIndex];

      switch (e.code) {
        case CODE.backspace: {
          e.preventDefault();
          const vals = [...valuesState];

          if (valuesState[index]) {
            vals[index] = '';
            setValuesState(vals);
            triggerChange(vals);
          } else if (prev) {
            vals[prevIndex] = '';
            prev.current.focus();
            setValuesState(vals);
            triggerChange(vals);
          }
          break;
        }

        case CODE.left:
          e.preventDefault();
          if (prev) {
            prev.current.focus();
          }
          break;

        case CODE.right:
          e.preventDefault();
          if (next) {
            next.current.focus();
          }
          break;

        case CODE.up:
        case CODE.down:
          e.preventDefault();
          break;

        default:
          break;
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
      e.target.select();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const index = parseInt(e.target.dataset.id);

      if (type === 'number') {
        e.target.value = e.target.value.replace(/[^\d]/gi, '');
      }

      if (
        e.target.value === '' ||
        (type === 'number' && !e.target.validity.valid)
      ) {
        return;
      }

      let next: RefObject<HTMLInputElement>;
      const value = e.target.value;
      const vals = Object.assign([], valuesState);

      if (value.length > 1) {
        let nextIndex = value.length + index - 1;
        if (nextIndex >= fields) {
          nextIndex = fields - 1;
        }
        next = inputRefs.current[nextIndex];
        const split = value.split('');
        split.forEach((item, i) => {
          const cursor = index + i;

          if (cursor < fields) {
            vals[cursor] = item;
          }
        });
        setValuesState(vals);
      } else {
        next = inputRefs.current[index + 1];
        vals[index] = value;
        setValuesState(vals);
      }

      if (next) {
        next.current.focus();
        next.current.select();
      }

      triggerChange(vals);
    };

    return (
      <div
        className={`${styles['react-code-input-container']} ${className}`}
      >
        {title && <p className={styles['title']}>{title}</p>}
        <div className={styles['react-code-input']}>
          {valuesState.map((value, index) => (
            <input
              type={type === 'number' ? 'tel' : type}
              pattern={type === 'number' ? '[0-9]*' : null}
              autoFocus={autoFocus && index === autoFocusIndexState}
              key={`${idRef}-${index}`}
              data-id={index}
              value={value}
              id={id ? `${id}-${index}` : null}
              ref={inputRefs.current[index]}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              disabled={disabled}
              required={required}
              placeholder={
                typeof placeholder === 'string'
                  ? placeholder
                  : placeholder[index]
              }
              className={typeof inputClassNames === 'string'
                  ? inputClassNames
                  : inputClassNames[index] || ''
              }
            />
          ))}
        </div>
        {loading && loadingComponent}
      </div>
    );
  }
);

ReactCodeInput.displayName = 'ReactCodeInput';

export default ReactCodeInput;
