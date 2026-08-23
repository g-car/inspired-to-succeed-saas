import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Inspired to Succeed',
  description:
    'Interactive executive leadership development and vision-board experience by Wezi Khoza.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav-wrap">
            <Link href="/" className="brand">
              <span className="brand-mark">IS</span>

              <span className="brand-copy">
                <strong>Inspired to Succeed</strong>
                <small>Executive Leadership Experience</small>
              </span>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/toolkit">Toolkit</Link>
              <Link href="/coach">Coach</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
