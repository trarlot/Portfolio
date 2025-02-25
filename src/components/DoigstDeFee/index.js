import styles from './styles.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
import { Saira_Condensed } from 'next/font/google';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ddf from '@/../public/assets/doigtsdefee.jpg';
import ddf1 from '@/../public/assets/doigts-de-fee-website.jpg';
import ddf2 from '@/../public/assets/doigts-de-fee-website-2.jpg';
import ddf3 from '@/../public/assets/doigts-de-fee-website-3.jpg';
import ddf4 from '@/../public/assets/doigts-de-fee-website-4.jpg';
import ddf5 from '@/../public/assets/doigts-de-fee-website-5.jpg';
import ddf6 from '@/../public/assets/doigts-de-fee-website-6.jpg';
import stylesWrapper from '../../components/CarousselWrapper/styles.module.scss';

const saira_init = Saira_Condensed({
    weight: ['800'],
    subsets: ['latin'],
});

const DoigtsDeFee = () => {
    const bannerRef = useRef(null);
    const doigtsRef = useRef(null);
    const deRef = useRef(null);
    const feeRef = useRef(null);
    const subtitlesRef = useRef(null);
    const dateRef = useRef(null);
    const julyRef = useRef(null);
    const rolesRef = useRef(null);
    const devRef = useRef(null);
    const techsRef = useRef(null);
    const photo1Ref = useRef(null);
    const photo2Ref = useRef(null);
    const photo3Ref = useRef(null);
    const photo4Ref = useRef(null);
    const reactRef = useRef(null);
    const videoRef = useRef(null);
    const containerVideoRef = useRef(null);
    const animationExecuted = useRef(false); // ref pour suivre l'état de l'animation

    useEffect(() => {
        if (!animationExecuted.current) {
            gsap.registerPlugin(ScrollTrigger);
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
                    julyRef.current,
                    rolesRef.current,
                    devRef.current,
                    techsRef.current,
                    reactRef.current,
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
    }, []); // Ajoute isOpen dans les dépendances
    // Expose la fonction pour configurer le ScrollTrigger

    const configureScrollTrigger = () => {
        ScrollTrigger.create({
            trigger: photo1Ref.current,
            start: 'top bottom',
            end: 'top bottom',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (photo1Ref.current) {
                    gsap.to(
                        photo1Ref.current,

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
                if (photo1Ref.current) {
                    gsap.to(photo1Ref.current, {
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
            trigger: photo2Ref.current,
            start: 'top bottom',
            end: 'top bottom',
            scroller: `.${stylesWrapper.container_modal}`,

            onEnter: () => {
                if (photo2Ref.current) {
                    gsap.to(
                        photo2Ref.current,

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
                if (photo2Ref.current) {
                    gsap.to(photo2Ref.current, {
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
            trigger: photo3Ref.current,
            start: 'top-=400px bottom',
            end: 'top-=400px bottom',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (photo3Ref.current) {
                    gsap.to(photo3Ref.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            },
            onEnterBack: () => {
                if (photo3Ref.current) {
                    gsap.to(photo3Ref.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                    });
                }
            },
        });
        ScrollTrigger.create({
            trigger: photo4Ref.current,
            start: 'top-=500px bottom',
            end: 'top-=500px bottom',
            scroller: `.${stylesWrapper.container_modal}`,
            onEnter: () => {
                if (photo4Ref.current) {
                    gsap.to(photo4Ref.current, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power1.out',
                    });
                }
            },
            onEnterBack: () => {
                if (photo4Ref.current) {
                    gsap.to(photo4Ref.current, {
                        opacity: 0,
                        y: 50,
                        duration: 0.3,
                        ease: 'power1.out',
                    });
                }
            },
        });

        ScrollTrigger.create({
            trigger: containerVideoRef.current,
            start: 'top bottom',
            end: 'top bottom',
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
                    src={ddf}
                    width={430}
                    height={700}
                    alt="Doigts de fée home page"
                />
                <div className={styles.text}>
                    <div className={styles.textHeader}>
                        <div className={styles.title}>
                            <p className={saira_init.className}>
                                <span ref={doigtsRef}>DOIGTS</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={deRef}>DE</span>
                            </p>
                            <p className={saira_init.className}>
                                <span ref={feeRef}>FEE</span>
                            </p>
                        </div>
                        <p>
                            <span
                                ref={subtitlesRef}
                                className={`${styles.subtitle} ${saira_init.className}`}>
                                The website of a nail artist
                            </span>
                        </p>
                    </div>
                    <div className={styles.infos}>
                        <div className={styles.row}>
                            <p>
                                <span ref={dateRef}>DATE</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={julyRef}>July 2024</span>
                            </p>
                        </div>
                        <div className={styles.row}>
                            <p>
                                <span ref={rolesRef}>ROLES</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={devRef}>Developer, Designer</span>
                            </p>
                        </div>
                        <div className={styles.row}>
                            <p>
                                <span ref={techsRef}>TECHS</span>
                            </p>
                            <p className={styles.light}>
                                <span ref={reactRef}>React, Figma, GSAP</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div ref={containerVideoRef} className={styles.video}>
                    <video
                        ref={videoRef}
                        loop
                        muted
                        poster="/assets/doigts-de-fee-video-poster.jpg"
                        width="320"
                        height="240"
                        playsinline
                        controls
                        preload="none">
                        <source
                            src="/assets/doigts-de-fee-video.mov"
                            type="video/mov"
                        />
                        <source
                            src="/assets/doigts-de-fee-video.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className={styles.photos}>
                    <Image
                        ref={photo1Ref}
                        className={styles.photo}
                        src={ddf1}
                        width={1047}
                        height={801}
                        alt="Doigts de fée accueil"
                    />
                    <Image
                        ref={photo2Ref}
                        className={styles.photo}
                        src={ddf2}
                        width={1047}
                        height={801}
                        alt="Doigts de fée intro"
                    />
                    <Image
                        ref={photo3Ref}
                        className={styles.photo}
                        src={ddf3}
                        width={1047}
                        height={801}
                        alt="Doigts de fée salon "
                    />
                    <Image
                        ref={photo4Ref}
                        className={styles.photo}
                        src={ddf4}
                        width={1047}
                        height={801}
                        alt="Doigts de fée menu "
                    />
                </div>
            </div>
        </div>
    );
};

export default DoigtsDeFee;
