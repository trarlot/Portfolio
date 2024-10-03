'use client';
import styles from './styles.module.scss';
import stylesMain from '../../app/page.module.css';
import stylesCard from '../Caroussel/Card/styles.module.scss';
import { useRef, useEffect, useState } from 'react';
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
    const [limit, setLimit] = useState(0);
    const firstDiv = useRef(null);
    const secondDiv = useRef(null);
    const thirdDiv = useRef(null);
    const fourthDiv = useRef(null);
    const slider = useRef(null);
    const container = useRef(null);
    const isScrollEnabledRef = useRef(true);
    let xPercent = 0;
    let direction = -1;
    let animationFrameId;
    let startY = 0; // To track touch start position

    useEffect(() => {
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

        const handleScroll = (deltaY) => {
            if (!isScrollEnabledRef.current) return;

            const cardElements = document.getElementsByClassName(
                stylesCard.card,
            );
            const shift =
                cardElements[0].getBoundingClientRect().width * 2 + 317;

            isScrollEnabledRef.current = false;

            if (deltaY < 0 && limit > 0) {
                gsap.to([firstDiv.current, secondDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '+=500px',
                    force3D: true,
                });
                gsap.to([thirdDiv.current, fourthDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '+=500px',
                    force3D: true,
                });
                gsap.to(slider.current, {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: `+=${shift}`,
                    force3D: true,

                    onComplete: () => {
                        setLimit((prevLimit) => prevLimit - 1);
                        isScrollEnabledRef.current = true;
                    },
                });
            } else if (deltaY > 0 && limit < 3) {
                gsap.to([firstDiv.current, secondDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '-=500px',
                    force3D: true,
                });
                gsap.to([thirdDiv.current, fourthDiv.current], {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: '-=500px',
                    force3D: true,
                });
                gsap.to(slider.current, {
                    duration: 0.8,
                    ease: 'power1.inOut',
                    x: `-=${shift}`,
                    force3D: true,

                    onComplete: () => {
                        setLimit((prevLimit) => prevLimit + 1);
                        isScrollEnabledRef.current = true;
                    },
                });
            } else {
                isScrollEnabledRef.current = true;
            }
        };

        const handleWheel = (event) => {
            const deltaY = event.deltaY;
            if (Math.abs(deltaY) >= 10) handleScroll(deltaY);
        };

        const handleTouchStart = (event) => {
            startY = event.touches[0].clientY;
        };

        const handleTouchMove = (event) => {
            const touchMoveY = event.touches[0].clientY;
            const deltaY = startY - touchMoveY;
            if (Math.abs(deltaY) > 10) {
                handleScroll(deltaY);
            }
        };

        const handleKeydown = (event) => {
            if (event.key === 'ArrowRight') {
                handleScroll(100); // Scroll right
            } else if (event.key === 'ArrowLeft') {
                handleScroll(-100); // Scroll left
            }
        };

        if (isOpen) {
            container.current.removeEventListener('wheel', handleWheel);
            container.current.removeEventListener(
                'touchstart',
                handleTouchStart,
            );
            container.current.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('keydown', handleKeydown);
        } else {
            container.current.addEventListener('wheel', handleWheel);
            container.current.addEventListener('touchstart', handleTouchStart);
            container.current.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('keydown', handleKeydown);
        }

        return () => {
            container.current.removeEventListener('wheel', handleWheel);
            container.current.removeEventListener(
                'touchstart',
                handleTouchStart,
            );
            container.current.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [isOpen, limit]);

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
