import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import "./Button.scss";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  light?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  light = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "Button",
        { "Button--light": light },
        props.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
