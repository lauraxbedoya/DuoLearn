import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./buttons.module.scss";

interface ButtonProps {
  onClick: () => any;
  children: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: "primary" | "secondary";
  isMain: boolean | null;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  size = "md",
  isMain = true,
  disabled = false,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const [customClass, setCustomClass] = useState("");

  const setStyles = () => {
    let styleClass: string = "";
    switch (size) {
      case "sm":
        styleClass = styles.buttonSm;
        break;
      case "md":
        styleClass = styles.buttonMd;
        break;
      case "lg":
        styleClass = styles.buttonLg;
        break;
      default:
    }
    setCustomClass(styleClass);
  };

  useEffect(setStyles, [size]);

  return (
    <button
      {...props}
      disabled={disabled}
      className={`
                ${styles.mainButton}
                p-button-rounded
                ${customClass}
                ${!isMain ? styles.secondaryButton : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
