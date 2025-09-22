import styles from './styles.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { Saira_Condensed } from 'next/font/google';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import eec from '@/../public/assets/EEC.jpg';

import stylesWrapper from '../../components/CarousselWrapper/styles.module.scss';
const saira_light_init = Saira_Condensed({
    weight: ['600'],
    subsets: ['latin'],
});
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
    const introRef = useRef(null);
    const reactContentRef = useRef(null);
    const videoRef = useRef(null);
    const containerVideoRef = useRef(null);
    const animationExecuted = useRef(false); // ref pour suivre l'état de l'animation

    useEffect(() => {
        if (!animationExecuted.current) {
            gsap.registerPlugin(ScrollTrigger);

            if (window.matchMedia('(min-width:1024px)').matches) {
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
                    { yPercent: 20 },
                    {
                        delay: 0.2,
                        yPercent: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    },
                );
            }
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
            trigger: introRef.current,
            start: 'top bottom-=10%',
            end: 'top bottom-=10%',
            scroller: `.${stylesWrapper.container_modal}`,

            onEnter: () => {
                if (introRef.current) {
                    gsap.to(
                        introRef.current,

                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: 'power1.out',
                            stagger: 0.2,
                        },
                    );
                }
            },
            onEnterBack: () => {
                if (introRef.current) {
                    gsap.to(introRef.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                        stagger: 0.2,
                    });
                }
            },
        });
        ScrollTrigger.create({
            trigger: video1Ref.current,
            start: 'top bottom-=10%',
            end: 'top bottom-=10%',
            scroller: `.${stylesWrapper.container_modal}`,

            onEnter: () => {
                if (video1Ref.current) {
                    gsap.to(
                        video1Ref.current,

                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: 'power1.out',
                            stagger: 0.2,
                        },
                    );
                }
            },
            onEnterBack: () => {
                if (video1Ref.current) {
                    gsap.to(video1Ref.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                        stagger: 0.2,
                    });
                }
            },
        });
        ScrollTrigger.create({
            trigger: video2Ref.current,
            start: 'top bottom-=10%',
            end: 'top bottom-=10%',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (video2Ref.current) {
                    gsap.to(
                        video2Ref.current,

                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: 'power1.out',
                            stagger: 0.2,
                        },
                    );
                }
            },
            onEnterBack: () => {
                if (video2Ref.current) {
                    gsap.to(video2Ref.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                        stagger: 0.2,
                    });
                }
            },
        });
        ScrollTrigger.create({
            trigger: video3Ref.current,
            start: 'top bottom-=10%',
            end: 'top bottom-=10%',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (video3Ref.current) {
                    gsap.to(video3Ref.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            },
            onEnterBack: () => {
                if (video3Ref.current) {
                    gsap.to(video3Ref.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                    });
                }
            },
        });
        ScrollTrigger.create({
            trigger: video4Ref.current,
            start: 'top bottom-=10%',
            end: 'top bottom-=10%',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (video4Ref.current) {
                    gsap.to(video4Ref.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            },
            onEnterBack: () => {
                if (video4Ref.current) {
                    gsap.to(video4Ref.current, {
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
                    width={400}
                    height={792}
                    alt="Electric Cars home page"
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
                                <span ref={dateContentRef}>January 2024</span>
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
                <p ref={introRef} className={styles.intro}>
                    Electric Cars is a website I worked on during my permanent
                    contract at SpiderVO. Our team included two integrators and
                    a web designer. Here, you'll find the pages I worked on,
                    particularly focusing on animations.
                </p>
                <div ref={photosRef} className={styles.photos}>
                    <video
                        loop
                        muted
                        autoPlay
                        playsInline
                        width="330"
                        height="213"
                        ref={video1Ref}
                        preload="auto">
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
                        playsInline
                        width="330"
                        height="213"
                        ref={video2Ref}
                        preload="auto">
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
                        playsInline
                        width="330"
                        height="213"
                        ref={video3Ref}
                        preload="auto">
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
                        playsInline
                        width="330"
                        height="213"
                        ref={video4Ref}
                        preload="auto">
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
