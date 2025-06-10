
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TrainingOverview from './TrainingOverview';
import ActiveTrainings from './ActiveTrainings';
import CompletedTrainings from './CompletedTrainings';
import TrainingAssignments from './TrainingAssignments';
import { BookOpen, Clock, CheckCircle, Users } from 'lucide-react';

const MyTrainingDashboard = () => {
  const { profile, isCompanyAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isCompanyAdmin ? 'Training Management' : 'My Training'}
          </h1>
          <p className="text-muted-foreground">
            {isCompanyAdmin 
              ? 'Manage and monitor training programs for your team'
              : 'Track your learning progress and complete assigned training modules'
            }
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Active</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Completed</span>
            </TabsTrigger>
            {isCompanyAdmin && (
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Assignments</span>
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <TrainingOverview />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <ActiveTrainings />
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <CompletedTrainings />
          </TabsContent>

          {isCompanyAdmin && (
            <TabsContent value="assignments" className="mt-6">
              <TrainingAssignments />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default MyTrainingDashboard;
