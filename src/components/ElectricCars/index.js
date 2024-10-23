import styles from './styles.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { Saira_Condensed } from 'next/font/google';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import eccImage from '@/../public/assets/electriccars5.jpg';

import eec from '@/../public/assets/EEC.jpg';

import stylesWrapper from '../../components/CarousselWrapper/styles.module.scss';

const saira_init = Saira_Condensed({
    weight: ['800'],
    subsets: ['latin'],
});

const ElectricCars = () => {
    const bannerRef = useRef(null);
    const doigtsRef = useRef(null);
    const deRef = useRef(null);
    const feeRef = useRef(null);
    const subtitlesRef = useRef(null);
    const dateRef = useRef(null);
    const dateContentRef = useRef(null);
    const rolesRef = useRef(null);
    const devContentRef = useRef(null);
    const techsRef = useRef(null);
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const video3Ref = useRef(null);
    const video4Ref = useRef(null);
    const photosRef = useRef(null);
    const reactContentRef = useRef(null);
    const videoRef = useRef(null);
    const containerVideoRef = useRef(null);
    const animationExecuted = useRef(false); // ref pour suivre l'état de l'animation

    useEffect(() => {
        if (!animationExecuted.current) {
            gsap.registerPlugin(ScrollTrigger);

            // Animations de texte
            gsap.fromTo(
                [
                    doigtsRef.current,
                    deRef.current,
                    feeRef.current,
                    subtitlesRef.current,
                ],
                { yPercent: -110 },
                {
                    delay: 0.4,
                    stagger: 0.1,
                    yPercent: 0,
                    duration: 0.3,
                    ease: 'power1.out',
                },
            );

            gsap.fromTo(
                [
                    dateRef.current,
                    dateContentRef.current,
                    rolesRef.current,
                    devContentRef.current,
                    techsRef.current,
                    reactContentRef.current,
                ],
                { yPercent: 110 },
                {
                    delay: 0.8,
                    stagger: 0.1,
                    yPercent: 0,
                    duration: 0.3,
                    ease: 'power1.out',
                },
            );

            gsap.fromTo(
                bannerRef.current,
                { xPercent: -110 },
                {
                    delay: 0.5,
                    xPercent: 0,
                    duration: 0.4,
                    ease: 'power1.out',
                },
            );

            // Configuration du ScrollTrigger après 500ms
            setTimeout(() => {
                configureScrollTrigger();
            }, 500);

            animationExecuted.current = true; // Marque l'animation comme exécutée
        }
    }, []);
    // Expose la fonction pour configurer le ScrollTrigger

    const configureScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: containerVideoRef.current,
            start: 'top center+=25%',
            end: 'top center+=25%',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (videoRef.current) {
                    gsap.to(videoRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            },
            onEnterBack: () => {
                if (videoRef.current) {
                    gsap.to(videoRef.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                    });
                }
            },
        });

        ScrollTrigger.refresh(true);
    };

    return (
        <div className={styles.work}>
            <div className={styles.header}>
                <Image
                    ref={bannerRef}
                    className={styles.banner}
                    src={eec}
                    width={420}
                    height={700}
                    alt="Doigts de fée home page"
                />
                <div className={styles.text}>
                    <div className={styles.textHeader}>
                        <div className={styles.title}>
                            <p className={saira_init.className}>
                                <span ref={doigtsRef}>ELECTRIC</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={deRef}>CARS</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={feeRef}>CONSEIL</span>
                            </p>
                        </div>
                        <p>
                            <span
                                ref={subtitlesRef}
                                className={`${styles.subtitle} ${saira_init.className}`}>
                                The website of a car dealership
                            </span>
                        </p>
                    </div>
                    <div className={styles.infos}>
                        <div className={styles.row}>
                            <p>
                                <span ref={dateRef}>DATE</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={dateContentRef}></span>
                            </p>
                        </div>
                        <div className={styles.row}>
                            <p>
                                <span ref={rolesRef}>ROLES</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={devContentRef}>Integrator</span>
                            </p>
                        </div>
                        <div className={styles.row}>
                            <p>
                                <span ref={techsRef}>TECHS</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={reactContentRef}>
                                    HTML/CSS/JS, GSAP
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div ref={photosRef} className={styles.photos}>
                    <video
                        loop
                        muted
                        autoPlay
                        width="320"
                        height="240"
                        ref={video1Ref}
                        preload="none">
                        <source
                            src="/assets/electriccars1.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <video
                        loop
                        muted
                        autoPlay
                        width="320"
                        height="240"
                        ref={video2Ref}
                        preload="none">
                        <source
                            src="/assets/electriccars2.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <video
                        loop
                        muted
                        autoPlay
                        width="320"
                        height="240"
                        ref={video3Ref}
                        preload="none">
                        <source
                            src="/assets/electriccars3.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <video
                        loop
                        muted
                        autoPlay
                        width="320"
                        height="240"
                        ref={video4Ref}
                        preload="none">
                        <source
                            src="/assets/electriccars4.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default ElectricCars;
