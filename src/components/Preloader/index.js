'use client';
import styles from './styles.module.scss';
import Card from '../Caroussel/Card';
import { motion } from 'framer-motion';
import { slideUp } from './anim';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function PageComponent({ preloaderCard }) {
    const mobileRef = useRef(true);

    useEffect(() => {
        gsap.fromTo(
            mobileRef.current,

            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.3,
            },
        );
    }, []);

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className={styles.preloader}>
            <p ref={mobileRef} className={styles.mobile}>
                Use a desktop, for a better experience
            </p>

            <Card color={preloaderCard.color} hover={preloaderCard.hover} />
        </motion.div>
    );
}
