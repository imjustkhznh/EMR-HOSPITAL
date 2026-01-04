'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface Breadcrumb {
  label: string;
  href: string;
}

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Trang chủ', href: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Custom labels
    const labelMap: Record<string, string> = {
      'dashboard': 'Dashboard',
      'patients': 'Bệnh nhân',
      'medical-records': 'Hồ sơ Y tế',
      'doctors': 'Bác sĩ',
    };

    breadcrumbs.push({
      label: labelMap[segment] || label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = useMemo(() => generateBreadcrumbs(pathname), [pathname]);

  if (pathname === '/') {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-gray-200 px-6 py-3"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400" aria-hidden="true">
                /
              </span>
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
