import { Inter } from 'next/font/google';
import Header from '../components/Header';
import { useModalContext, ModalProvider } from '@/context/modalContext';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Tristan Arlot | Freelance Designer & Developer',
    description:
        'I’m a Front-end developer based in Paris, focus on web design and creative website. I help agencies, startups and designers by providing advanced animation and creativity in web development.',
    openGraph: {
        images: [
            {
                url: '/assets/tristan.jpg', // Remplacez par l'URL de votre image
                width: 600, // Largeur de l'image
                height: 943, // Hauteur de l'image
                alt: 'Tristan Arlot Web developer', // Description de l'image
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ModalProvider>
                <body className={inter.className}>
                    <Header />
                    {children}
                </body>
            </ModalProvider>
        </html>
    );
}
