import styles from "./mainInput.module.scss";

type MainInputProps = {
    placeholder: string,
    onChange: (e: any) => any,
    value: any,
    name: string,
    type?: string
}

const MainInput = ({ placeholder, onChange, value, name, type }: MainInputProps) => {
    return (
        <div className={styles.containerInput}>
            <input className={styles.input}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                name={name}
                type={type}
            />
        </div>
    )
}

export default MainInput