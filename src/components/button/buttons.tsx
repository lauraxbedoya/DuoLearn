import { PropsWithChildren, useEffect, useState } from "react";
import styles from "./buttons.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => any;
  children: string;
  size?: "sm" | "md" | "lg";
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
    <div className={styles.containerButton}>
      <button
        {...props}
        disabled={disabled}
        className={`
                ${styles.mainButton}
                ${customClass}
                ${!isMain ? styles.secondaryButton : ""} ${props.className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
