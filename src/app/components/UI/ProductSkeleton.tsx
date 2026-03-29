import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white border-2 border-gray-100 rounded-lg overflow-hidden h-full">
      {/* Image Block Skeleton */}
      <div className="aspect-square bg-gray-100 animate-pulse border-b-2 border-gray-100" />
      
      {/* Details skeleton */}
      <div className="p-3 flex flex-col grow justify-between">
        <div>
          <div className="h-2 w-16 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded mb-1" />
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-2" />
          <div className="h-2 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex gap-2 items-end">
            <div className="h-6 w-16 bg-gray-300 animate-pulse rounded" />
            <div className="h-3 w-8 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="h-10 w-full bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
