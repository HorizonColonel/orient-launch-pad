
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileSidebarProps {
  onTabChange?: (tab: string) => void;
}

const ProfileSidebar = ({ onTabChange }: ProfileSidebarProps) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { profile } = useAuth();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
    // Emit custom event for communication with ProfileContent
    window.dispatchEvent(new CustomEvent('profileTabChange', { detail: tab }));
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <Card className="h-fit">
      <CardContent className="p-0">
        <nav className="flex flex-col">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className={`justify-start h-12 rounded-none border-0 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              <tab.icon className="w-4 h-4 mr-3" />
              {tab.label}
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
