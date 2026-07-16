import './globals.css';
import SiteHeader from '@/components/SiteHeader';

export const metadata = {
  title: 'Inspired to Succeed',
  description: 'Executive leadership reflection, action planning and coaching intelligence.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <span>Inspired to Succeed</span>
            <span>Executive development and coaching intelligence</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
