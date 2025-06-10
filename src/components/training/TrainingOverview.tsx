
import React from 'react';
import { useEmployeeProgress } from '@/hooks/useEmployeeProgress';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, TrendingUp, Calendar, Users, AlertTriangle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TrainingOverview = () => {
  const { progress, loading } = useEmployeeProgress();
  const { isCompanyAdmin } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalModules = progress.length;
  const completedCount = progress.filter(p => p.status === 'completed').length;
  const inProgressCount = progress.filter(p => p.status === 'in_progress').length;
  const notStartedCount = progress.filter(p => p.status === 'not_started').length;
  const overallProgress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  // Calculate additional admin metrics
  const avgProgressPercentage = progress.length > 0 
    ? Math.round(progress.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / progress.length)
    : 0;

  const recentActivity = progress
    .filter(p => p.updated_at)
    .sort((a, b) => new Date(b.updated_at!).getTime() - new Date(a.updated_at!).getTime())
    .slice(0, 5);

  const upcomingDeadlines = progress
    .filter(p => p.status !== 'completed')
    .slice(0, 3);

  // Admin-specific metrics
  const employeeStats = isCompanyAdmin ? progress.reduce((acc, p) => {
    const employeeName = p.employee_name || 'Unknown';
    if (!acc[employeeName]) {
      acc[employeeName] = { total: 0, completed: 0, inProgress: 0 };
    }
    acc[employeeName].total++;
    if (p.status === 'completed') acc[employeeName].completed++;
    if (p.status === 'in_progress') acc[employeeName].inProgress++;
    return acc;
  }, {} as Record<string, any>) : {};

  const topPerformers = Object.entries(employeeStats)
    .map(([name, stats]) => ({
      name,
      completionRate: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
      ...stats
    }))
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalModules}</div>
            <p className="text-xs text-muted-foreground">
              {isCompanyAdmin ? 'Across all employees' : 'Assigned to you'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">
              Successfully finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Additional Admin Stats */}
      {isCompanyAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgProgressPercentage}%</div>
              <Progress value={avgProgressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Across all assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Started</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notStartedCount}</div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(employeeStats).length}</div>
              <p className="text-xs text-muted-foreground">
                With assigned training
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest training progress updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.module_title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          item.status === 'completed' ? 'default' : 
                          item.status === 'in_progress' ? 'secondary' : 'outline'
                        }>
                          {item.status?.replace('_', ' ')}
                        </Badge>
                        {isCompanyAdmin && item.employee_name && (
                          <span className="text-xs text-muted-foreground">
                            by {item.employee_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.progress_percentage || 0}%</p>
                      <p className="text-xs text-muted-foreground">
                        {item.updated_at && new Date(item.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Performers or Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isCompanyAdmin ? <TrendingUp className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
              {isCompanyAdmin ? 'Top Performers' : 'Next Steps'}
            </CardTitle>
            <CardDescription>
              {isCompanyAdmin ? 'Employees with highest completion rates' : 'Upcoming training modules'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isCompanyAdmin ? (
              topPerformers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No employee data available</p>
              ) : (
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {performer.completed}/{performer.total} completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{performer.completionRate}%</p>
                        <Progress value={performer.completionRate} className="w-16 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              upcomingDeadlines.length === 0 ? (
                <p className="text-sm text-muted-foreground">All caught up!</p>
              ) : (
                <div className="space-y-3">
                  {upcomingDeadlines.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{item.module_title}</h4>
                        <Badge variant="outline">
                          {item.status?.replace('_', ' ') || 'Not Started'}
                        </Badge>
                      </div>
                      <Progress value={item.progress_percentage || 0} className="mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.progress_percentage || 0}% complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingOverview;
