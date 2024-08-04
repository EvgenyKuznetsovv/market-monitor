import styles from './Loading.module.scss';
import bitcoin from '../../../public/bitcoin256.png'

export default function(){
    return (
			<>
				<div className={styles.backdrop}></div>
				<img
					src='/bitcoin256.png'
					alt='Loading...'
					className={styles.bitcoin}
				></img>
			</>
		)
}