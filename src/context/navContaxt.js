'use client';
import { useLayoutEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import stylesCard from '@/components/Caroussel/Card/styles.module.scss';
const Navigate = createContext();

export function NavigateProvider({ children }) {
    const [navigate, setNavigate] = useState();
    const [distance, setDistance] = useState();

    useLayoutEffect(() => {
        if (window.innerWidth < 1024) {
            const card = document.querySelectorAll(
                `.${stylesCard.main_card}`,
            )[1];
            const calculatedDistance = getDistanceFromCenter(card);
            setNavigate(calculatedDistance);
            setDistance(calculatedDistance);
        }
    }, []);

    const getDistanceFromCenter = (element) => {
        const parentRect = element.parentElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        return elementRect.left + elementRect.width / 2 - parentRect.left;
    };
    const toggleLeft = () => {
        setNavigate((prev) => Math.max(distance, prev - distance - 62));
    };
    const toggleRight = () => {
        const cardLenght = document.querySelectorAll(
            `.${stylesCard.main_card}`,
        ).length;
        setNavigate((prev) =>
            Math.min((distance + 62) * cardLenght - 62, prev + distance + 62),
        );
    };

    return (
        <Navigate.Provider value={{ navigate, toggleLeft, toggleRight }}>
            {children}
        </Navigate.Provider>
    );
}

export function useNavigateContext() {
    return useContext(Navigate);
}
