"use client";
import React, { useState, useEffect } from "react";
import GpuCard from "./GpuCard";
import Pagination from "./Pagination";
import { usePagination } from "./PaginationContext";

export default function GpuRecommendations({
  recommendations,
  isLoading,
  pricingPreference,
  searchCriteria,
}) {
  const { currentPage, itemsPerPage } = usePagination();
  const [scoredRecommendations, setScoredRecommendations] = useState([]);
  const [showScoringDetails, setShowScoringDetails] = useState(false);
  const [noExactMatch, setNoExactMatch] = useState(false);
  const [paginatedGpus, setPaginatedGpus] = useState([]);

  // Calculate scores for each GPU based on criteria
  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      // Flag to check if we have any good matches
      let hasGoodMatches = false;

      const scored = recommendations.map((gpu) => {
        // Initialize score
        let totalScore = 0;
        const scoring = {
          modelType: 0,
          datasetSize: 0,
          workloadType: 0,
          budgetFit: 0,
          regionMatch: 0,
        };

        // Extract VRAM if available in description
        let vramSize = 0;
        if (gpu.gpu_description) {
          // Try to extract numbers from the description that might represent VRAM
          const vramMatch = gpu.gpu_description.match(/(\d+)GB/i);
          if (vramMatch) {
            vramSize = Number.parseInt(vramMatch[1], 10);
          }
        }

        // Model Type score (weight +3)
        // For GPT/BERT models prioritize higher VRAM
        if (
          searchCriteria?.model_type &&
          ["GPT", "BERT", "LLM", "transformer", "DNN"].some((model) =>
            searchCriteria.model_type.includes(model)
          )
        ) {
          // Higher score for higher VRAM GPUs
          if (vramSize >= 80) scoring.modelType = 3;
          else if (vramSize >= 40) scoring.modelType = 2;
          else if (vramSize >= 24) scoring.modelType = 1;
          else if (gpu.is_gpu) scoring.modelType = 0.5; // At least it's a GPU
        } else if (gpu.is_gpu) {
          // For other model types, still prefer GPUs but VRAM is less critical
          scoring.modelType = 1;
        }

        // Dataset Size score (weight +2)
        // Larger datasets need more VRAM
        if (searchCriteria?.dataset_size === "large" && vramSize >= 40) {
          scoring.datasetSize = 2;
        } else if (
          searchCriteria?.dataset_size === "medium" &&
          vramSize >= 16
        ) {
          scoring.datasetSize = 2;
        } else if (searchCriteria?.dataset_size === "small" && gpu.is_gpu) {
          scoring.datasetSize = 2; // Even smaller GPUs are fine for small datasets
        } else if (gpu.is_gpu) {
          scoring.datasetSize = 1; // At least it's a GPU
        }

        // Workload Type score (weight +2)
        // Training → high VRAM & vCPUs, Inference → optimize for cost & latency
        if (searchCriteria?.workload_type === "training") {
          if (gpu.is_gpu && gpu.vcpus >= 16 && vramSize >= 24) {
            scoring.workloadType = 2; // High vCPUs and VRAM for training
          } else if (gpu.is_gpu && (gpu.vcpus >= 8 || vramSize >= 16)) {
            scoring.workloadType = 1; // Modest specs for training
          }
        } else if (searchCriteria?.workload_type === "inference") {
          // For inference, cost is more important than raw power
          if (gpu.is_gpu && gpu.price_per_hour < 10000) {
            // 100 dollars in cents
            scoring.workloadType = 2; // Cost-effective option
          } else if (gpu.is_gpu) {
            scoring.workloadType = 1; // At least it's a GPU
          }
        }

        // Budget Fit score (weight +2)
        // Check if we have a budget in the criteria
        if (searchCriteria?.budget) {
          const budgetType = Object.keys(searchCriteria.budget)[0]; // 'hourly' or 'monthly'

          // Get appropriate price field based on budget type
          const priceField =
            budgetType === "hourly" ? "price_per_hour" : "price_per_month";
          const minBudget = searchCriteria.budget[budgetType]?.min || 0;
          const maxBudget =
            searchCriteria.budget[budgetType]?.max || Number.POSITIVE_INFINITY;

          // Convert backend prices (they're in cents or INR)
          const price = gpu[priceField] / 100;

          if (price >= minBudget && price <= maxBudget) {
            scoring.budgetFit = 2; // Perfect budget fit
          } else if (price < minBudget * 0.8 || price > maxBudget * 1.2) {
            scoring.budgetFit = 0; // Way outside budget
          } else {
            scoring.budgetFit = 1; // Close to budget
          }
        }

        // Region Match score (weight +1)
        if (searchCriteria?.region && gpu.region) {
          if (
            gpu.region
              .toLowerCase()
              .includes(searchCriteria.region.toLowerCase())
          ) {
            scoring.regionMatch = 1; // Region match
          }
        }

        // Calculate total score
        totalScore =
          scoring.modelType +
          scoring.datasetSize +
          scoring.workloadType +
          scoring.budgetFit +
          scoring.regionMatch;

        // If total score is good, we have some good matches
        if (totalScore >= 6) {
          hasGoodMatches = true;
        }

        return {
          ...gpu,
          score: totalScore,
          scoring,
        };
      });

      // Sort by score (highest first)
      scored.sort((a, b) => b.score - a.score);

      // Set flag if we don't have good matches
      setNoExactMatch(!hasGoodMatches);

      setScoredRecommendations(scored);
    } else {
      setScoredRecommendations([]);
    }
  }, [recommendations, searchCriteria]);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedGpus(scoredRecommendations.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, scoredRecommendations]);

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
        {noExactMatch ? "Similar GPUs You Might Consider" : "Recommended GPUs"}
      </h2>

      {noExactMatch && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">
            <span className="font-medium">
              No exact match found for your criteria.
            </span>{" "}
            We're showing similar options below that might work for your use
            case.
          </p>
        </div>
      )}

      {/* Scoring explanation section */}
      <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-blue-800">
            GPU Recommendations Scoring System
          </h3>
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => setShowScoringDetails(!showScoringDetails)}
          >
            {showScoringDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showScoringDetails && (
          <div className="mt-3 border-t border-blue-200 pt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-blue-700">
                  <th className="pb-2">Criteria</th>
                  <th className="pb-2">Heuristic Logic</th>
                  <th className="pb-2">Score Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 text-blue-800">Model Type</td>
                  <td className="py-1 text-blue-700">
                    GPT/BERT need more VRAM → prefer GPUs with higher memory
                  </td>
                  <td className="py-1 text-blue-800 font-medium">+3</td>
                </tr>
                <tr>
                  <td className="py-1 text-blue-800">Dataset Size</td>
                  <td className="py-1 text-blue-700">
                    &gt;50 GB? Prefer GPUs with more VRAM (40GB+)
                  </td>
                  <td className="py-1 text-blue-800 font-medium">+2</td>
                </tr>
                <tr>
                  <td className="py-1 text-blue-800">Workload Type</td>
                  <td className="py-1 text-blue-700">
                    Training → high VRAM & vCPUs. Inference → optimize for cost
                    & latency
                  </td>
                  <td className="py-1 text-blue-800 font-medium">+2</td>
                </tr>
                <tr>
                  <td className="py-1 text-blue-800">Budget Fit</td>
                  <td className="py-1 text-blue-700">
                    Closer to budget limit but not exceeding it
                  </td>
                  <td className="py-1 text-blue-800 font-medium">+2</td>
                </tr>
                <tr>
                  <td className="py-1 text-blue-800">Region Match</td>
                  <td className="py-1 text-blue-700">
                    Exact region match preferred
                  </td>
                  <td className="py-1 text-blue-800 font-medium">+1</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedGpus.map((gpu, index) => (
          <div key={index} className="relative">
            {/* Score badge */}
            <div className="absolute -top-3 -right-3 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 border-2 border-white shadow-md">
              {gpu.score}
            </div>
            <GpuCard gpu={gpu} pricingPreference={pricingPreference} />
          </div>
        ))}
      </div>

      <Pagination totalItems={scoredRecommendations.length} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Why these recommendations?
        </h3>
        <p className="text-blue-700 text-sm">
          These GPUs are recommended based on your workload requirements,
          dataset size, and budget constraints. We've scored each GPU using the
          criteria shown above, with the highest scoring options at the top. The
          top recommendation offers the best balance of performance and cost for
          your specific needs.
        </p>
      </div>
    </div>
  );
}
