'use client';
import styles from './styles.module.scss';
import stylesMain from '../../app/page.module.css';
import stylesCard from '../Caroussel/Card/styles.module.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import Card from './Card';
import { useModalContext } from '@/context/modalContext';

export default function Caroussel({
    randomizedAndFixedCards,
    randomizedKeys1,
    randomizedKeys2,
}) {
    const { isOpen, toggleModal } = useModalContext();
    const firstDiv = useRef(null);
    const secondDiv = useRef(null);
    const thirdDiv = useRef(null);
    const fourthDiv = useRef(null);
    const slider = useRef(null);
    const container = useRef(null);
    const isScrollEnabledRef = useRef(true); // Utilisation de useRef pour stocker l'état du scroll
    const isAnimatingRef = useRef(false); // Nouvelle référence pour suivre l'état de l'animation
    let xPercent = 0;
    let limit = 0;
    let direction = -1;
    let animationFrameId;

    useEffect(() => {
        // Initialisation de la position des divs
        if (secondDiv.current) {
            secondDiv.current.style.left = firstDiv.current.offsetWidth + 'px';
        }
        if (fourthDiv.current) {
            fourthDiv.current.style.left = -thirdDiv.current.offsetWidth + 'px';
        }

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Fonction pour gérer le scroll avec un laps de temps entre les scrolls
        const handleScroll = (event) => {
            if (!isScrollEnabledRef.current) return; // Vérification de l'état d'animation

            const cardElements = document.getElementsByClassName(
                stylesCard.card,
            );
            const deltaY = event.deltaY;
            const shift =
                cardElements[0].getBoundingClientRect().width * 2 + 317;

            if (Math.abs(deltaY) < 10) return; // Ne rien faire si le deltaY est trop faible

            isScrollEnabledRef.current = false;
            isAnimatingRef.current = true; // Indiquer que l'animation a commencé

            if (deltaY < 0) {
                gsap.to([firstDiv.current, secondDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '+=500px',
                });

                gsap.to([thirdDiv.current, fourthDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '+=500px',
                });
                // Scrolling vers le bas
                gsap.to(slider.current, {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: `+=${shift}`,
                    onComplete: () => {
                        isScrollEnabledRef.current = true; // Réactiver le scroll
                    },
                });
            } else {
                gsap.to([firstDiv.current, secondDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '-=500px',
                });

                gsap.to([thirdDiv.current, fourthDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '-=500px',
                });
                // Scrolling vers le haut
                gsap.to(slider.current, {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: `-=${shift}`,
                    onComplete: () => {
                        isScrollEnabledRef.current = true; // Réactiver le scroll
                    },
                });
            }
        };

        if (isOpen) {
            container.current.removeEventListener('wheel', handleScroll);
        } else {
            container.current.addEventListener('wheel', handleScroll);
        }

        return () => {
            container.current.removeEventListener('wheel', handleScroll);
        };
    }, [isOpen]);

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0;
        } else if (xPercent > 0) {
            xPercent = -100;
        }
        gsap.set(firstDiv.current, { xPercent: xPercent });
        gsap.set(secondDiv.current, { xPercent: xPercent });
        gsap.set(thirdDiv.current, { xPercent: -xPercent });
        gsap.set(fourthDiv.current, { xPercent: -xPercent });
        animationFrameId = requestAnimationFrame(animate);
        xPercent += 0.01 * direction;
    };

    const handleCardClick = (card) => {
        toggleModal(card);
    };

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.caroussel_container}>
                <div ref={firstDiv} className={styles.caroussel}>
                    {randomizedKeys1.map((card, index) => (
                        <Card
                            key={index}
                            imgUrl={card.imgUrl}
                            imgTitle={card.title}
                        />
                    ))}
                </div>
                <div ref={secondDiv} className={styles.caroussel}>
                    {randomizedKeys1.map((card, index) => (
                        <Card
                            key={index}
                            imgUrl={card.imgUrl}
                            imgTitle={card.title}
                        />
                    ))}
                </div>
            </div>
            <div ref={slider} className={styles.main_caroussel}>
                {randomizedAndFixedCards.map((detail, index) =>
                    detail && detail.imgUrl ? (
                        <Card
                            key={index}
                            onClick={() => handleCardClick(detail)}
                            imgUrl={detail.imgUrl}
                            imgTitle={detail.title}
                            hover={detail.hover}
                        />
                    ) : (
                        <Card
                            key={index}
                            imgTitle={detail.title}
                            hover={detail.hover}
                        />
                    ),
                )}
            </div>
            <div className={styles.caroussel_container}>
                <div ref={thirdDiv} className={styles.caroussel}>
                    {randomizedKeys2.map((card, index) => (
                        <Card
                            key={index}
                            imgUrl={card.imgUrl}
                            imgTitle={card.title}
                        />
                    ))}
                </div>
                <div ref={fourthDiv} className={styles.caroussel}>
                    {randomizedKeys2.map((card, index) => (
                        <Card
                            key={index}
                            imgUrl={card.imgUrl}
                            imgTitle={card.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
