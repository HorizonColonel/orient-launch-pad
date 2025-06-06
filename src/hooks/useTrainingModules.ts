
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type TrainingModule = Database['public']['Tables']['training_modules']['Row'];
type TrainingModuleInsert = Database['public']['Tables']['training_modules']['Insert'];

export const useTrainingModules = () => {
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();

  const fetchModules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('training_modules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModules(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching training modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const createModule = async (moduleData: Omit<TrainingModuleInsert, 'company_id'>) => {
    try {
      if (!profile?.company_id) {
        throw new Error('No company associated with user');
      }

      const { data, error } = await supabase
        .from('training_modules')
        .insert({
          ...moduleData,
          company_id: profile.company_id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setModules(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      console.error('Error creating training module:', err);
      return { data: null, error: err.message };
    }
  };

  const updateModule = async (id: string, updates: Partial<TrainingModule>) => {
    try {
      const { data, error } = await supabase
        .from('training_modules')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setModules(prev => prev.map(module => 
        module.id === id ? data : module
      ));
      return { data, error: null };
    } catch (err: any) {
      console.error('Error updating training module:', err);
      return { data: null, error: err.message };
    }
  };

  const deleteModule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('training_modules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setModules(prev => prev.filter(module => module.id !== id));
      return { error: null };
    } catch (err: any) {
      console.error('Error deleting training module:', err);
      return { error: err.message };
    }
  };

  useEffect(() => {
    if (profile) {
      fetchModules();
    }
  }, [profile]);

  return {
    modules,
    loading,
    error,
    createModule,
    updateModule,
    deleteModule,
    refetch: fetchModules,
  };
};
