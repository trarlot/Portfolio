'use client';
import { createContext, useContext, useState } from 'react';

const Modal = createContext();

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const toggleModal = (card) => {
        setSelectedCard(card); // Enregistre la carte cliquée
        setIsOpen(!isOpen);
    };

    return (
        <Modal.Provider value={{ isOpen, toggleModal, selectedCard }}>
            {children}
        </Modal.Provider>
    );
}

export function useModalContext() {
    return useContext(Modal);
}
