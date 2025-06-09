
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileInfo from './ProfileInfo';
import TrainingProgress from './TrainingProgress';
import ProfileSettings from './ProfileSettings';
import { User, BookOpen, Settings } from 'lucide-react';

const ProfileTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="training" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          My Training
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="mt-6">
        <ProfileInfo />
      </TabsContent>
      
      <TabsContent value="training" className="mt-6">
        <TrainingProgress />
      </TabsContent>
      
      <TabsContent value="settings" className="mt-6">
        <ProfileSettings />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
