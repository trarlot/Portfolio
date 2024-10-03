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
    const randomizedKeys1 = getRandomizedKeys(cardDetails).slice(0, 15);
    const randomizedKeys2 = getRandomizedKeys(cardDetails).slice(0, 15);
    const randomizedKeys3 = getRandomizedKeys(cardDetails).slice(0, 15);

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

        // Utiliser randomizedKeys3 pour ajouter une première carte aléatoire et la retirer de la liste
        let availableCards = [...randomizedKeys3];
        const firstRandomCard = availableCards.shift();
        newCardList.push(firstRandomCard);

        cardKeys.forEach((key, index) => {
            // Ajouter une carte aléatoire de randomizedKeys3
            newCardList.push(availableCards.shift());

            // Ajouter une image fixe tous les 2 éléments
            if ((index + 1) % 2 === 0 && fixedIndex < fixedImages.length) {
                newCardList.push(fixedImages[fixedIndex]);
                fixedIndex++;
            }
        });

        // Ajouter deux cartes aléatoires uniques de randomizedKeys3 à la fin
        const lastTwoRandoms = availableCards.slice(0, 2);
        newCardList = newCardList.concat(lastTwoRandoms);

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
