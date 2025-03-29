
import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (image: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, className }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onImageUpload(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`image-upload-container ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="image-upload"
      />
      
      {previewUrl ? (
        <div className="relative w-full h-full">
          <img 
            src={previewUrl} 
            alt="Outfit preview" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
          >
            <X size={18} className="text-journal-800" />
          </button>
        </div>
      ) : (
        <label 
          htmlFor="image-upload"
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-journal-500 hover:text-journal-700 transition-colors"
        >
          <div className="flex flex-col items-center space-y-3 p-6">
            <ImageIcon size={40} />
            <p className="text-sm font-medium">Upload your outfit photo</p>
            <Button 
              variant="outline" 
              className="mt-2 flex items-center space-x-2"
              type="button"
            >
              <Upload size={16} />
              <span>Choose Image</span>
            </Button>
          </div>
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
