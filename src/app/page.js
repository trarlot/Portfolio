'use client';
import CarousselWrapper from '@/components/CarousselWrapper';
import {
    cardTop,
    cardBottom,
    cardMiddle,
    cardPreloader,
} from './caroussel-config';
import styles from './page.module.css';
import stylesCard from '../components/Caroussel/Card/styles.module.scss';
import { gsap } from 'gsap';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader/index';
import { useState, useEffect } from 'react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    if (
        typeof window !== 'undefined' &&
        window.history &&
        'scrollRestoration' in window.history
    ) {
        window.history.scrollRestoration = 'manual';
    }
    useEffect(() => {
        gsap.fromTo(
            `#${stylesCard.welcome}`,
            {
                yPercent: 5, // Point de départ
                opacity: 0,
            },
            {
                yPercent: 0, // Point d'arrivée
                opacity: 1,
                duration: 0.5,
            },
        );
        setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
        }, 2500);
    }, []);

    // Randomiser les cartes
    const firstArray = cardTop;
    const secondArray = cardBottom;
    const mainArray = cardMiddle;
    const preloaderCard = cardPreloader;

    return (
        <main className={styles.main}>
            <AnimatePresence mode="wait">
                {isLoading && <Preloader preloaderCard={preloaderCard} />}
            </AnimatePresence>
            <CarousselWrapper
                firstArray={firstArray}
                secondArray={secondArray}
                mainArray={mainArray}
            />
        </main>
    );
}
