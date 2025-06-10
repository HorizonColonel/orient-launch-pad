
import React, { useState } from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, BookOpen, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const TrainingAssignments = () => {
  const { progress, loading } = useEmployeeProgress();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Group progress by module for admin view
  const moduleStats = progress.reduce((acc, p) => {
    const moduleId = p.module_id;
    if (!acc[moduleId]) {
      acc[moduleId] = {
        module_title: p.module_title || 'Unknown Module',
        total: 0,
        completed: 0,
        in_progress: 0,
        not_started: 0,
        employees: []
      };
    }
    acc[moduleId].total++;
    acc[moduleId][p.status as keyof typeof acc[string]]++;
    acc[moduleId].employees.push({
      name: p.employee_name || 'Unknown',
      status: p.status,
      progress: p.progress_percentage || 0,
      completed_at: p.completed_at,
      started_at: p.started_at
    });
    return acc;
  }, {} as Record<string, any>);

  const handleAssignTraining = () => {
    // In a real app, this would open a modal to assign training
    console.log('Assign training to employees');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const moduleEntries = Object.entries(moduleStats);

  if (moduleEntries.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="mb-2">No Training Assignments</CardTitle>
          <CardDescription className="mb-4">
            Start by creating training modules and assigning them to employees.
          </CardDescription>
          <Button onClick={handleAssignTraining}>
            <UserPlus className="h-4 w-4 mr-2" />
            Assign Training
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Training Assignments ({moduleEntries.length} modules)
        </h2>
        <Button onClick={handleAssignTraining}>
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Training
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {moduleEntries.map(([moduleId, stats]) => {
          const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          
          return (
            <Card key={moduleId} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg leading-tight">
                      {stats.module_title}
                    </CardTitle>
                    <CardDescription>
                      {stats.total} employee{stats.total !== 1 ? 's' : ''} assigned
                    </CardDescription>
                  </div>
                  <Badge variant={completionRate === 100 ? 'default' : 'secondary'}>
                    {completionRate}% Complete
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{completionRate}%</span>
                  </div>
                  <Progress value={completionRate} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">{stats.completed}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-yellow-600">{stats.in_progress}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-gray-600">{stats.not_started}</div>
                    <div className="text-xs text-muted-foreground">Not Started</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Employee Progress</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedModule(selectedModule === moduleId ? null : moduleId)}
                    >
                      {selectedModule === moduleId ? 'Hide' : 'View'} Details
                    </Button>
                  </div>
                  
                  {selectedModule === moduleId && (
                    <div className="space-y-2 border-t pt-2">
                      {stats.employees.map((employee: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{employee.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              employee.status === 'completed' ? 'default' : 
                              employee.status === 'in_progress' ? 'secondary' : 'outline'
                            }>
                              {employee.status?.replace('_', ' ')}
                            </Badge>
                            <span className="text-muted-foreground">
                              {employee.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrainingAssignments;
