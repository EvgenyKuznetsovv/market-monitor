import styles from './Failed.module.scss';

export default function Failed() {
    return (
        <div>
            <div className={styles.backdrop}></div>
            <h1 className={styles.message}>Что-то пошло не так...</h1>
        </div>
    );
}
