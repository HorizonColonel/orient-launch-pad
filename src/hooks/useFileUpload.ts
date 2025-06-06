
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Database } from '@/integrations/supabase/types';

type MaterialType = Database['public']['Enums']['material_type'];

interface UploadResult {
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { profile } = useAuth();

  const uploadFile = async (
    file: File,
    moduleId: string,
    materialType: MaterialType
  ): Promise<{ data: UploadResult | null; error: string | null }> => {
    try {
      if (!profile?.company_id) {
        throw new Error('No company associated with user');
      }

      setUploading(true);
      setUploadProgress(0);

      // Create file path: company_id/module_id/filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${profile.company_id}/${moduleId}/${fileName}`;

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('training-materials')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('training-materials')
        .getPublicUrl(uploadData.path);

      // Save file metadata to database
      const { data: materialData, error: materialError } = await supabase
        .from('training_materials')
        .insert({
          module_id: moduleId,
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          type: materialType,
        })
        .select()
        .single();

      if (materialError) throw materialError;

      setUploadProgress(100);
      
      return {
        data: {
          fileUrl: urlData.publicUrl,
          fileName: file.name,
          fileSize: file.size,
        },
        error: null,
      };
    } catch (err: any) {
      console.error('Error uploading file:', err);
      return {
        data: null,
        error: err.message,
      };
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const deleteFile = async (materialId: string, filePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('training-materials')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('training_materials')
        .delete()
        .eq('id', materialId);

      if (dbError) throw dbError;

      return { error: null };
    } catch (err: any) {
      console.error('Error deleting file:', err);
      return { error: err.message };
    }
  };

  return {
    uploading,
    uploadProgress,
    uploadFile,
    deleteFile,
  };
};
