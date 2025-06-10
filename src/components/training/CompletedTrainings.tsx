
import React from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, User, Calendar, Award } from 'lucide-react';

const CompletedTrainings = () => {
  const { progress, loading } = useEmployeeProgress();
  const { isCompanyAdmin } = useAuth();

  const completedTrainings = progress.filter(p => p.status === 'completed');

  const handleDownloadCertificate = (moduleId: string) => {
    // In a real app, this would generate and download a certificate
    console.log('Download certificate for module:', moduleId);
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
              <div className="h-8 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (completedTrainings.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="mb-2">No Completed Trainings</CardTitle>
          <CardDescription>
            {isCompanyAdmin 
              ? "No employees have completed training modules yet."
              : "You haven't completed any training modules yet. Keep working on your active trainings!"
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
          Completed Training Modules ({completedTrainings.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedTrainings.map((training) => (
          <Card key={training.id} className="hover:shadow-md transition-shadow border-green-100">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {training.module_title || 'Untitled Module'}
                  </CardTitle>
                  {isCompanyAdmin && training.employee_name && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      {training.employee_name}
                    </div>
                  )}
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center justify-center text-green-700">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    <span className="font-medium">100% Complete</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                {training.started_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Started: {new Date(training.started_at).toLocaleDateString()}
                  </div>
                )}
                {training.completed_at && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Completed: {new Date(training.completed_at).toLocaleDateString()}
                  </div>
                )}
              </div>

              <Button 
                onClick={() => handleDownloadCertificate(training.module_id)}
                variant="outline"
                className="w-full"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompletedTrainings;
