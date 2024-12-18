import { Inter } from 'next/font/google';
import Header from '../components/Header';
import { useNavigateContext, NavigateProvider } from '@/context/navContaxt';
import { useModalContext, ModalProvider } from '@/context/modalContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Tristan Arlot | Freelance Designer & Developer',
    description:
        'I’m a Front-end developer based in Paris, focusing on web design and creative websites.',
    openGraph: {
        images: [
            {
                url: '/assets/tristan.jpg',
                width: 600,
                height: 943,
                alt: 'Tristan Arlot Web developer',
            },
        ],
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    shrinkToFit: 'yes',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                {/* Les balises meta seront automatiquement générées par Next.js */}
            </head>
            <ModalProvider>
                <NavigateProvider>
                    <body className={inter.className}>
                        <Header />
                        {children}
                    </body>
                </NavigateProvider>
            </ModalProvider>
        </html>
    );
}
