
import React from "react";

export function DevelopingExpertiseCircle() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="aspect-square rounded-full bg-gradient-to-b from-growthy-green-400 to-growthy-green-600 flex items-center justify-center relative">
        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium text-growthy-green-500">Developing Expertise</h3>
          </div>
        </div>
        
        {/* Top position */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white border border-growthy-green-200 p-3 rounded-lg shadow-sm text-center w-44">
          <div className="mx-auto mb-2 bg-growthy-green-100 h-8 w-8 rounded-full flex items-center justify-center">
            <div className="text-growthy-green-500">👨‍💻</div>
          </div>
          <p className="text-sm">Going deep in an Area</p>
        </div>
        
        {/* Right position */}
        <div className="absolute top-1/2 -right-28 -translate-y-1/2 bg-white border border-growthy-green-200 p-3 rounded-lg shadow-sm text-center w-44">
          <div className="mx-auto mb-2 bg-growthy-green-100 h-8 w-8 rounded-full flex items-center justify-center">
            <div className="text-growthy-green-500">🌐</div>
          </div>
          <p className="text-sm">Share it with the World & Get Feedback</p>
        </div>
        
        {/* Left position */}
        <div className="absolute top-1/2 -left-28 -translate-y-1/2 bg-white border border-growthy-green-200 p-3 rounded-lg shadow-sm text-center w-44">
          <div className="mx-auto mb-2 bg-growthy-green-100 h-8 w-8 rounded-full flex items-center justify-center">
            <div className="text-growthy-green-500">✍️</div>
          </div>
          <p className="text-sm">Write about your Understanding</p>
        </div>
      </div>
    </div>
  );
}
