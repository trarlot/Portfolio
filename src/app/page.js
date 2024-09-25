import CarousselWrapper from '@/components/CarousselWrapper';
import { cardDetails, cardMiddle } from './caroussel-config';
import styles from './page.module.css';

// Fonction pour randomiser les clés d'un objet
const getRandomizedKeys = (obj) => {
    // Obtenez les valeurs de l'objet
    const values = Object.values(obj);

    // Mélangez les valeurs
    const shuffled = values.sort(() => Math.random() - 0.5);
    return shuffled;
};

export default async function Home() {
    // Randomiser les cartes
    const randomizedKeys1 = getRandomizedKeys(cardDetails).slice(0, 10);
    const randomizedKeys2 = getRandomizedKeys(cardDetails).slice(0, 10);
    const randomizedKeys3 = getRandomizedKeys(cardDetails).slice(0, 10);

    // Transformer cardMiddle en tableau
    const fixedImages = Object.values(cardMiddle).map((item) => ({
        imgUrl: item.imgUrl,
        title: item.title,
        hover: item.hover,
        id: item.id,
    }));

    const insertFixedImages = (cardKeys, fixedImages) => {
        let newCardList = [];
        let fixedIndex = 0;

        cardKeys.forEach((key, index) => {
            newCardList.push(randomizedKeys3[index]);
            if ((index + 1) % 2 === 0 && fixedIndex < fixedImages.length) {
                newCardList.push(fixedImages[fixedIndex]);
                fixedIndex++;
            }
        });

        return newCardList;
    };

    // Randomisation et ajout des images fixes
    const randomizedAndFixedCards = insertFixedImages(
        getRandomizedKeys(cardDetails),
        fixedImages,
    );

    return (
        <main className={styles.main}>
            <CarousselWrapper
                randomizedKeys1={randomizedKeys1}
                randomizedKeys2={randomizedKeys2}
                randomizedAndFixedCards={randomizedAndFixedCards}
            />
        </main>
    );
}
