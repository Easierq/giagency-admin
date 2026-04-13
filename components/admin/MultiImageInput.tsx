// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { X, Plus, ImageIcon } from "lucide-react";
// import Image from "next/image";

// interface MultiImageInputProps {
//   label: string;
//   value: string[];
//   onChange: (value: string[]) => void;
//   error?: string;
//   description?: string;
// }

// export function MultiImageInput({
//   label,
//   value,
//   onChange,
//   error,
//   description,
// }: MultiImageInputProps) {
//   const [inputValue, setInputValue] = useState("");

//   const handleAdd = () => {
//     if (inputValue.trim() && !value.includes(inputValue.trim())) {
//       onChange([...value, inputValue.trim()]);
//       setInputValue("");
//     }
//   };

//   const handleRemove = (index: number) => {
//     onChange(value.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="space-y-2">
//       <Label>{label}</Label>
//       <div className="flex gap-2">
//         <Input
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="https://example.com/image.jpg"
//           onKeyPress={(e) => {
//             if (e.key === "Enter") {
//               e.preventDefault();
//               handleAdd();
//             }
//           }}
//         />
//         <Button type="button" onClick={handleAdd} size="icon">
//           <Plus className="w-4 h-4" />
//         </Button>
//       </div>
//       {description && (
//         <p className="text-sm text-muted-foreground">{description}</p>
//       )}
//       {error && <p className="text-sm text-destructive">{error}</p>}

//       {/* Image Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//         {value.map((url, index) => (
//           <div key={index} className="relative group">
//             <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
//               <Image
//                 src={url}
//                 alt={`Image ${index + 1}`}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => handleRemove(index)}
//               className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ============================================
// components/admin/MultiImageInput.tsx - With Cloudinary Upload
// ============================================

"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface MultiImageInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  description?: string;
  maxImages?: number;
}

export function MultiImageInput({
  label,
  value,
  onChange,
  error,
  description,
  maxImages = 10,
}: MultiImageInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList) => {
    const remainingSlots = maxImages - value.length;
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    const imageFiles = filesToUpload.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      alert("Please select image files");
      return;
    }

    try {
      setUploading(true);

      const uploadPromises = imageFiles.map(async (file) => {
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
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      onChange([...value, ...uploadedUrls]);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload one or more images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
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

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleAddUrl = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      if (value.length >= maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const canAddMore = value.length < maxImages;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {/* URL Input (Optional) */}
      {canAddMore && (
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Or paste image URL..."
            disabled={uploading}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddUrl}
            disabled={uploading || !inputValue.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag & drop images here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                {value.length} / {maxImages} images uploaded
              </p>
            </div>
          )}
        </div>
      )}

      {/* Max Images Warning */}
      {!canAddMore && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          Maximum {maxImages} images reached. Remove an image to add more.
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                disabled={uploading}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No images uploaded yet
        </p>
      )}
    </div>
  );
}
