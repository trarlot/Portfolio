'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import Caroussel from '../Caroussel';
import styles from './styles.module.scss';
import Modal from '../Modal';
import DoigtsDeFee from '../DoigstDeFee';
import Lenis from 'lenis';
import { useModalContext, ModalProvider } from '@/context/modalContext';

gsap.registerPlugin(ScrollTrigger); // Enregistre ScrollTrigger pour l'utiliser

function CarousselContent({
    randomizedKeys1,
    randomizedKeys2,
    randomizedAndFixedCards,
}) {
    const { isOpen, selectedCard, toggleModal } = useModalContext();
    const [currentComponent, setCurrentComponent] = useState(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis();
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (selectedCard) {
            switch (selectedCard.id) {
                case 'doigtsDeFee':
                    setCurrentComponent(<DoigtsDeFee />);
                    break;
                case 'thisComponent':
                    setCurrentComponent(<ThisComponent />);
                    break;
                default:
                    setCurrentComponent(null);
            }
        }
    }, [selectedCard]);

    useEffect(() => {
        if (isOpen) {
            // Animation d'ouverture de la modal
            gsap.fromTo(
                modalRef.current,
                { y: '150vh' }, // Départ en bas de l'écran
                { y: '5vh', duration: 0.5, ease: 'power2.out' },
            );

            // Animation d'apparition de l'overlay
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
            );

            // Activation de ScrollTrigger pour le contenu de la modal
            ScrollTrigger.create({
                trigger: modalRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                markers: false, // Affiche des marqueurs pour tester si besoin
                onEnter: () => console.log('Modal scrolling activated!'),
            });
        } else if (modalRef.current) {
            // Animation de fermeture de la modal
            gsap.to(modalRef.current, {
                y: '150vh',
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    toggleModal(); // Ferme la modal après l'animation
                },
            });

            // Nettoyer ScrollTrigger lorsque la modal se ferme
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        }
    }, [isOpen]);

    const handleCloseModal = () => {
        gsap.to(modalRef.current, {
            y: '150vh',
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                toggleModal();
            },
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
        });

        // Supprimer les triggers pour le scroll dans la modal
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    return (
        <>
            <Caroussel
                randomizedKeys1={randomizedKeys1}
                randomizedKeys2={randomizedKeys2}
                randomizedAndFixedCards={randomizedAndFixedCards}
            />
            {isOpen && (
                <>
                    <div
                        className={styles.overlay}
                        onClick={handleCloseModal}
                        ref={overlayRef}
                    />
                    <div className={styles.containerModal}>
                        <div className={styles.ref} ref={modalRef}>
                            <span
                                className={styles.cross}
                                onClick={handleCloseModal}>
                                X
                            </span>
                            <Modal>{currentComponent}</Modal>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default function CarousselWrapper(props) {
    return (
        <ModalProvider>
            <CarousselContent {...props} />
        </ModalProvider>
    );
}
