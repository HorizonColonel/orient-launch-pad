
import React from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

const TrainingProgress = () => {
  const { progress, loading } = useEmployeeProgress();

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = progress.filter(p => p.status === 'completed').length;
  const inProgressCount = progress.filter(p => p.status === 'in_progress').length;
  const totalModules = progress.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Modules</p>
                <p className="text-2xl font-bold">{totalModules}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Modules Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {progress.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No training modules assigned yet.
            </div>
          ) : (
            <div className="space-y-4">
              {progress.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status || 'not_started')}
                      <h4 className="font-medium">
                        {item.module_title || 'Unknown Module'}
                      </h4>
                    </div>
                    <Badge className={getStatusColor(item.status || 'not_started')}>
                      {item.status?.replace('_', ' ') || 'Not Started'}
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={item.progress_percentage || 0} 
                    className="mb-2"
                  />
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress: {item.progress_percentage || 0}%</span>
                    {item.completed_at && (
                      <span>
                        Completed: {new Date(item.completed_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingProgress;
