import styles from "./duoInput.module.scss";

type MainInputProps = {
  placeholder: string;
  onChange: (key: string, value: string) => any;
  value?: any;
  name?: string;
  type?: string;
  register?: any;
  error?: string;
  className?: string;
};

export default function DuoInput({
  placeholder,
  error,
  onChange,
  value,
  name,
  type,
  className,
  ...props
}: MainInputProps) {
  return (
    <div className={styles.containerInput}>
      {/* <span className="p-float-label">
        <Chips
          {...props}
          id={name}
          value={value}
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.name, e.value)}
          name={name}
          type={type}
        />
        <label htmlFor={name}>{name}</label>
      </span> */}
      <input
        {...props}
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        name={name}
        type={type}
      />
      {error && (
        <small style={{ color: "red", fontSize: "14px", marginTop: "7px" }}>
          {error}
        </small>
      )}
    </div>
  );
}
