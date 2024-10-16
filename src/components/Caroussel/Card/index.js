import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Saira_Condensed } from 'next/font/google';

const saira_init = Saira_Condensed({
    weight: ['900'],
    subsets: ['latin'],
});

export default function Card({ hover, color, onClick, imgUrl, imgTitle, bg }) {
    const colorRgba = darkRGB(color);

    function darkRGB(rgbString) {
        // Expression régulière pour capturer les 3 valeurs entre parenthèses
        const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
        const result = regex.exec(rgbString);

        if (result) {
            let r = parseInt(result[1]);
            let g = parseInt(result[2]);
            let b = parseInt(result[3]);
            // Si la couleur est noire, remplacer par 22, 22, 22
            if (r === 0 && g === 0 && b === 0) {
                r = 30;
                g = 30;
                b = 30;
            } else {
                // Sinon, diviser chaque valeur par deux
                r = Math.floor(r / 2);
                g = Math.floor(g / 2);
                b = Math.floor(b / 2);
            }

            // Retourner une nouvelle chaîne de caractères RGB
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            throw new Error('Format de chaîne RGB invalide');
        }
    }
    return (
        <>
            {!hover ? (
                <div
                    style={{
                        '--card-color': color,
                        '--shadow-color': colorRgba,
                    }}
                    className={styles.card_container}>
                    <div className={styles.card}>
                        {imgUrl ? (
                            <Image
                                className={styles.work}
                                src={imgUrl}
                                width={150}
                                height={150}
                                alt={imgTitle}></Image>
                        ) : (
                            ''
                        )}
                        {bg ? (
                            <div className={styles.containerBg}>
                                <Image
                                    className={styles.bg}
                                    src={bg}
                                    width={400}
                                    height={400}
                                    alt={imgTitle}></Image>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        '--card-color': color,
                        '--shadow-color': colorRgba,
                    }}
                    className={styles.main_card}
                    onClick={onClick}>
                    <div className={styles.card_container}>
                        <div className={styles.card}>
                            {imgUrl ? (
                                <Image
                                    className={styles.click}
                                    src={imgUrl}
                                    width={135}
                                    height={135}
                                    alt={imgTitle}></Image>
                            ) : (
                                ''
                            )}
                            {bg ? (
                                <div className={styles.containerBg}>
                                    <Image
                                        className={styles.bg}
                                        src={bg}
                                        width={600}
                                        height={900}
                                        alt={imgTitle}></Image>
                                </div>
                            ) : (
                                ''
                            )}

                            <p
                                className={`${styles.hover}  ${saira_init.className}`}>
                                {hover}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
