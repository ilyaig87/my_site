'use client';

import { useState } from 'react';
import { Template } from '@/types';

interface TemplatePreviewProps {
  template: Template;
  showDeviceToggle?: boolean;
  className?: string;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export default function TemplatePreview({
  template,
  showDeviceToggle = true,
  className = ''
}: TemplatePreviewProps) {
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [isLoading, setIsLoading] = useState(true);

  const deviceSizes = {
    desktop: { width: '100%', height: '600px', label: 'שולחני' },
    tablet: { width: '768px', height: '600px', label: 'טאבלט' },
    mobile: { width: '375px', height: '667px', label: 'נייד' },
  };

  const previewUrl = `/templates/${template.slug}/preview`;

  return (
    <div className={`relative ${className}`}>
      {/* Device Toggle */}
      {showDeviceToggle && (
        <div className="flex justify-center gap-2 mb-4">
          {(Object.keys(deviceSizes) as DeviceType[]).map((deviceType) => (
            <button
              key={deviceType}
              onClick={() => setDevice(deviceType)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                device === deviceType
                  ? 'glass-card text-white shadow-lg'
                  : 'glass bg-white/20 text-gray-200 hover:bg-white/30'
              }`}
            >
              {deviceSizes[deviceType].label}
            </button>
          ))}
        </div>
      )}

      {/* Preview Container */}
      <div
        className="relative mx-auto transition-all duration-300 ease-in-out glass-card overflow-hidden"
        style={{
          width: deviceSizes[device].width,
          maxWidth: '100%',
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-10"
            style={{ height: deviceSizes[device].height }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">טוען תצוגה מקדימה...</p>
            </div>
          </div>
        )}

        {/* Preview iframe */}
        <iframe
          src={previewUrl}
          className="w-full border-0 bg-white"
          style={{ height: deviceSizes[device].height }}
          title={`תצוגה מקדימה - ${template.name}`}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* Preview Overlay - קליק מוביל לעמוד הטמפלייט */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-white text-center text-sm">
            לחץ לצפייה במלואה
          </p>
        </div>
      </div>

      {/* Info Badge */}
      <div className="mt-4 text-center">
        <span className="inline-block glass-card px-4 py-2 text-sm text-white">
          תצוגה מקדימה אינטראקטיבית - ניתן לגלול בתוך החלון
        </span>
      </div>
    </div>
  );
}
