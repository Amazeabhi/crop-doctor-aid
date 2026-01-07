import { useState, useRef, useCallback } from 'react';
import { Camera, X, RotateCcw, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      setError('Unable to access camera. Please allow camera permissions or upload an image.');
      console.error('Camera error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  }, [stopCamera]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/90 flex flex-col animate-fade-in">
      <div className="flex items-center justify-between p-4 bg-card/95 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-foreground">Capture Plant Image</h2>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {!capturedImage ? (
          <>
            {!stream && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary" />
                </div>
                {error && (
                  <p className="text-destructive text-sm max-w-xs">{error}</p>
                )}
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Button variant="hero" size="lg" onClick={startCamera}>
                    <Camera className="mr-2" />
                    Open Camera
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2" />
                    Upload Image
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${stream ? 'block' : 'hidden'}`}
            />
            {stream && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full bg-primary-foreground border-4 border-primary shadow-large flex items-center justify-center hover:scale-105 transition-transform active:scale-95"
                >
                  <div className="w-16 h-16 rounded-full bg-primary" />
                </button>
              </div>
            )}
          </>
        ) : (
          <img
            src={capturedImage}
            alt="Captured plant"
            className="w-full h-full object-contain bg-foreground"
          />
        )}
      </div>

      {capturedImage && (
        <div className="p-4 bg-card/95 backdrop-blur-sm flex gap-3">
          <Button variant="outline" size="lg" className="flex-1" onClick={retake}>
            <RotateCcw className="mr-2" />
            Retake
          </Button>
          <Button variant="hero" size="lg" className="flex-1" onClick={confirmCapture}>
            <Check className="mr-2" />
            Use Photo
          </Button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
