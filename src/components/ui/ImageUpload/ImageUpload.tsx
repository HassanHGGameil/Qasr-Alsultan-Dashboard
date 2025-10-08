"use client";

import { useEffect, useState } from "react";
import { Button } from "../button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemove = async (url: string) => {
    const parts = url.split("/upload/");
    const publicId = parts[1]?.split(".")[0] ?? "";

    try {
      await fetch("/api/delete-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      onRemove(url);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center flex-wrap gap-4">
        {value.map((url) => (
          <div
            className={`relative w-[200px] h-[200px] rounded-md overflow-hidden ${className}`}
            key={url}
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                variant="destructive"
                size="icon"
                className="bg-red-600 text-white hover:bg-red-800"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="d4aeanaa"
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange((result.info as any).secure_url);
          }
        }}
        onError={(error) => console.error("Upload failed:", error)}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={() => open()}
              className="bg-slate-600 text-white hover:bg-slate-500"
            >
              <ImagePlusIcon className="h-4 w-4 mr-1 text-sm" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
