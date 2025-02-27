import styles from './styles.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { Saira_Condensed } from 'next/font/google';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import moi from '@/../public/assets/tristan.jpg';
import stylesWrapper from '../../components/CarousselWrapper/styles.module.scss';

const saira_init = Saira_Condensed({
    weight: ['800'],
    subsets: ['latin'],
});

const Contact = () => {
    const bannerRef = useRef(null);
    const letsRef = useRef(null);
    const workRef = useRef(null);
    const togetherRef = useRef(null);
    const subtitlesRef = useRef(null);
    const contentRef = useRef(null);
    const instaRef = useRef(null);
    const linkedinRef = useRef(null);
    const gitRef = useRef(null);
    const buttonRef = useRef(null);
    const titleRef = useRef(null);
    const animationExecuted = useRef(false); // ref pour suivre l'état de l'animation

    useEffect(() => {
        if (!animationExecuted.current) {
            gsap.registerPlugin(ScrollTrigger);

            // Animations de texte
            gsap.fromTo(
                [
                    letsRef.current,
                    workRef.current,
                    togetherRef.current,
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
            if (window.matchMedia('(min-width: 1024px)').matches) {
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
            } else {
                gsap.fromTo(
                    bannerRef.current,
                    { yPercent: 40 },
                    {
                        delay: 0.2,
                        yPercent: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    },
                );
            }

            // Configuration du ScrollTrigger après 500ms
            setTimeout(() => {
                configureScrollTrigger();
            }, 500);

            animationExecuted.current = true; // Marque l'animation comme exécutée
        }
    }, []);

    const configureScrollTrigger = () => {
        // if (window.matchMedia('(max-width: 1050px)').matches) {
        //     ScrollTrigger.create({
        //         trigger: `.${styles.text}`,
        //         start: 'center center',
        //         scroller: `.${stylesWrapper.container_modal}`,
        //         scrub: true,
        //         animation: gsap.to(`.${styles.textHeader}`, { yPercent: -15 }),
        //     });
        // }

        ScrollTrigger.create({
            trigger: contentRef.current,
            start: 'top center+=25%',
            end: 'top center+=25%',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (contentRef.current) {
                    // Désactiver la transition CSS
                    [
                        instaRef.current,
                        linkedinRef.current,
                        gitRef.current,
                    ].forEach((ref) => {
                        ref.style.transition = 'none'; // Désactiver
                    });

                    gsap.to(
                        [instaRef.current, linkedinRef.current, gitRef.current],
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            stagger: 0.1,
                            onComplete: () => {
                                // Réactiver la transition CSS après l'animation
                                [
                                    instaRef.current,
                                    linkedinRef.current,
                                    gitRef.current,
                                ].forEach((ref) => {
                                    ref.style.transition = '.3s'; // Réactiver
                                });
                            },
                        },
                    );
                }
            },
            onEnterBack: () => {
                if (contentRef.current) {
                    // Désactiver la transition CSS
                    [
                        instaRef.current,
                        linkedinRef.current,
                        gitRef.current,
                    ].forEach((ref) => {
                        ref.style.transition = 'none'; // Désactiver
                    });

                    gsap.to(
                        [instaRef.current, linkedinRef.current, gitRef.current],
                        {
                            opacity: 0,
                            y: 100,
                            duration: 0.3,
                            stagger: 0.1,
                            onComplete: () => {
                                // Réactiver la transition CSS après l'animation
                                [
                                    instaRef.current,
                                    linkedinRef.current,
                                    gitRef.current,
                                ].forEach((ref) => {
                                    ref.style.transition = '.3s'; // Réactiver
                                });
                            },
                        },
                    );
                }
            },
        });

        ScrollTrigger.create({
            trigger: contentRef.current,
            start: 'bottom bottom',
            end: 'bottom bottom',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (buttonRef.current) {
                    // Désactiver la transition CSS
                    buttonRef.current.style.transition = 'none'; // Désactiver

                    gsap.to(buttonRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        onComplete: () => {
                            // Réactiver la transition CSS après l'animation
                            buttonRef.current.style.transition = '.3s'; // Réactiver
                        },
                    });
                }
            },
            onEnterBack: () => {
                if (buttonRef.current) {
                    // Désactiver la transition CSS
                    buttonRef.current.style.transition = 'none'; // Désactiver

                    gsap.to(buttonRef.current, {
                        opacity: 0,
                        y: 100,
                        duration: 0.3,
                        onComplete: () => {
                            // Réactiver la transition CSS après l'animation
                            buttonRef.current.style.transition = '.3s'; // Réactiver
                        },
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
                    src={moi}
                    width={416}
                    height={654}
                    alt="Photo Tristan Arlot"
                />
                <div className={styles.text}>
                    <div className={styles.textHeader}>
                        <div ref={titleRef} className={styles.title}>
                            <p className={saira_init.className}>
                                <span ref={letsRef}>LET'S</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={workRef}>WORK</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={togetherRef}>TOGETHER</span>
                            </p>
                        </div>
                        <p>
                            <span
                                ref={subtitlesRef}
                                className={`${styles.subtitle} ${saira_init.className}`}>
                                I’m a Front-end developer based in Paris, focus
                                on web design and creative website. I help
                                agencies, startups and designers by providing
                                advanced animation and creativity in web
                                development.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div ref={contentRef} className={styles.content}>
                <div className={styles.reseaux}>
                    <a
                        ref={instaRef}
                        target="_blank"
                        href="https://x.com/TristanArlot"
                        className={styles.reseau}>
                        Twitter / X
                    </a>
                    <a
                        ref={linkedinRef}
                        target="_blank"
                        href="https://www.linkedin.com/in/tristan-arlot-934905154/"
                        className={styles.reseau}>
                        Linkedin
                    </a>
                    <a
                        ref={gitRef}
                        target="_blank"
                        href="https://github.com/trarlot"
                        className={styles.reseau}>
                        Github
                    </a>
                </div>
                <a
                    ref={buttonRef}
                    target="_blank"
                    href="mailto:tristan.arlot@hotmail.com"
                    className={`${styles.button} ${saira_init.className}`}>
                    Available for freelance work
                </a>
                <a
                    target="_blank"
                    href="https://www.malt.fr/profile/tristan-arlot"
                    className={styles.button}>
                    Malt
                </a>
            </div>
        </div>
    );
};

export default Contact;
