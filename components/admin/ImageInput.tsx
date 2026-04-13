// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { ImageIcon, X } from "lucide-react";
// import Image from "next/image";

// interface ImageInputProps {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   error?: string;
//   description?: string;
// }

// export function ImageInput({
//   label,
//   value,
//   onChange,
//   error,
//   description,
// }: ImageInputProps) {
//   const [imageError, setImageError] = useState(false);

//   return (
//     <div className="space-y-2">
//       <Label>{label}</Label>
//       <Input
//         value={value}
//         onChange={(e) => {
//           onChange(e.target.value);
//           setImageError(false);
//         }}
//         placeholder="https://example.com/image.jpg"
//       />
//       {description && (
//         <p className="text-sm text-muted-foreground">{description}</p>
//       )}
//       {error && <p className="text-sm text-destructive">{error}</p>}

//       {/* Image Preview */}
//       {value && !imageError && (
//         <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
//           <Image
//             src={value}
//             alt="Preview"
//             fill
//             className="object-cover"
//             onError={() => setImageError(true)}
//           />
//         </div>
//       )}

//       {imageError && value && (
//         <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
//           <ImageIcon className="w-5 h-5 text-destructive" />
//           <span className="text-sm text-destructive">Failed to load image</span>
//         </div>
//       )}
//     </div>
//   );
// }

// ============================================
// components/admin/ImageInput.tsx - With Cloudinary Upload
// ============================================

"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  description?: string;
}

export function ImageInput({
  label,
  value,
  onChange,
  error,
  description,
}: ImageInputProps) {
  const [imageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    try {
      setUploading(true);
      setImageError(false);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    setImageError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* URL Input (Optional) */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setImageError(false);
          }}
          placeholder="Or paste image URL..."
          disabled={uploading}
        />
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Upload Area */}
      {!value && (
        <div
          className={`border-2 border-dashed lg:w-64 rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-10 h-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag & drop an image here, or click to select
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
      )}

      {/* Image Preview */}
      {value && !imageError && (
        <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {imageError && value && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <ImageIcon className="w-5 h-5 text-destructive" />
          <span className="text-sm text-destructive">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
