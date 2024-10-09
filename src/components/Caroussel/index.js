'use client';
import styles from './styles.module.scss';
import stylesMain from '../../app/page.module.css';
import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
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
    const container = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;
    let animationFrameId;
    const isAnimatingRef = useRef(true); // Utilisation d'un ref pour gérer l'animation
    const [renderTrigger, setRenderTrigger] = useState(false); // État pour forcer un re-render

    // Fonction qui ajuste les positions de secondDiv et fourthDiv
    const adjustDivPositions = () => {
        if (firstDiv.current && secondDiv.current) {
            const firstWidth = firstDiv.current.offsetWidth; // Largeur de firstDiv
            secondDiv.current.style.left = `${firstWidth}px`; // Positionnement de secondDiv
        }
        if (thirdDiv.current && fourthDiv.current) {
            const thirdWidth = thirdDiv.current.offsetWidth; // Largeur de thirdDiv
            fourthDiv.current.style.left = `${-thirdWidth}px`; // Positionnement de fourthDiv
        }
    };

    // Utilisation de ResizeObserver pour surveiller les changements de taille
    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            adjustDivPositions(); // Ajustement lors du changement de taille
        });

        // Observer les divs qui doivent être surveillées
        if (firstDiv.current) resizeObserver.observe(firstDiv.current);
        if (thirdDiv.current) resizeObserver.observe(thirdDiv.current);

        // Ajustement initial
        adjustDivPositions();

        return () => {
            resizeObserver.disconnect(); // Déconnexion de l'observateur lors du nettoyage
        };
    }, []); // Pas de dépendances car les refs ne changent pas

    useLayoutEffect(() => {
        document.querySelector(`.${stylesMain.main}`).style.height =
            slider.current.offsetWidth + 'px';

        requestAnimationFrame(animate);
        gsap.registerPlugin(ScrollTrigger);
        const animation1 = gsap.to([firstDiv.current, secondDiv.current], {
            scrollTrigger: {
                id: 'animation1',
                trigger: `.${styles.container}`,
                scrub: 0.25,
                start: 0,
                endTrigger: `.${stylesMain.main}`,
                end: 'bottom bottom',
            },
            x: '-1000px',
        });

        const animation2 = gsap.to([thirdDiv.current, fourthDiv.current], {
            scrollTrigger: {
                id: 'animation2',
                trigger: `.${styles.container}`,
                scrub: 0.25,
                start: 0,
                endTrigger: `.${stylesMain.main}`,
                end: 'bottom bottom',
            },
            x: '-1000px',
        });

        const scrollTriggerAnim = gsap.to(slider.current, {
            xPercent: -50,
            ease: 'none',
            scrollTrigger: {
                id: 'scrollTriggerAnim',
                trigger: `.${stylesMain.main}`,
                start: 'top top',
                scrub: 0.5,
                end: 'bottom bottom',
            },
        });

        return () => {
            animation1.kill();
            animation2.kill();
            scrollTriggerAnim.kill();
        };
    }, []);

    const animate = () => {
        if (isAnimatingRef.current) {
            // Exécuter l'animation seulement si isAnimatingRef.current est true
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
        }
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
