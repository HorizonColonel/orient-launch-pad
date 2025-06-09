
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

const ProfileSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resetLoading, setResetLoading] = useState(false);

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

  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account ID:</span>
              <span className="font-mono">{user?.id}</span>
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
