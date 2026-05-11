import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  label: string;
  value: string | null;
  onChange: (base64: string | null) => void;
}

export function ImageUpload({ label, value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {value ? (
        <div className="relative w-32 h-32 border border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center group">
          <img src={value} alt="Uploaded logo" className="max-w-full max-h-full object-contain p-2" />
          <button 
            type="button"
            onClick={handleClear}
            className="absolute top-1 right-1 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-red-500 hover:border-red-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#5a32fa] hover:text-[#5a32fa] cursor-pointer transition-colors"
        >
          <Upload className="w-6 h-6 mb-2" />
          <span className="text-xs font-medium text-center px-2">Click to upload<br/>(PNG/JPG)</span>
        </div>
      )}
      <input 
        type="file" 
        accept="image/png, image/jpeg" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
