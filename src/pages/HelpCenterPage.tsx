
import React from 'react';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HelpCircle, FileText, Settings, Users } from 'lucide-react';

const HelpCenterPage = () => {
  const helpTopics = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using the platform',
      icon: HelpCircle,
    },
    {
      title: 'Training Management',
      description: 'How to create and assign training modules',
      icon: FileText,
    },
    {
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
    },
    {
      title: 'User Management',
      description: 'Add and manage team members',
      icon: Users,
    },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and get support
        </p>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search for help topics..."
          className="w-full"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {helpTopics.map((topic) => (
          <Card key={topic.title} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <topic.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
};

export default HelpCenterPage;
