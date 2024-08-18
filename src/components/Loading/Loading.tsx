import styles from './Loading.module.scss';

export default function Loading() {
    return (
        <>
            <div className={styles.backdrop}></div>
            <img src="/bitcoin256.png" alt="Loading..." className={styles.bitcoin}></img>
        </>
    );
}
