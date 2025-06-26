
import React from 'react';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentationPage = () => {
  const docSections = [
    {
      title: 'Platform Overview',
      description: 'Understanding the orientation platform features',
      items: ['Dashboard Navigation', 'User Roles', 'Getting Started Guide'],
    },
    {
      title: 'Training Management',
      description: 'Creating and managing training content',
      items: ['Creating Modules', 'Assigning Trainings', 'Progress Tracking'],
    },
    {
      title: 'Administration',
      description: 'Admin tools and user management',
      items: ['User Management', 'Analytics', 'System Settings'],
    },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive guides and API documentation
        </p>
      </div>

      <div className="space-y-6">
        {docSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="text-sm hover:text-primary cursor-pointer">
                    • {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTransition>
  );
};

export default DocumentationPage;
