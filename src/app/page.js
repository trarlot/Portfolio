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
    const warmImages = [
        '/assets/metacard.jpg',
        '/assets/metacard2.jpg',
        '/assets/meta.jpg',
        '/assets/meta1.jpg',
        '/assets/meta2.jpg',
        '/assets/meta3.jpg',
        '/assets/meta4.jpg',
        '/assets/dandadanCover.png',
        '/assets/okarun.png',
        '/assets/momo.png',
        '/assets/Seiko.png',
        '/assets/aira.png',
        '/assets/electriccars5.jpg',
        '/assets/EEC.jpg',
        '/assets/tristan.jpg',
    ];

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

        // Délai simple pour le preloader
        setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            // Warm up modal images after initial paint
            const idle =
                window.requestIdleCallback ||
                function (cb) {
                    return setTimeout(cb, 1);
                };
            idle(() => {
                warmImages.forEach((src) => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.as = 'image';
                    link.href = src;
                    document.head.appendChild(link);
                });
            });
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
