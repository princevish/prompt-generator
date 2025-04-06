import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  onImageSelected: (imageData: string) => void;
  className?: string;
}

export function ImagePicker({ onImageSelected, className }: ImagePickerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    // In a real React Native app, this would open the camera
    // For web, we'll just open the file picker
    fileInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Selected"
            className="w-full h-64 object-contain rounded-lg border border-border"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <div className="mx-auto flex flex-col items-center justify-center space-y-4">
            <div className="text-muted-foreground">
              <p className="mb-2">Select an image to generate a prompt</p>
              <p className="text-sm">JPG, PNG, GIF up to 5MB</p>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleCameraClick} variant="outline">
                <Camera className="mr-2 h-4 w-4" />
                Camera
              </Button>
              <Button onClick={handleGalleryClick}>
                <Upload className="mr-2 h-4 w-4" />
                Gallery
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}