
import React, { useState, useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileSettings from './ProfileSettings';
import TrainingProgress from './TrainingProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      setActiveTab(event.detail);
    };

    window.addEventListener('profileTabChange', handleTabChange as EventListener);
    
    return () => {
      window.removeEventListener('profileTabChange', handleTabChange as EventListener);
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo />;
      case 'settings':
        return <ProfileSettings />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Main Content Area */}
      <div className="xl:col-span-2">
        {renderTabContent()}
      </div>
      
      {/* Training Section - Always Visible on Right */}
      <div className="xl:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>My Training</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrainingProgress />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContent;
