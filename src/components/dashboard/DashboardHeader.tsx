
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useLocation } from 'react-router-dom';

export function DashboardHeader() {
  const { profile } = useAuth();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length === 0 || path === '/dashboard') {
      return [{ label: 'Dashboard', path: '/dashboard' }];
    }

    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }];
    
    // Add current page based on path
    const pathMap: Record<string, string> = {
      'my-training': 'My Training',
      'manage-trainings': 'Manage Trainings',
      'company': 'Company',
      'team-management': 'Team Management',
      'profile': 'My Profile',
      'account-settings': 'Account Settings',
      'help': 'Help Center',
      'docs': 'Documentation',
      'admin': 'Admin',
    };

    segments.forEach((segment, index) => {
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      const path = '/' + segments.slice(0, index + 1).join('/');
      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <BreadcrumbItem>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.path}>{crumb.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Welcome, {profile?.first_name || 'User'}
        </span>
      </div>
    </header>
  );
}
