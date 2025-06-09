
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface CreateModuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onModuleCreated: () => void;
}

const CreateModuleDialog = ({ open, onOpenChange, onModuleCreated }: CreateModuleDialogProps) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_active: true,
  });
  const [creating, setCreating] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a module title.",
        variant: "destructive",
      });
      return;
    }

    if (!profile?.company_id) {
      toast({
        title: "Error",
        description: "No company associated with your account.",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    try {
      const { error } = await supabase
        .from('training_modules')
        .insert({
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          is_active: formData.is_active,
          company_id: profile.company_id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Training module created successfully.",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        is_active: true,
      });
      
      onOpenChange(false);
      onModuleCreated();
    } catch (error) {
      console.error('Error creating module:', error);
      toast({
        title: "Error",
        description: "Failed to create training module.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Training Module</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="module-title">Title</Label>
            <Input
              id="module-title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter module title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="module-description">Description (Optional)</Label>
            <Textarea
              id="module-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what this module covers"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="module-active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)}
            />
            <Label htmlFor="module-active">Active (visible to employees)</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={creating}>
              {creating ? 'Creating...' : 'Create Module'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModuleDialog;
