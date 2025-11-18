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
  return (
    <div className={`relative ${className} flex justify-center items-center`}>
      {/* תצוגה מקדימה מעוצבת */}
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-md">
              <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
            {template.name}
          </h3>
          <p className="text-center text-gray-600 mb-6 leading-relaxed">
            {template.description}
          </p>

          {/* Color Preview */}
          <div className="flex justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
              style={{ backgroundColor: template.colors.primary }}
              title="צבע ראשי"
            ></div>
            <div
              className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
              style={{ backgroundColor: template.colors.secondary }}
              title="צבע משני"
            ></div>
            <div
              className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
              style={{ backgroundColor: template.colors.accent }}
              title="צבע הדגשה"
            ></div>
          </div>

          {/* Badge */}
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-full text-sm font-semibold">
              צפה בתצוגה המלאה למטה ⬇
            </span>
          </div>
        </div>
      </div>

      {/* תצוגה מקדימה מושבתת זמנית - קוד ישן */}
      {/* Device Toggle */}
      {/* {showDeviceToggle && (
        <div className="flex justify-center gap-2 mb-4">
          {(Object.keys(deviceSizes) as DeviceType[]).map((deviceType) => (
            <button
              key={deviceType}
              onClick={() => setDevice(deviceType)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                device === deviceType
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'glass bg-white/60 text-gray-700 hover:bg-white/80'
              }`}
            >
              {deviceSizes[deviceType].label}
            </button>
          ))}
        </div>
      )} */}

      {/* Preview Container */}
      {/* <div
        className="relative mx-auto transition-all duration-300 ease-in-out glass-card overflow-hidden"
        style={{
          width: deviceSizes[device].width,
          maxWidth: '100%',
        }}
      > */}
        {/* Loading State */}
        {/* {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-10"
            style={{ height: deviceSizes[device].height }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">טוען תצוגה מקדימה...</p>
            </div>
          </div>
        )} */}

        {/* Preview iframe */}
        {/* <iframe
          src={previewUrl}
          className="w-full border-0 bg-white"
          style={{ height: deviceSizes[device].height }}
          title={`תצוגה מקדימה - ${template.name}`}
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin"
        /> */}

        {/* Preview Overlay - קליק מוביל לעמוד הטמפלייט */}
        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-white text-center text-sm">
            לחץ לצפייה במלואה
          </p>
        </div>
      </div> */}

      {/* Info Badge */}
      {/* <div className="mt-4 text-center">
        <span className="inline-block glass-card px-4 py-2 text-sm text-gray-900">
          תצוגה מקדימה אינטראקטיבית - ניתן לגלול בתוך החלון
        </span>
      </div> */}
    </div>
  );
}
