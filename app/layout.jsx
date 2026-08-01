import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: {
        default: 'MedSpace — Find Your Next Medical Office',
        template: '%s | MedSpace',
    },
    description: 'The only platform dedicated to medical office spaces. Find exam rooms, surgical suites, dental offices, and more to lease, sublet, or share.',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
    },
    keywords: [
        'medical office space',
        'doctor office rental',
        'medical subleasing',
        'exam room rental',
        'healthcare real estate',
        'medical space listing',
    ],
    authors: [{ name: 'MedSpace' }],
    creator: 'MedSpace',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.linkmedicalspaces.com',
        siteName: 'MedSpace',
        title: 'MedSpace — Find Your Next Medical Office',
        description: 'The only platform dedicated to medical office spaces. Find exam rooms, surgical suites, dental offices, and more.',
        images: [
            {
                url: 'https://www.linkmedicalspaces.com/wp-content/uploads/2024/04/LMS-Image-1-1473559425.jpg',
                width: 1600,
                height: 1067,
                alt: 'MedSpace',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MedSpace',
        description: 'Find your next medical office space',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>);
}
