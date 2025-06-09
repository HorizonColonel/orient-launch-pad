
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Building2, Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import CompanyOverview from './CompanyOverview';
import TrainingManagement from './TrainingManagement';
import EmployeeManagement from './EmployeeManagement';
import CompanySettings from './CompanySettings';

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  mission: string | null;
  created_at: string | null;
}

const CompanyDashboard = () => {
  const { profile, isCompanyAdmin } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCompanyData();
  }, [profile]);

  const fetchCompanyData = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', profile.company_id)
        .single();

      if (error) throw error;
      setCompany(data);
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h2>
          <p className="text-gray-600">Unable to load company information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Company Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              {company.logo_url ? (
                <img src={company.logo_url} alt={company.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="capitalize">
                  {profile?.role?.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>
          {company.description && (
            <p className="text-muted-foreground max-w-3xl">{company.description}</p>
          )}
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Training
            </TabsTrigger>
            {isCompanyAdmin && (
              <TabsTrigger value="employees" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Employees
              </TabsTrigger>
            )}
            {isCompanyAdmin && (
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <CompanyOverview company={company} />
          </TabsContent>

          <TabsContent value="training" className="mt-6">
            <TrainingManagement />
          </TabsContent>

          {isCompanyAdmin && (
            <TabsContent value="employees" className="mt-6">
              <EmployeeManagement />
            </TabsContent>
          )}

          {isCompanyAdmin && (
            <TabsContent value="settings" className="mt-6">
              <CompanySettings company={company} onCompanyUpdate={fetchCompanyData} />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
