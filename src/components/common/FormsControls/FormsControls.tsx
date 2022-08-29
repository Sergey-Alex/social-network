import styles from './FormVontrols.module.css'

type TextareaType = {
    input?: any,
    meta?: any
    children?: any
}

const FormControl = ({input, meta, ...props}: TextareaType) => {
    const hasError = meta.touched && meta.error
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
        <div className={styles.error}>
            {props.children}
        </div>
        <div>
            {hasError && <span className={styles.error}>{meta.error}</span>}
        </div>
    </div>
}

export const Textarea = (props: TextareaType) => {
    const {input, meta,children, ...restProps} = props
    return <FormControl {...props} ><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props: TextareaType) => {
    const {input, meta,children, ...restProps} = props
    return <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
}
