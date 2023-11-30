import styles from "./duoInput.module.scss";

type MainInputProps = {
    placeholder: string,
    onChange?: (e: any) => any,
    value?: any,
    name: string,
    type?: string,
    register?: any,
    error?: string,
}

export default function DuoInput({
    placeholder,
    error,
    onChange,
    value,
    name,
    type,
    ...props
}: MainInputProps) {
    return (
        <div className={styles.containerInput}>
            <input
                {...props}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                type={type}
            />
            {error && (
                <small style={{ color: 'red', fontSize: '14px', marginTop: '7px' }}>
                    {error}
                </small>
            )}
        </div>
    )
}