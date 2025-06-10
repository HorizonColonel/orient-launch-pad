
import React from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, User, BookOpen } from 'lucide-react';

const ActiveTrainings = () => {
  const { progress, loading, updateProgress } = useEmployeeProgress();
  const { isCompanyAdmin, profile } = useAuth();

  const activeTrainings = progress.filter(p => 
    p.status === 'in_progress' || p.status === 'not_started'
  );

  const handleStartTraining = async (moduleId: string) => {
    if (!profile?.id) return;
    await updateProgress(profile.id, moduleId, 'in_progress', 0);
  };

  const handleContinueTraining = (moduleId: string) => {
    // In a real app, this would navigate to the training content
    console.log('Continue training:', moduleId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-full mb-4"></div>
              <div className="h-8 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (activeTrainings.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="mb-2">No Active Trainings</CardTitle>
          <CardDescription>
            {isCompanyAdmin 
              ? "No employees have active training modules at the moment."
              : "You don't have any active training modules. Check back later for new assignments."
            }
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Active Training Modules ({activeTrainings.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTrainings.map((training) => (
          <Card key={training.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">
                    {training.module_title || 'Untitled Module'}
                  </CardTitle>
                  {isCompanyAdmin && training.employee_name && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {training.employee_name}
                    </div>
                  )}
                </div>
                <Badge variant={training.status === 'in_progress' ? 'default' : 'secondary'}>
                  {training.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{training.progress_percentage || 0}%</span>
                </div>
                <Progress value={training.progress_percentage || 0} />
              </div>

              {training.started_at && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Started {new Date(training.started_at).toLocaleDateString()}
                </div>
              )}

              <div className="flex gap-2">
                {training.status === 'not_started' ? (
                  <Button 
                    onClick={() => handleStartTraining(training.module_id)}
                    className="flex-1"
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Training
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleContinueTraining(training.module_id)}
                    variant="default"
                    className="flex-1"
                    size="sm"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveTrainings;
