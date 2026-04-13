// ============================================
// components/admin/VideoInput.tsx - With Cloudinary Upload
// ============================================

"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Video, Upload, X, Loader2, Play } from "lucide-react";

interface VideoInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  description?: string;
}

export function VideoInput({
  label,
  value,
  onChange,
  error,
  description,
}: VideoInputProps) {
  const [videoError, setVideoError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    // Check if it's a video file
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }

    // Check file size (max 100MB for Cloudinary free tier)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      alert("Video file is too large. Maximum size is 100MB.");
      return;
    }

    try {
      setUploading(true);
      setVideoError(false);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );
      formData.append("resource_type", "video"); // Important for video uploads

      // Simulated progress (Cloudinary doesn't provide real-time progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.secure_url);

      setTimeout(() => setUploadProgress(0), 1000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload video. Please try again.");
      setUploadProgress(0);
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
    setVideoError(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Check if URL is a video URL (YouTube, Vimeo, direct)
  const isVideoUrl = (url: string) => {
    return (
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("vimeo.com") ||
      url.match(/\.(mp4|webm|ogg)$/i)
    );
  };

  // Get video type for display
  const getVideoType = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be"))
      return "YouTube";
    if (url.includes("vimeo.com")) return "Vimeo";
    if (url.includes("cloudinary.com")) return "Cloudinary";
    if (url.match(/\.(mp4|webm|ogg)$/i)) return "Direct Video";
    return "Video";
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
            setVideoError(false);
          }}
          placeholder="Or paste video URL (YouTube, Vimeo, etc.)..."
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
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-sm text-gray-600">Uploading video...</p>
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
              <p className="text-xs text-gray-500">{uploadProgress}%</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-10 h-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag & drop a video here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                MP4, WebM, OGG up to 100MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Video Preview */}
      {value && !videoError && (
        <div className="space-y-2">
          {/* Video Type Badge */}
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {getVideoType(value)}
            </span>
            {isVideoUrl(value) && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                ✓ Valid video URL
              </span>
            )}
          </div>

          {/* Video Player Preview */}
          {value.includes("cloudinary.com") && (
            <div className="relative w-full max-w-md bg-gray-100 rounded-lg overflow-hidden">
              <video
                src={value}
                controls
                className="w-full"
                onError={() => setVideoError(true)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* YouTube Preview */}
          {(value.includes("youtube.com") || value.includes("youtu.be")) && (
            <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Play className="w-12 h-12 text-white" />
              </div>
              <p className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                YouTube Video
              </p>
            </div>
          )}

          {/* Vimeo Preview */}
          {value.includes("vimeo.com") && (
            <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Play className="w-12 h-12 text-white" />
              </div>
              <p className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                Vimeo Video
              </p>
            </div>
          )}

          {/* Direct Video URL */}
          {value.match(/\.(mp4|webm|ogg)$/i) &&
            !value.includes("cloudinary.com") && (
              <div className="relative w-full max-w-md bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={value}
                  controls
                  className="w-full"
                  onError={() => setVideoError(true)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

          {/* Remove Button */}
          {!uploading && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemove}
              className="w-full max-w-md"
            >
              <X className="w-4 h-4 mr-2" />
              Remove Video
            </Button>
          )}
        </div>
      )}

      {videoError && value && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md">
          <Video className="w-5 h-5 text-destructive" />
          <span className="text-sm text-destructive">Failed to load video</span>
        </div>
      )}

      {/* Upload Tips */}
      {!value && !uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 max-w-md">
          <p className="font-semibold mb-2">💡 Video Upload Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Upload your own video files (MP4, WebM, OGG)</li>
            <li>Or paste YouTube/Vimeo URLs</li>
            <li>Max file size: 100MB (Cloudinary free tier)</li>
            <li>Larger videos may take a few minutes to upload</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================
// USAGE IN PORTFOLIO FORM
// ============================================
// Update the Media Section in PortfolioForm.tsx:

/*
<div className="bg-white rounded-lg border p-6 space-y-6">
  <h2 className="text-2xl font-bold">Media</h2>

  <FormField
    control={form.control}
    name="image"
    render={({ field }) => (
      <FormItem>
        <ImageInput
          label="Main Image *"
          value={field.value}
          onChange={field.onChange}
          error={form.formState.errors.image?.message}
          description="Primary project thumbnail (required)"
        />
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="images"
    render={({ field }) => (
      <FormItem>
        <MultiImageInput
          label="Additional Images"
          value={field.value || []}
          onChange={field.onChange}
          error={form.formState.errors.images?.message}
          description="Optional gallery images"
        />
        <FormMessage />
      </FormItem>
    )}
  />

  <FormField
    control={form.control}
    name="videoUrl"
    render={({ field }) => (
      <FormItem>
        <VideoInput
          label="Project Video"
          value={field.value || ""}
          onChange={field.onChange}
          error={form.formState.errors.videoUrl?.message}
          description="Upload a video or paste YouTube/Vimeo URL"
        />
        <FormMessage />
      </FormItem>
    )}
  />
</div>
*/

// ============================================
// EXAMPLE: Updated Portfolio Form Import
// ============================================
/*
import { VideoInput } from "@/components/admin/VideoInput";

// Then use it in the form as shown above
*/
