import Prices from "../../components/Prices/Prices";
import styles from './Home.module.scss'

export default function Home (){
    
    return (
        <>
            <h1 className={styles.siteName }>
                Market Monitor
            </h1>
            <div className={styles.container}>
                <div className={styles.homeInfo}>
                    СОДЕРЖИМОЕ ГЛАВНОЙ СТРАНИЦЫ
                </div>
                <div className={styles.prices}>
                    <Prices />
                </div>
            </div>
        
        </>
    );
}