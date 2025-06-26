
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { book, users, dashboard, clock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

const DashboardPage = () => {
  const { profile, isCompanyAdmin } = useAuth();

  const employeeStats = [
    {
      title: 'Active Trainings',
      value: '3',
      description: 'In progress',
      icon: book,
      color: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: '12',
      description: 'This month',
      icon: dashboard,
      color: 'text-green-600',
    },
    {
      title: 'Hours Trained',
      value: '24.5',
      description: 'Total time',
      icon: clock,
      color: 'text-purple-600',
    },
  ];

  const adminStats = [
    {
      title: 'Total Employees',
      value: '156',
      description: 'Active users',
      icon: users,
      color: 'text-blue-600',
    },
    {
      title: 'Training Modules',
      value: '28',
      description: 'Available',
      icon: book,
      color: 'text-green-600',
    },
    {
      title: 'Completion Rate',
      value: '87%',
      description: 'This quarter',
      icon: dashboard,
      color: 'text-purple-600',
    },
  ];

  const stats = isCompanyAdmin ? adminStats : employeeStats;

  const recentActivity = [
    {
      title: 'Data Protection Training',
      status: 'completed',
      date: '2 hours ago',
    },
    {
      title: 'Leadership Development',
      status: 'in-progress',
      date: 'Started yesterday',
    },
    {
      title: 'Safety Protocols',
      status: 'pending',
      date: 'Due in 3 days',
    },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {isCompanyAdmin ? 'Admin Dashboard' : 'My Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {isCompanyAdmin 
            ? 'Manage and monitor training programs for your organization'
            : 'Track your learning progress and access training materials'
          }
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest training activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between space-y-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.date}
                  </p>
                </div>
                <Badge
                  variant={
                    activity.status === 'completed'
                      ? 'default'
                      : activity.status === 'in-progress'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Your monthly training progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Monthly Goal</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Quarterly Goal</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="w-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Annual Goal</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
