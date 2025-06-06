
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type EmployeeProgress = Database['public']['Tables']['employee_progress']['Row'];
type ProgressStatus = Database['public']['Enums']['progress_status'];

interface ProgressWithDetails extends EmployeeProgress {
  employee_name?: string;
  module_title?: string;
}

export const useEmployeeProgress = () => {
  const [progress, setProgress] = useState<ProgressWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile, isCompanyAdmin } = useAuth();

  const fetchProgress = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('employee_progress')
        .select(`
          *,
          user_profiles!employee_progress_employee_id_fkey(first_name, last_name),
          training_modules!employee_progress_module_id_fkey(title)
        `);

      // If not admin, only fetch own progress
      if (!isCompanyAdmin) {
        query = query.eq('employee_id', profile?.id);
      }

      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) throw error;

      // Transform data to include employee names and module titles
      const transformedData = data?.map(item => ({
        ...item,
        employee_name: item.user_profiles ? 
          `${item.user_profiles.first_name || ''} ${item.user_profiles.last_name || ''}`.trim() : 
          'Unknown',
        module_title: item.training_modules?.title || 'Unknown Module',
      })) || [];

      setProgress(transformedData);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching employee progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    employeeId: string,
    moduleId: string,
    status: ProgressStatus,
    progressPercentage?: number
  ) => {
    try {
      const updateData: any = {
        status,
        updated_at: new Date().toISOString(),
      };

      if (progressPercentage !== undefined) {
        updateData.progress_percentage = progressPercentage;
      }

      if (status === 'in_progress' && !updateData.started_at) {
        updateData.started_at = new Date().toISOString();
      }

      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
        updateData.progress_percentage = 100;
      }

      const { data, error } = await supabase
        .from('employee_progress')
        .upsert({
          employee_id: employeeId,
          module_id: moduleId,
          ...updateData,
        })
        .select()
        .single();

      if (error) throw error;

      // Refresh progress data
      await fetchProgress();
      
      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating progress:', err);
      return { data: null, error: err.message };
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return progress.filter(p => p.module_id === moduleId);
  };

  const getEmployeeProgress = (employeeId: string) => {
    return progress.filter(p => p.employee_id === employeeId);
  };

  useEffect(() => {
    if (profile) {
      fetchProgress();
    }
  }, [profile, isCompanyAdmin]);

  return {
    progress,
    loading,
    error,
    updateProgress,
    getModuleProgress,
    getEmployeeProgress,
    refetch: fetchProgress,
  };
};
