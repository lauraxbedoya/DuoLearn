import styles from "./mainInput.module.scss";

type MainInputProps = {
    placeholder: string,
    onChange: (e: any) => any,
    value: any,
}

const MainInput = ({ placeholder, onChange, value }: MainInputProps) => {
    return (
        <div className={styles.containerInput}>
            <input className={styles.input}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default MainInput