'use client';
import styles from './styles.module.scss';
import stylesMain from '../../app/page.module.css';
import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Card from './Card';
import { useModalContext } from '@/context/modalContext';

export default function Caroussel({ mainArray, firstArray, secondArray }) {
    const { isOpen, toggleModal } = useModalContext();
    const firstDiv = useRef(null);
    const secondDiv = useRef(null);
    const secondDiv2 = useRef(null);
    const thirdDiv = useRef(null);
    const fourthDiv = useRef(null);
    const fourthDiv2 = useRef(null);
    const container = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;
    let animationFrameId;
    const isAnimatingRef = useRef(true); // Utilisation d'un ref pour gérer l'animation
    const [renderTrigger, setRenderTrigger] = useState(false); // État pour forcer un re-render

    // Fonction qui ajoute une un caroussel devant et derriere le caroussel original
    const adjustDivPositions = () => {
        if (firstDiv.current && secondDiv.current) {
            const firstWidth = firstDiv.current.offsetWidth; // Largeur de firstDiv
            secondDiv.current.style.left = `${firstWidth}px`; // Positionnement de secondDiv
            secondDiv2.current.style.left = `${-firstWidth}px`; // Positionnement de secondDiv
        }
        if (thirdDiv.current && fourthDiv.current) {
            const thirdWidth = thirdDiv.current.offsetWidth; // Largeur de thirdDiv
            fourthDiv.current.style.left = `${-thirdWidth}px`; // Positionnement de fourthDiv
            fourthDiv2.current.style.left = `${thirdWidth}px`; // Positionnement de fourthDiv
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
        document.body.style.overflow = 'hidden'; // Ajout de overflow hidden sur le body

        setTimeout(() => {
            // Ajout d'un setTimeout de 2500ms
            document.body.style.overflow = 'auto';
            document.querySelector(`.${stylesMain.main}`).style.height =
                slider.current.offsetWidth + 'px';

            requestAnimationFrame(animate);
            gsap.registerPlugin(ScrollTrigger);
            gsap.to([firstDiv.current, secondDiv.current, secondDiv2.current], {
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

            gsap.to([thirdDiv.current, fourthDiv.current, fourthDiv2.current], {
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

            gsap.to(slider.current, {
                xPercent: -57,
                ease: 'none',
                scrollTrigger: {
                    id: 'scrollTriggerAnim',
                    trigger: `.${stylesMain.main}`,
                    start: 'top top',
                    scrub: 0.03,
                    end: 'bottom bottom',
                },
            });
        }, 2500); // Délai de 2500ms avant d'activer le ScrollTrigger
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
            gsap.set(secondDiv2.current, { xPercent: xPercent });
            gsap.set(thirdDiv.current, { xPercent: -xPercent });
            gsap.set(fourthDiv.current, { xPercent: -xPercent });
            gsap.set(fourthDiv2.current, { xPercent: -xPercent });
            animationFrameId = requestAnimationFrame(animate);
            xPercent += 0.03 * direction;
        }
    };

    const handleCardClick = (card) => {
        toggleModal(card);
    };

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.caroussel_container}>
                <div ref={firstDiv} className={styles.caroussel}>
                    {firstArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                            bg={card.bg}
                        />
                    ))}
                </div>
                <div ref={secondDiv} className={styles.caroussel}>
                    {firstArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                            bg={card.bg}
                        />
                    ))}
                </div>
                <div ref={secondDiv2} className={styles.caroussel}>
                    {firstArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                            bg={card.bg}
                        />
                    ))}
                </div>
            </div>
            <div ref={slider} className={styles.main_caroussel}>
                {mainArray.map((detail, index) =>
                    detail && detail.imgUrl ? (
                        <Card
                            key={index}
                            onClick={() => handleCardClick(detail)}
                            imgUrl={detail.imgUrl}
                            imgTitle={detail.imgTitle}
                            color={detail.color}
                            hover={detail.hover}
                            bg={detail.bg}
                        />
                    ) : (
                        <Card
                            key={index}
                            color={detail.color}
                            hover={detail.hover}
                            imgUrl={detail.imgUrl}
                            imgTitle={detail.imgTitle}
                            bg={detail.bg}
                        />
                    ),
                )}
            </div>
            <div className={styles.caroussel_container}>
                <div ref={thirdDiv} className={styles.caroussel}>
                    {secondArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                        />
                    ))}
                </div>
                <div ref={fourthDiv} className={styles.caroussel}>
                    {secondArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                        />
                    ))}
                </div>
                <div ref={fourthDiv2} className={styles.caroussel}>
                    {secondArray.map((card, index) => (
                        <Card
                            imgUrl={card.imgUrl}
                            imgTitle={card.imgTitle}
                            color={card.color}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
