import GpuCard from "./GpuCard";
import React from "react";
export default function GpuRecommendations({
  recommendations,
  isLoading,
  pricingPreference,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-2">
          No recommendations yet
        </h3>
        <p className="text-gray-600">
          Fill out the form to get personalized GPU recommendations.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Recommended GPUs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((gpu) => (
          <GpuCard
            key={gpu.id}
            gpu={gpu}
            pricingPreference={pricingPreference}
          />
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Why these recommendations?
        </h3>
        <p className="text-blue-700 text-sm">
          These GPUs are recommended based on your workload requirements,
          dataset size, and budget constraints. The top recommendation offers
          the best balance of performance and cost for your specific needs.
        </p>
      </div>
    </div>
  );
}
