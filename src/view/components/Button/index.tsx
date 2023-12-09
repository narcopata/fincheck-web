import { ComponentProps, FunctionComponent } from "preact";

import s from "./styles.module.css";

type ButtonProps = ComponentProps<"button">;

export const Button: FunctionComponent<ButtonProps> = ({className, type = "button", ...props}) => {
  return (
    <button {...props} className={`${s.button} ${className}`} type={type} />
  );
};
