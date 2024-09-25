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
    const firstDiv = useRef(null);
    const secondDiv = useRef(null);
    const thirdDiv = useRef(null);
    const fourthDiv = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;
    let containerWidth;
    const { toggleModal } = useModalContext(); // On récupère toggleModal du contexte

    useEffect(() => {
        if (secondDiv.current) {
            secondDiv.current.style.left = firstDiv.current.offsetWidth + 'px';
        }
        if (fourthDiv.current) {
            fourthDiv.current.style.left = -thirdDiv.current.offsetWidth + 'px';
        }
        containerWidth = slider.current.offsetWidth;
        document.querySelector(`.${stylesMain.main}`).style.height =
            containerWidth * 2 + 'px';
        gsap.registerPlugin(ScrollTrigger);

        gsap.to([firstDiv.current, secondDiv.current], {
            scrollTrigger: {
                trigger: `.${styles.container}`,
                scrub: 0.25,
                start: 0,
                endTrigger: `.${stylesMain.main}`,
                end: 'bottom bottom',
            },
            x: '1300px',
        });
        gsap.to([thirdDiv.current, fourthDiv.current], {
            scrollTrigger: {
                trigger: `.${styles.container}`,
                scrub: 0.25,
                start: 0,
                endTrigger: `.${stylesMain.main}`,
                end: 'bottom bottom',
            },
            x: '-1300px',
        });

        gsap.to(slider.current, {
            xPercent: -80,
            ease: 'none',
            scrollTrigger: {
                trigger: `.${stylesMain.main}`,
                start: 'top top',
                scrub: true,
                end: 'bottom bottom',
            },
        });

        requestAnimationFrame(animate);
    }, []);

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
        requestAnimationFrame(animate);
        xPercent += 0.01 * direction;
    };

    // Passe la carte cliquée à `toggleModal`
    const handleCardClick = (card) => {
        toggleModal(card); // Passe la carte cliquée
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
                <div
                    id={styles.copy1}
                    ref={secondDiv}
                    className={styles.caroussel}>
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
                <div
                    id={styles.copy1}
                    ref={fourthDiv}
                    className={styles.caroussel}>
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
