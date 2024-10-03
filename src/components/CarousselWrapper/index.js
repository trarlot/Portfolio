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

const allowScroll = (e) => {
    e.stopPropagation();
};

function CarousselContent({
    randomizedKeys1,
    randomizedKeys2,
    randomizedAndFixedCards,
}) {
    const { isOpen, selectedCard, toggleModal } = useModalContext();
    const [currentComponent, setCurrentComponent] = useState(null);
    const modalRef = useRef(null);
    const container_modal = useRef(null);
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
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            // Animation d'ouverture de la modal
            gsap.fromTo(
                modalRef.current,
                { y: '150vh' }, // Départ de l'animation (hors de l'écran)
                { y: '0', duration: 0.5, ease: 'power2.out' },
            );

            // Animation d'apparition de l'overlay
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 }, // Départ de l'animation (transparent)
                { opacity: 1, duration: 0.5 }, // Devient opaque
            );

            // Ajouter un écouteur d'événements pour le défilement
            modalRef.current.addEventListener('wheel', allowScroll, {
                passive: false,
            });
        } else if (container_modal.current) {
            // Animation de disparition quand la modal se ferme
            gsap.to(container_modal.current, {
                y: '150vh',
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    toggleModal(); // Ferme la modal après l'animation
                },
            });
            container_modal.current.removeEventListener('wheel', allowScroll);
        }

        return () => {
            if (container_modal.current) {
                container_modal.current.removeEventListener(
                    'wheel',
                    allowScroll,
                );
            }
        };
    }, [isOpen]);

    const handleCloseModal = () => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
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
    };
    const handleClickOutsideModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal(); // Ferme la modal si le clic est à l'extérieur
        }
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
                        ref={overlayRef} // Référence à l'overlay
                    />
                    <div
                        ref={container_modal}
                        onClick={handleClickOutsideModal}
                        className={styles.container_modal}>
                        <Modal ref={modalRef} className={styles.ref}>
                            <span
                                className={styles.cross}
                                onClick={handleCloseModal}>
                                X
                            </span>
                            {currentComponent}
                        </Modal>
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
