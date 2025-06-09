
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Users, Search, UserPlus, Mail } from 'lucide-react';

interface Employee {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

interface EmployeeProgress {
  employee_id: string;
  total_modules: number;
  completed: number;
  in_progress: number;
}

const EmployeeManagement = () => {
  const { profile } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [progressData, setProgressData] = useState<EmployeeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchEmployeeProgress();
  }, [profile]);

  const fetchEmployees = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeProgress = async () => {
    if (!profile?.company_id) return;

    try {
      // Get all training modules for the company
      const { data: modules, error: moduleError } = await supabase
        .from('training_modules')
        .select('id')
        .eq('company_id', profile.company_id)
        .eq('is_active', true);

      if (moduleError) throw moduleError;

      // Get progress for all employees
      const { data: progress, error: progressError } = await supabase
        .from('employee_progress')
        .select('employee_id, status, module_id')
        .in('module_id', modules?.map(m => m.id) || []);

      if (progressError) throw progressError;

      // Calculate progress stats per employee
      const progressStats = employees.map(employee => {
        const empProgress = progress?.filter(p => p.employee_id === employee.id) || [];
        return {
          employee_id: employee.id,
          total_modules: modules?.length || 0,
          completed: empProgress.filter(p => p.status === 'completed').length,
          in_progress: empProgress.filter(p => p.status === 'in_progress').length,
        };
      });

      setProgressData(progressStats);
    } catch (error) {
      console.error('Error fetching employee progress:', error);
    }
  };

  const getEmployeeProgress = (employeeId: string) => {
    return progressData.find(p => p.employee_id === employeeId);
  };

  const calculateCompletionRate = (employeeId: string) => {
    const progress = getEmployeeProgress(employeeId);
    if (!progress || progress.total_modules === 0) return 0;
    return Math.round((progress.completed / progress.total_modules) * 100);
  };

  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.first_name || ''} ${employee.last_name || ''}`.toLowerCase();
    const email = employee.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Employee Management</h2>
          <p className="text-muted-foreground">Manage team members and monitor their progress</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Employee
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employee List */}
      <div className="grid gap-4">
        {filteredEmployees.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchTerm ? 'No employees found' : 'No employees yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms.'
                  : 'Start by inviting team members to join your company.'}
              </p>
              {!searchTerm && (
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Employee
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredEmployees.map((employee) => {
            const progress = getEmployeeProgress(employee.id);
            const completionRate = calculateCompletionRate(employee.id);

            return (
              <Card key={employee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {employee.first_name?.[0] || employee.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {employee.first_name && employee.last_name 
                            ? `${employee.first_name} ${employee.last_name}`
                            : employee.email}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{employee.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="capitalize">
                        {employee.role.replace('_', ' ')}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        Joined: {new Date(employee.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {progress && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{progress.total_modules}</div>
                          <div className="text-muted-foreground">Total</div>
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
                          <div className="font-medium">{completionRate}%</div>
                          <div className="text-muted-foreground">Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Progress
                        </Button>
                        <Button variant="outline" size="sm">
                          Assign Training
                        </Button>
                        <Button variant="outline" size="sm">
                          Send Message
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;
