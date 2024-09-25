import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Saira_Condensed } from 'next/font/google';

const saira_init = Saira_Condensed({
    weight: ['900'],
    subsets: ['latin'],
});

export default function Card({ hover, imgUrl, imgTitle, onClick }) {
    return (
        <>
            {!hover ? (
                <div className={styles.card}>
                    <Image
                        src={imgUrl}
                        width={290}
                        height={380}
                        alt={imgTitle}></Image>
                </div>
            ) : (
                <div className={styles.main_card} onClick={onClick}>
                    <div className={styles.card}>
                        {imgUrl ? (
                            <Image
                                className={styles.work}
                                src={imgUrl}
                                width={290}
                                height={380}
                                alt={imgTitle}></Image>
                        ) : (
                            ''
                        )}

                        <p
                            className={`${styles.hover}  ${saira_init.className}`}>
                            {hover}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
