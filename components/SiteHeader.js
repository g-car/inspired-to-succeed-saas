'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/', 'Home'],
  ['/toolkit', 'Toolkit'],
  ['/dashboard', 'Executive'],
  ['/coach', 'Coach'],
  ['/admin', 'Admin']
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">IS</span>
          <span><strong>Inspired to Succeed</strong><small>Executive Leadership SaaS</small></span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} className={pathname === href ? 'nav-link active' : 'nav-link'} href={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
