import styles from './styles.module.scss';
import Image from 'next/image';

import { Saira_Condensed } from 'next/font/google';
import ddf from '@/../public/assets/bannerDDF.jpg';
const saira_init = Saira_Condensed({
    weight: ['800'],
    subsets: ['latin'],
});
export default function DoigtsDeFee() {
    return (
        <div className={styles.work}>
            <div className={styles.header}>
                <Image
                    className={styles.banner}
                    src={ddf}
                    width={420}
                    height={700}
                    alt="Doigts de fée home page"
                />
                <div className={styles.text}>
                    <div className={styles.textHeader}>
                        <div className={styles.title}>
                            <p className={saira_init.className}>DOIGTS</p>
                            <p className={saira_init.className}>DE</p>
                            <p className={saira_init.className}>FEE</p>
                        </div>
                        <p
                            className={`${styles.subtitle}  ${saira_init.className}`}>
                            The website of a nail artist
                        </p>
                    </div>
                    <div className={styles.infos}>
                        <div className={styles.row}>
                            <p>DATE</p>
                            <p className={styles.light}>July 2024</p>
                        </div>
                        <div className={styles.row}>
                            <p>ROLES</p>
                            <p className={styles.light}>Developper, Designer</p>
                        </div>
                        <div className={styles.row}>
                            <p>TECHS</p>
                            <p className={styles.light}>React, Figma, GSAP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
