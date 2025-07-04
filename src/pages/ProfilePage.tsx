
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProfileContent from '@/components/profile/ProfileContent';
import PageTransition from '@/components/PageTransition';

const ProfilePage = () => {
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Vertical Tabs */}
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <ProfileContent />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
