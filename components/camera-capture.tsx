"use client"

import type React from "react"
import Resizer from "react-image-file-resizer";
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload } from "lucide-react"
import Webcam from "react-webcam"
import { useMobile } from "@/hooks/use-mobile"

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [showCamera, setShowCamera] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMobile()

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        onCapture(imageSrc)
        setShowCamera(false)
      }
    }
  }, [webcamRef, onCapture])

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   // const image = await resizeFile(file);
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         onCapture(reader.result)
  //       }
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const resizedBase64 = await resizeFile(file)
  if (resizedBase64 && typeof resizedBase64 === "string") {
    onCapture(resizedBase64)
  }
}


  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {showCamera ? (
        <div className="space-y-4">
          <div className="aspect-video relative rounded-lg overflow-hidden border">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: isMobile ? "environment" : "user",
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowCamera(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={capture}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button onClick={() => setShowCamera(true)} className="bg-red-600 hover:bg-red-700">
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <div className="relative">
            <Button  variant="outline" onClick={handleUploadClick} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          </div>
        </div>
      )}
    </div>
  )
}

const resizeFile = (file: File | undefined) =>{
  if (!file) {
    return Promise.resolve(null)
}
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
}