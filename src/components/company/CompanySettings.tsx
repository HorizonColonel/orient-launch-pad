
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Building2, Save, Upload } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  mission: string | null;
  created_at: string | null;
}

interface CompanySettingsProps {
  company: Company;
  onCompanyUpdate: () => void;
}

const CompanySettings = ({ company, onCompanyUpdate }: CompanySettingsProps) => {
  const [formData, setFormData] = useState({
    name: company.name,
    description: company.description || '',
    mission: company.mission || '',
    logo_url: company.logo_url || '',
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('companies')
        .update({
          name: formData.name,
          description: formData.description || null,
          mission: formData.mission || null,
          logo_url: formData.logo_url || null,
        })
        .eq('id', company.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company settings updated successfully.",
      });
      
      onCompanyUpdate();
    } catch (error) {
      console.error('Error updating company:', error);
      toast({
        title: "Error",
        description: "Failed to update company settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Company Settings</h2>
        <p className="text-muted-foreground">Manage your company profile and preferences</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Company Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-description">Description</Label>
              <Textarea
                id="company-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your company"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-mission">Mission Statement</Label>
              <Textarea
                id="company-mission"
                value={formData.mission}
                onChange={(e) => handleInputChange('mission', e.target.value)}
                placeholder="Your company's mission and values"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-logo">Logo URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="company-logo"
                  value={formData.logo_url}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
              {formData.logo_url && (
                <div className="mt-2">
                  <img 
                    src={formData.logo_url} 
                    alt="Company logo preview" 
                    className="w-16 h-16 object-cover rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Company ID</Label>
                <p className="font-mono text-xs">{company.id}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p>{company.created_at ? new Date(company.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySettings;
