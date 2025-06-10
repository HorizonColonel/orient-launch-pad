
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  BookOpen, 
  Users, 
  Calendar, 
  Settings, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit,
  UserPlus,
  Clock,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface TrainingModule {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  due_date?: string;
  estimated_duration?: number;
}

interface Employee {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
}

const TrainingManagementPanel = () => {
  const { profile, isCompanyAdmin } = useAuth();
  const { toast } = useToast();
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    is_active: true,
    due_date: '',
    estimated_duration: 0
  });

  React.useEffect(() => {
    if (isCompanyAdmin) {
      fetchTrainingModules();
      fetchEmployees();
    }
  }, [isCompanyAdmin, profile]);

  const fetchTrainingModules = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('training_modules')
        .select('*')
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error fetching training modules:', error);
      toast({
        title: "Error",
        description: "Failed to fetch training modules",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    if (!profile?.company_id) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, first_name, last_name, email')
        .eq('company_id', profile.company_id)
        .eq('role', 'employee');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const createModule = async () => {
    if (!profile?.company_id || !newModule.title.trim()) return;

    try {
      const { data, error } = await supabase
        .from('training_modules')
        .insert([{
          ...newModule,
          company_id: profile.company_id,
          estimated_duration: newModule.estimated_duration || null,
          due_date: newModule.due_date || null
        }])
        .select()
        .single();

      if (error) throw error;

      setModules(prev => [data, ...prev]);
      setNewModule({
        title: '',
        description: '',
        is_active: true,
        due_date: '',
        estimated_duration: 0
      });
      setShowCreateDialog(false);
      
      toast({
        title: "Success",
        description: "Training module created successfully"
      });
    } catch (error) {
      console.error('Error creating module:', error);
      toast({
        title: "Error",
        description: "Failed to create training module",
        variant: "destructive"
      });
    }
  };

  const toggleModuleVisibility = async (moduleId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('training_modules')
        .update({ is_active: !currentStatus })
        .eq('id', moduleId);

      if (error) throw error;

      setModules(prev => prev.map(module => 
        module.id === moduleId 
          ? { ...module, is_active: !currentStatus }
          : module
      ));

      toast({
        title: "Success",
        description: `Training module ${!currentStatus ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating module:', error);
      toast({
        title: "Error",
        description: "Failed to update training module",
        variant: "destructive"
      });
    }
  };

  const deleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this training module? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('training_modules')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;

      setModules(prev => prev.filter(module => module.id !== moduleId));
      
      toast({
        title: "Success",
        description: "Training module deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting module:', error);
      toast({
        title: "Error",
        description: "Failed to delete training module",
        variant: "destructive"
      });
    }
  };

  const assignToAllEmployees = async (moduleId: string) => {
    try {
      const assignments = employees.map(employee => ({
        employee_id: employee.id,
        module_id: moduleId,
        status: 'not_started' as const,
        progress_percentage: 0
      }));

      const { error } = await supabase
        .from('employee_progress')
        .upsert(assignments, { onConflict: 'employee_id,module_id' });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Training assigned to ${employees.length} employees`
      });
    } catch (error) {
      console.error('Error assigning training:', error);
      toast({
        title: "Error",
        description: "Failed to assign training to employees",
        variant: "destructive"
      });
    }
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (module.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && module.is_active) ||
                         (filterStatus === 'inactive' && !module.is_active);
    return matchesSearch && matchesFilter;
  });

  if (!isCompanyAdmin) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="mb-2">Access Denied</CardTitle>
          <p className="text-muted-foreground">
            Only company administrators can access training management features.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Training Management</h2>
          <p className="text-muted-foreground">
            Organize, assign, and monitor training modules for your team
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search training modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Module
          </Button>
        </div>
      </div>

      {/* Training Modules Grid */}
      <div className="grid gap-6">
        {filteredModules.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchTerm || filterStatus !== 'all' ? 'No matching modules found' : 'No Training Modules'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first training module.'}
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Module
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredModules.map((module) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>{module.title}</span>
                      </CardTitle>
                      <Badge variant={module.is_active ? "default" : "secondary"}>
                        {module.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {module.description && (
                      <p className="text-muted-foreground mt-2">{module.description}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Created: {new Date(module.created_at).toLocaleDateString()}
                      </div>
                      {module.due_date && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Due: {new Date(module.due_date).toLocaleDateString()}
                        </div>
                      )}
                      {module.estimated_duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Duration: {module.estimated_duration} min
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleModuleVisibility(module.id, module.is_active)}
                    >
                      {module.is_active ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      {module.is_active ? 'Hide' : 'Show'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedModule(module.id);
                        setShowAssignDialog(true);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteModule(module.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Module Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Training Module</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newModule.title}
                onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter module title"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newModule.description}
                onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter module description"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={newModule.due_date}
                onChange={(e) => setNewModule(prev => ({ ...prev, due_date: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="duration">Estimated Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newModule.estimated_duration}
                onChange={(e) => setNewModule(prev => ({ ...prev, estimated_duration: parseInt(e.target.value) || 0 }))}
                placeholder="e.g., 60"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newModule.is_active}
                onCheckedChange={(checked) => setNewModule(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="active">Active (visible to employees)</Label>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={createModule} disabled={!newModule.title.trim()}>
                Create Module
              </Button>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Training Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Training Module</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose how to assign this training module to employees.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => {
                  if (selectedModule) {
                    assignToAllEmployees(selectedModule);
                    setShowAssignDialog(false);
                  }
                }}
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-2" />
                Assign to All Employees ({employees.length})
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Select Specific Employees
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-2" />
                Assign by Department
              </Button>
            </div>
            
            <Button variant="outline" onClick={() => setShowAssignDialog(false)} className="w-full">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingManagementPanel;
