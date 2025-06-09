
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Lock, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileSettings = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [resetLoading, setResetLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  const handleProfilePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${profile.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('training-materials')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading photo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getInitials = () => {
    const first = profile?.first_name?.[0] || '';
    const last = profile?.last_name?.[0] || '';
    return (first + last).toUpperCase() || profile?.email?.[0]?.toUpperCase() || 'U';
  };

  const isCompanyAdmin = profile?.role === 'company_admin';

  return (
    <div className="space-y-6">
      {/* Profile Photo Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Profile Photo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt={profile?.first_name || 'User'} />
              <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">
                Upload a new profile photo. Recommended size: 400x400px.
              </p>
              <label className="cursor-pointer">
                <Button variant="outline" disabled={uploading} asChild>
                  <span>
                    {uploading ? 'Uploading...' : 'Choose Photo'}
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePhotoUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Security Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Current Email</Label>
              <Input 
                value={user?.email || ''} 
                disabled 
                className="bg-muted"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Email cannot be changed. Contact your administrator if needed.
              </p>
            </div>

            <div className="border-t pt-4">
              <Label className="text-base font-medium">Password</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Reset your password by receiving a secure link via email.
              </p>
              <Button 
                onClick={handlePasswordReset} 
                disabled={resetLoading}
                variant="outline"
              >
                {resetLoading ? 'Sending...' : 'Send Password Reset Email'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Admin Settings - Only shown for company admins */}
      {isCompanyAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Company Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Company ID:</span>
                <span className="font-mono">{profile?.company_id || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Admin Role:</span>
                <span className="capitalize text-primary font-medium">
                  {profile?.role?.replace('_', ' ')}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-4">
                As a company admin, you have access to employee management and company-wide settings.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account ID:</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Sign In:</span>
              <span>
                {user?.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : 'Never'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Confirmed:</span>
              <span className={user?.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}>
                {user?.email_confirmed_at ? 'Yes' : 'Pending'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
