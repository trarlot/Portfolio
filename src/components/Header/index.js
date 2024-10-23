'use client';
import styles from './styles.module.scss';
import { Saira_Condensed } from 'next/font/google';
import { cardHeader, cardDDF, cardECC } from '@/app/caroussel-config';
import { useRef, useLayoutEffect, useState } from 'react';
import { useModalContext } from '@/context/modalContext';
import { gsap } from 'gsap';

const saira_init = Saira_Condensed({
    weight: ['700'],
    subsets: ['latin'],
});

export default function Header() {
    const { isOpen, toggleModal } = useModalContext();
    const ddfRef = useRef(null);
    const eccRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false); // État pour suivre l'animation

    const handleClick = () => {
        if (!isAnimating) {
            gsap.to([ddfRef.current, eccRef.current], {
                width: 100,
                height: 50,
                marginTop: -25,
                marginLeft: -50,
                stagger: 0.1,
                duration: 0.2,
            });
            gsap.to([ddfRef.current, eccRef.current], {
                color: 'white',
                delay: 0.2,
                stagger: 0.1,
                duration: 0.2,
            });
        } else {
            gsap.to([eccRef.current, ddfRef.current], {
                width: 0,
                height: 0,
                marginTop: 0,
                marginLeft: 0,
                stagger: 0.1,
                delay: 0.1,
                duration: 0.2,
            });
            gsap.to([eccRef.current, ddfRef.current], {
                color: 'transparent',
                stagger: 0.1,
                duration: 0.2,
            });
        }
        setIsAnimating(!isAnimating); // Inverse l'état après chaque clic
    };

    const handleCardClick = (card) => {
        toggleModal(card);
    };

    // Gestion du clic en dehors pour fermer l'animation
    const handleClickOutside = (event) => {
        if (!event.target.closest(`#${styles.works}`) && isAnimating) {
            gsap.to([eccRef.current, ddfRef.current], {
                width: 0,
                height: 0,
                marginTop: 0,
                marginLeft: 0,
                stagger: 0.1,
                duration: 0.2,
                delay: 0.1,
            });
            gsap.to([eccRef.current, ddfRef.current], {
                color: 'transparent',
                stagger: 0.1,
                duration: 0.2,
            });
            setIsAnimating(false); // Réinitialise l'état
        }
    };

    // Ajoute l'écouteur de clic sur le document pour détecter les clics en dehors
    useLayoutEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isAnimating]);

    return (
        <div className={styles.header}>
            <a href="/" className={`${styles.home} ${saira_init.className}`}>
                © Tristan Arlot
            </a>
            <div className={styles.nav}>
                <div className={styles.duo}>
                    <div onClick={handleClick} className={styles.button}>
                        <p id={styles.works} className={saira_init.className}>
                            Works
                        </p>
                    </div>
                    <div
                        onClick={() => handleCardClick(cardHeader)}
                        className={styles.button}>
                        <p className={saira_init.className}>About</p>
                    </div>
                </div>
                <div
                    onClick={() => handleCardClick(cardDDF)}
                    ref={ddfRef}
                    className={`${styles.button2} ${saira_init.className}`}>
                    Doigts de fée
                </div>
                <div
                    onClick={() => handleCardClick(cardECC)}
                    ref={eccRef}
                    className={`${styles.button2} ${saira_init.className}`}>
                    Electric cars
                </div>
            </div>
        </div>
    );
}
