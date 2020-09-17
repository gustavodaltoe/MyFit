import React, { SelectHTMLAttributes } from 'react';

import './styles.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ name, label, options, ...rest }, ref) => (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>

      <select id={name} defaultValue="" name={name} ref={ref} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
);

export default Select;
