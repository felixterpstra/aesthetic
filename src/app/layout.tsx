import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@/theme';
import { FeedbackProvider } from '@/context/feedback';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aesthetic | Find design inspiration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <FeedbackProvider>{children}</FeedbackProvider>
        </Theme>
      </body>
    </html>
  );
}
