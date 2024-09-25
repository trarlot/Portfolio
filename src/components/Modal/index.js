import styles from './styles.module.scss';
import Image from 'next/image';
export default function Modal({ children }) {
    return <div className={styles.modal}>{children}</div>;
}
