import { ComponentProps, FunctionComponent } from "preact";

import s from './styles.module.css';

import { useComputed } from "@preact/signals";

type InputProps = ComponentProps<"input"> & Record<"name", string>;

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  name,
  id,
  ...props
}) => {
  const inputId = useComputed(() =>
    typeof id === "string" ? id : id?.value ?? name,
  );

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        placeholder=" "
        className={`${s.input} peer`}
      />
      <label htmlFor={inputId} className={`${s.label} peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5`}>
        {placeholder}
      </label>
    </div>
  );
};
