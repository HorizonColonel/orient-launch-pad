
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  dashboard,
  book,
  settings,
  users,
  user,
  briefcase,
  help-circle,
  file-text,
  bell,
  log-out,
} from 'lucide-react';

export function AppSidebar() {
  const { profile, isCompanyAdmin, signOut } = useAuth();
  const location = useLocation();

  const corePages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: dashboard,
      description: 'Overview and metrics',
    },
    {
      title: 'My Trainings',
      url: '/my-training',
      icon: book,
      description: 'Your assigned trainings',
    },
    ...(isCompanyAdmin ? [{
      title: 'Manage Trainings',
      url: '/manage-trainings',
      icon: settings,
      description: 'Create and assign trainings',
    }] : []),
    {
      title: 'Company',
      url: '/company',
      icon: briefcase,
      description: 'Company resources',
    },
    ...(isCompanyAdmin ? [{
      title: 'Team Management',
      url: '/team-management',
      icon: users,
      description: 'Manage team members',
    }] : []),
  ];

  const profilePages = [
    {
      title: 'My Profile',
      url: '/profile',
      icon: user,
      description: 'Personal information',
    },
    {
      title: 'Account Settings',
      url: '/account-settings',
      icon: settings,
      description: 'Security and preferences',
    },
  ];

  const supportPages = [
    {
      title: 'Help Center',
      url: '/help',
      icon: help-circle,
      description: 'Get assistance',
    },
    {
      title: 'Documentation',
      url: '/docs',
      icon: file-text,
      description: 'Platform guides',
    },
  ];

  const adminPages = isCompanyAdmin ? [
    {
      title: 'User Access Control',
      url: '/admin/users',
      icon: users,
      description: 'Manage user permissions',
    },
    {
      title: 'Training Analytics',
      url: '/admin/analytics',
      icon: dashboard,
      description: 'Performance insights',
    },
    {
      title: 'HR Notifications',
      url: '/admin/notifications',
      icon: bell,
      description: 'System alerts',
    },
  ] : [];

  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">orientation.com.tr</span>
            <span className="text-xs text-muted-foreground">{profile?.role}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Core Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {corePages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    tooltip={item.description}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Profile & Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profilePages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    tooltip={item.description}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Support & Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportPages.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    tooltip={item.description}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {adminPages.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Admin Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminPages.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActiveRoute(item.url)}
                        tooltip={item.description}
                      >
                        <Link to={item.url}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} tooltip="Sign out">
              <log-out className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
