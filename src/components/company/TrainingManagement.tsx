
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, BookOpen, Users, Calendar, Download } from 'lucide-react';
import CreateModuleDialog from './CreateModuleDialog';

interface TrainingModule {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ModuleProgress {
  module_id: string;
  total_assigned: number;
  completed: number;
  in_progress: number;
  not_started: number;
}

const TrainingManagement = () => {
  const { profile, isCompanyAdmin } = useAuth();
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [progressData, setProgressData] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    fetchTrainingModules();
    if (isCompanyAdmin) {
      fetchProgressData();
    }
  }, [profile, isCompanyAdmin]);

  const fetchTrainingModules = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('training_modules')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error fetching training modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgressData = async () => {
    if (!profile?.company_id) return;

    try {
      // Get all employees in company
      const { data: employees, error: empError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('company_id', profile.company_id);

      if (empError) throw empError;

      // Get progress for all modules
      const { data: progress, error: progError } = await supabase
        .from('employee_progress')
        .select('module_id, status')
        .in('employee_id', employees?.map(e => e.id) || []);

      if (progError) throw progError;

      // Calculate progress stats per module
      const progressStats = modules.map(module => {
        const moduleProgress = progress?.filter(p => p.module_id === module.id) || [];
        return {
          module_id: module.id,
          total_assigned: moduleProgress.length,
          completed: moduleProgress.filter(p => p.status === 'completed').length,
          in_progress: moduleProgress.filter(p => p.status === 'in_progress').length,
          not_started: moduleProgress.filter(p => p.status === 'not_started').length,
        };
      });

      setProgressData(progressStats);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return progressData.find(p => p.module_id === moduleId);
  };

  const calculateCompletionRate = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    if (!progress || progress.total_assigned === 0) return 0;
    return Math.round((progress.completed / progress.total_assigned) * 100);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Training Management</h2>
          <p className="text-muted-foreground">
            {isCompanyAdmin ? 'Manage and monitor training modules' : 'View your assigned training modules'}
          </p>
        </div>
        {isCompanyAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        )}
      </div>

      {/* Training Modules */}
      <div className="grid gap-4">
        {modules.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Training Modules</h3>
              <p className="text-muted-foreground mb-4">
                {isCompanyAdmin 
                  ? 'Get started by creating your first training module.' 
                  : 'No training modules have been assigned to you yet.'}
              </p>
              {isCompanyAdmin && (
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Module
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          modules.map((module) => {
            const progress = getModuleProgress(module.id);
            const completionRate = calculateCompletionRate(module.id);

            return (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>{module.title}</span>
                        <Badge variant={module.is_active ? "default" : "secondary"}>
                          {module.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      {module.description && (
                        <p className="text-muted-foreground mt-2">{module.description}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Created: {new Date(module.created_at).toLocaleDateString()}</div>
                      <div>Updated: {new Date(module.updated_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isCompanyAdmin && progress && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Completion Rate</span>
                          <span>{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{progress.total_assigned}</div>
                          <div className="text-muted-foreground">Assigned</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">{progress.completed}</div>
                          <div className="text-muted-foreground">Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-yellow-600">{progress.in_progress}</div>
                          <div className="text-muted-foreground">In Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-gray-600">{progress.not_started}</div>
                          <div className="text-muted-foreground">Not Started</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {isCompanyAdmin && (
                        <>
                          <Button variant="outline" size="sm">
                            <Users className="w-4 h-4 mr-2" />
                            Assign Users
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Materials
                          </Button>
                        </>
                      )}
                    </div>
                    {isCompanyAdmin && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Create Module Dialog */}
      <CreateModuleDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onModuleCreated={fetchTrainingModules}
      />
    </div>
  );
};

export default TrainingManagement;
