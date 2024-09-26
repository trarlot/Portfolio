'use client';
import styles from './styles.module.scss';
import stylesMain from '../../app/page.module.css';
import { useRef, useEffect } from 'react';
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
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;
    let animationFrameId;
    let savedPosition;

    const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    useEffect(() => {
        // Initialisation de la position des divs
        if (secondDiv.current) {
            secondDiv.current.style.left = firstDiv.current.offsetWidth + 'px';
        }
        if (fourthDiv.current) {
            fourthDiv.current.style.left = -thirdDiv.current.offsetWidth + 'px';
        }
        document.querySelector(`.${stylesMain.main}`).style.height =
            slider.current.offsetWidth + 'px';

        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
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
            x: '1300px',
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
            x: '-1300px',
        });

        const scrollTriggerAnim = gsap.to(slider.current, {
            xPercent: -65,
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

    useEffect(() => {
        // Ajouter/Supprimer les écouteurs d'événements
        if (isOpen) {
            document.addEventListener('wheel', preventScroll, {
                passive: false,
            });
            document.addEventListener('touchmove', preventScroll, {
                passive: false,
            });
            document.addEventListener('keydown', preventScroll, {
                passive: false,
            });
            document.addEventListener('keyup', preventScroll, {
                passive: false,
            });
        } else {
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('keydown', preventScroll);
            document.removeEventListener('keyup', preventScroll);
        }

        return () => {
            // Nettoyage des écouteurs d'événements lors du démontage
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('keydown', preventScroll);
            document.removeEventListener('keyup', preventScroll);
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
        <div className={styles.container}>
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
