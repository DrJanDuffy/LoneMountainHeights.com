import React from 'react';

interface WidgetLoaderProps {
  title: string;
}

export const WidgetLoader: React.FC<WidgetLoaderProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] bg-gray-50 rounded-xl p-6">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );
}; 