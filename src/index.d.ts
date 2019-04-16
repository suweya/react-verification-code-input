interface ReactCodeInput {
  type: string;
  onChange: (val: string) => void;
  onComplete: (val: string) => void;
  fields: number;
  loading: boolean;
  title: string;
  fieldWidth: number;
  fieldHeight: number;
  autoFocus: boolean;
  className: string;
}

declare const ReactCodeInput: ReactCodeInput;

export default ReactCodeInput;
