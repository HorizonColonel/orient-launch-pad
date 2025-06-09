
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import CompanyDashboard from '@/components/company/CompanyDashboard';

const CompanyPage = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!profile?.company_id || (profile?.role !== 'company_admin' && profile?.role !== 'employee')) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <CompanyDashboard />
      </main>
    </div>
  );
};

export default CompanyPage;
