"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ActiveLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export default function ActiveLink({ href, className = '', children }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`${className}${isActive ? ' is-active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
