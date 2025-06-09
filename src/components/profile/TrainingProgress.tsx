
import React from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';

const TrainingProgress = () => {
  const { progress, loading } = useEmployeeProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
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
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">{completedCount}</div>
          <div className="text-xs text-green-600">Completed</div>
        </div>
        <div className="p-2 bg-yellow-50 rounded-lg">
          <div className="text-lg font-bold text-yellow-600">{inProgressCount}</div>
          <div className="text-xs text-yellow-600">In Progress</div>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">{totalModules}</div>
          <div className="text-xs text-blue-600">Total</div>
        </div>
      </div>

      {/* Training Modules List */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Recent Modules</h4>
        {progress.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No training modules assigned yet.
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {progress.slice(0, 5).map((item) => (
              <div key={item.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status || 'not_started')}
                    <h5 className="font-medium text-sm truncate">
                      {item.module_title || 'Unknown Module'}
                    </h5>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(item.status || 'not_started')}`}>
                    {item.status?.replace('_', ' ') || 'Not Started'}
                  </Badge>
                </div>
                
                <Progress 
                  value={item.progress_percentage || 0} 
                  className="h-2"
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{item.progress_percentage || 0}%</span>
                  {item.completed_at && (
                    <span>
                      {new Date(item.completed_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {progress.length > 5 && (
              <div className="text-center text-sm text-muted-foreground">
                +{progress.length - 5} more modules
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingProgress;
