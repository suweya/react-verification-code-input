interface ReactCodeInputProps {
  type?: 'text' | 'number';
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  fields?: number;
  loading?: boolean;
  title?: string;
  fieldWidth?: number;
  fieldHeight?: number;
  autoFocus?: boolean;
  className?: string;
  values?: string[];
  disabled?: boolean;
  required?: boolean;
}

declare const ReactCodeInput: React.ComponentClass<ReactCodeInputProps>

export default ReactCodeInput;
