'use client';
import styles from './styles.module.scss';
import { Saira_Condensed } from 'next/font/google';
import { cardHeader, cardDDF, cardECC } from '@/app/caroussel-config';
import { useRef, useLayoutEffect, useState } from 'react';
import { useModalContext } from '@/context/modalContext';
import { useNavigateContext } from '@/context/navContaxt';
import { gsap } from 'gsap';

const saira_init = Saira_Condensed({
    weight: ['700'],
    subsets: ['latin'],
});

export default function Header() {
    const { isOpen, toggleModal } = useModalContext();
    const { toggleLeft, toggleRight } = useNavigateContext();
    const ddfRef = useRef(null);
    const eccRef = useRef(null);
    const animRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false); // État pour suivre l'animation

    const handleMenu = (e) => {
        e.preventDefault();
        gsap.fromTo(
            animRef.current,

            { y: '130vh' },
            {
                y: 0,
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
            },
        );
        setTimeout(() => {
            document.location.href = '/';
        }, 500);
    };
    const handleLeft = () => {
        toggleLeft();
    };
    const handleRight = () => {
        toggleRight();
    };

    const handleClick = () => {
        if (!isAnimating) {
            gsap.to([ddfRef.current, eccRef.current], {
                width: 150,
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
        <div className={styles.containerHeader}>
            <div ref={animRef} className={styles.anim}></div>
            <div className={styles.header}>
                <div className={styles.nav}>
                    <div className={styles.duo}>
                        <button
                            onClick={handleLeft}
                            className={styles.buttonNav}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512">
                                <path
                                    fill="white"
                                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleRight}
                            className={styles.buttonNav}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512">
                                <path
                                    fill="white"
                                    d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <a
                    href="/"
                    onClick={handleMenu}
                    className={`${styles.home} ${saira_init.className}`}>
                    © Tristan Arlot
                </a>
                <div className={styles.nav}>
                    <div className={styles.duo}>
                        <div onClick={handleClick} className={styles.button}>
                            <p
                                id={styles.works}
                                className={saira_init.className}>
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
        </div>
    );
}
