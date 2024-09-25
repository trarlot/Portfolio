'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap'; // Assurez-vous d'importer GSAP
import Caroussel from '../Caroussel';
import styles from './styles.module.scss';
import Modal from '../Modal';
import DoigtsDeFee from '../DoigstDeFee';
import Lenis from 'lenis';
import { useModalContext, ModalProvider } from '@/context/modalContext';

function CarousselContent({
    randomizedKeys1,
    randomizedKeys2,
    randomizedAndFixedCards,
}) {
    const { isOpen, selectedCard, toggleModal } = useModalContext(); // Récupère l'état de la carte sélectionnée et la fonction pour changer l'état
    const [currentComponent, setCurrentComponent] = useState(null); // État pour le composant à afficher
    const modalRef = useRef(null); // Référence pour la modal
    const overlayRef = useRef(null); // Référence pour l'overlay

    useEffect(() => {
        const lenis = new Lenis();

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }, []);

    // Met à jour le composant à afficher dans la modal selon la carte sélectionnée
    useEffect(() => {
        if (selectedCard) {
            switch (selectedCard.id) {
                case 'doigtsDeFee':
                    setCurrentComponent(<DoigtsDeFee />);
                    break;
                case 'thisComponent':
                    setCurrentComponent(<ThisComponent />); // Un autre composant que tu veux afficher
                    break;
                default:
                    setCurrentComponent(null);
            }
        }
    }, [selectedCard]);

    useEffect(() => {
        if (isOpen) {
            // Animation d'apparition quand la modal s'ouvre
            gsap.fromTo(
                modalRef.current,
                { y: '150vh' }, // Départ de l'animation (hors de l'écran)
                { y: '5vh', duration: 0.5, ease: 'power2.out' },
            );

            // Animation d'apparition de l'overlay
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 }, // Départ de l'animation (transparent)
                { opacity: 1, duration: 0.5 }, // Devient opaque
            );
        } else if (modalRef.current) {
            // Animation de disparition quand la modal se ferme
            gsap.to(modalRef.current, {
                y: '150vh',
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    toggleModal(); // Ferme la modal après l'animation
                },
            });
        }
    }, [isOpen]);

    const handleCloseModal = () => {
        gsap.to(modalRef.current, {
            y: '150vh',
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                toggleModal(); // Ferme la modal après l'animation
            },
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
        });
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
                        ref={overlayRef} // Référence à l'overlay
                    />
                    <div className={styles.ref} ref={modalRef}>
                        <span
                            className={styles.cross}
                            onClick={handleCloseModal}>
                            X
                        </span>
                        <Modal>{currentComponent}</Modal>
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
