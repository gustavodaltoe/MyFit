import React, { InputHTMLAttributes } from 'react';

import './styles.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, ...rest }, ref) => (
    <div className="input-block">
      {label && <label htmlFor={name}>{label}</label>}
      <input type="text" name={name} ref={ref} {...rest} />
    </div>
  ),
);

export default Input;
