
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import MyTrainingDashboard from '@/components/training/MyTrainingDashboard';
import PageTransition from '@/components/PageTransition';

const MyTrainingPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </PageTransition>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <MyTrainingDashboard />
      </main>
    </PageTransition>
  );
};

export default MyTrainingPage;
