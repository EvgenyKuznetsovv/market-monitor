import Prices from '../../components/Prices/Prices';
import styles from './Home.module.scss';
import Loading from '../../components/Loading/Loading';
import Failed from '../../components/Failed/Failed';
import HomeContent from '../../components/HomeContent/HomeContent';
import { useHome } from '../../hooks/home';
import { ErrorBoundary } from 'react-error-boundary';

export default function Home() {
    const { isLoading, isError } = useHome();

    return (
        <>
            <h1 className={styles.siteName}>Market Monitor</h1>
            {isError ? <Failed /> : isLoading && <Loading />}
            <div className={styles.container}>
                <div className={styles.homeInfo}>
                    <HomeContent />
                </div>
                <div className={styles.prices}>
                    <ErrorBoundary fallback={<h1>Ошибка при обработке цен</h1>}>
                        <Prices />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
}
