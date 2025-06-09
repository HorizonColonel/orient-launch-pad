import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  created_at: string | null;
  logo_url?: string | null;
  description?: string | null;
  mission?: string | null;
}

interface CompanyOverviewProps {
  company: Company;
}

interface DashboardStats {
  totalEmployees: number;
  totalModules: number;
  completedTrainings: number;
  inProgressTrainings: number;
  averageProgress: number;
}

const CompanyOverview = ({ company }: CompanyOverviewProps) => {
  const { profile, isCompanyAdmin } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalModules: 0,
    completedTrainings: 0,
    inProgressTrainings: 0,
    averageProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [profile]);

  const fetchDashboardStats = async () => {
    if (!profile?.company_id) return;

    try {
      // Fetch total employees in company
      const { data: employees, error: employeeError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('company_id', profile.company_id);

      if (employeeError) throw employeeError;

      // Fetch training modules for company
      const { data: modules, error: moduleError } = await supabase
        .from('training_modules')
        .select('id')
        .eq('company_id', profile.company_id)
        .eq('is_active', true);

      if (moduleError) throw moduleError;

      // Fetch progress data
      const { data: progress, error: progressError } = await supabase
        .from('employee_progress')
        .select('status, progress_percentage, employee_id')
        .in('employee_id', employees?.map(e => e.id) || []);

      if (progressError) throw progressError;

      const completedCount = progress?.filter(p => p.status === 'completed').length || 0;
      const inProgressCount = progress?.filter(p => p.status === 'in_progress').length || 0;
      const avgProgress = progress?.length > 0 
        ? progress.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / progress.length 
        : 0;

      setStats({
        totalEmployees: employees?.length || 0,
        totalModules: modules?.length || 0,
        completedTrainings: completedCount,
        inProgressTrainings: inProgressCount,
        averageProgress: Math.round(avgProgress),
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isCompanyAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Active company members</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalModules}</div>
            <p className="text-xs text-muted-foreground">Available courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedTrainings}</div>
            <p className="text-xs text-muted-foreground">Finished trainings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgressTrainings}</div>
            <p className="text-xs text-muted-foreground">Active trainings</p>
          </CardContent>
        </Card>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Overall Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Average Completion Rate</span>
                <span>{stats.averageProgress}%</span>
              </div>
              <Progress value={stats.averageProgress} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Completed
                </Badge>
                <span>{stats.completedTrainings}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  In Progress
                </Badge>
                <span>{stats.inProgressTrainings}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {company.mission || 'No mission statement available.'}
            </p>
            {company.created_at && (
              <p className="text-xs text-muted-foreground mt-4">
                Company established: {new Date(company.created_at).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyOverview;
