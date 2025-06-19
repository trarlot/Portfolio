import { Inter } from 'next/font/google';
import Header from '../components/Header';
import { useNavigateContext, NavigateProvider } from '@/context/navContaxt';
import { useModalContext, ModalProvider } from '@/context/modalContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Tristan Arlot | Freelance Designer & Developer',
    description:
        "I'm a Front-end developer based in Paris, focusing on web design and creative websites.",
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

                <link
                    rel="preload"
                    href="/assets/electriccars1.mp4"
                    as="video"
                    type="video/mp4"
                />
                <link
                    rel="preload"
                    href="/assets/electriccars2.mp4"
                    as="video"
                    type="video/mp4"
                />
                <link
                    rel="preload"
                    href="/assets/electriccars3.mp4"
                    as="video"
                    type="video/mp4"
                />
                <link
                    rel="preload"
                    href="/assets/electriccars4.mp4"
                    as="video"
                    type="video/mp4"
                />

                <link rel="preload" href="/assets/doigtsdefee.jpg" as="image" />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-website.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-website-2.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-website-3.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-website-4.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-video-poster.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/doigts-de-fee-video.mp4"
                    as="video"
                    type="video/mp4"
                />

                <link
                    rel="preload"
                    href="/assets/dandadanCover.png"
                    as="image"
                />
                <link rel="preload" href="/assets/okarun.png" as="image" />
                <link rel="preload" href="/assets/momo.png" as="image" />
                <link rel="preload" href="/assets/Seiko.png" as="image" />
                <link rel="preload" href="/assets/aira.png" as="image" />
                <link
                    rel="preload"
                    href="/assets/dandadan-poster.jpg"
                    as="image"
                />
                <link
                    rel="preload"
                    href="/assets/dandadanVideo.mp4"
                    as="video"
                    type="video/mp4"
                />

                <link rel="preload" href="/assets/tristan.jpg" as="image" />

                <link
                    rel="preload"
                    href="/assets/electriccars5.jpg"
                    as="image"
                />
                <link rel="preload" href="/assets/EEC.jpg" as="image" />
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
