import CarousselWrapper from '@/components/CarousselWrapper';
import { cardTop, cardBottom, cardMiddle } from './caroussel-config';
import styles from './page.module.css';

// Fonction pour randomiser les clés d'un objet

export default async function Home() {
    // Randomiser les cartes
    const firstArray = cardTop;
    const secondArray = cardBottom;
    const mainArray = cardMiddle;

    return (
        <main className={styles.main}>
            <CarousselWrapper
                firstArray={firstArray}
                secondArray={secondArray}
                mainArray={mainArray}
            />
        </main>
    );
}
