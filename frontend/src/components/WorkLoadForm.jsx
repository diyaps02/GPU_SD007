"use client";
import React, { useState, useEffect } from "react";

export default function WorkloadForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    taskType: "ml_dl", // Set ML/DL as default task type
    // Common fields
    budget: {
      monthly: {
        min: "",
        max: "",
      },
      hourly: {
        min: "",
        max: "",
      },
    },
    workloadType: "training", // Default workload type
    pricing: "hourly", // Default pricing type
    region: "",
    operating_system: "windows",

    // Machine Learning specific fields
    dataset_size: "medium", // Set default value
    model_type: "CNN",
    training_time: "short",

    // Gaming specific fields
    graphics_quality: "medium",
    screen_resolution: "1080p",
    latency_sensitivity: false,

    // HPC specific fields
    task_complexity: "moderate",
    data_size: "medium",

    // Data Processing specific fields
    parallel_workload: "moderate",
  });

  // Available regions for selection
  const availableRegions = [
    { name: "Delhi", code: "ap-south-del-1" },
    { name: "Atlanta", code: "us-east-at-1" },
    { name: "Noida", code: "ap-south-noi-1" },
    { name: "Mumbai", code: "ap-south-mum-1" },
  ];

  // Handle task type change to set default values
  useEffect(() => {
    if (formData.taskType) {
      let defaultValues = {};

      // Set default values based on task type
      switch (formData.taskType) {
        case "ml_dl":
          defaultValues = {
            dataset_size: "medium",
            model_type: "CNN",
            training_time: "short",
          };
          break;
        case "gaming":
          defaultValues = {
            graphics_quality: "medium",
            screen_resolution: "1080p",
            latency_sensitivity: false,
          };
          break;
        case "hpc":
          defaultValues = {
            task_complexity: "moderate",
            data_size: "medium",
          };
          break;
        case "data_processing":
        case "rendering":
          defaultValues = {
            data_size: "medium",
            parallel_workload: "moderate",
          };
          break;
      }

      setFormData((prev) => ({
        ...prev,
        ...defaultValues,
      }));
    }
  }, [formData.taskType]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox inputs
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
      return;
    }

    // Handle budget field (only need max value for backend)
    if (name === "maxBudget") {
      const budgetType = formData.pricing;

      setFormData((prevData) => ({
        ...prevData,
        budget: {
          ...prevData.budget,
          [budgetType]: {
            ...prevData.budget[budgetType],
            max: value,
          },
        },
      }));
      return;
    }

    // Keep min budget for UI validation only, won't be sent to backend
    if (name === "minBudget") {
      const budgetType = formData.pricing;

      setFormData((prevData) => ({
        ...prevData,
        budget: {
          ...prevData.budget,
          [budgetType]: {
            ...prevData.budget[budgetType],
            min: value,
          },
        },
      }));
      return;
    }

    // Handle all other fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate budget
    const budgetType = formData.pricing;
    const minBudget = Number(formData.budget[budgetType].min);
    const maxBudget = Number(formData.budget[budgetType].max);

    if (minBudget <= 0 || maxBudget <= 0) {
      alert("Budget must be greater than zero");
      return;
    }

    if (minBudget > maxBudget) {
      alert("Minimum budget cannot be greater than maximum budget");
      return;
    }

    // Find the region code for the selected region
    const selectedRegion = availableRegions.find(
      (r) => r.name.toLowerCase() === formData.region.toLowerCase()
    );
    const regionCode = selectedRegion ? selectedRegion.code : formData.region;

    // Prepare data based on task type with flattened budget
    let submissionData = {
      use_case: getUseCase(formData.taskType),
      // Instead of nested budget object, directly use budgetType as key
      [budgetType]: maxBudget, // This is what you want: hourly: value or monthly: value
      region: regionCode,
      operating_system: formData.operating_system,
      workload_type: formData.workloadType,
    };

    // Add task-specific fields
    switch (formData.taskType) {
      case "ml_dl":
        submissionData = {
          ...submissionData,
          dataset_size: formData.dataset_size,
          model_type: formData.model_type,
          training_time: formData.training_time,
        };
        break;
      case "gaming":
        submissionData = {
          ...submissionData,
          graphics_quality: formData.graphics_quality,
          screen_resolution: formData.screen_resolution,
          latency_sensitivity: formData.latency_sensitivity,
        };
        break;
      case "hpc":
        submissionData = {
          ...submissionData,
          task_complexity: formData.task_complexity,
          data_size: formData.data_size,
        };
        break;
      case "data_processing":
      case "rendering":
        submissionData = {
          ...submissionData,
          data_size: formData.data_size,
          parallel_workload: formData.parallel_workload,
        };
        break;
    }

    onSubmit(submissionData);
  };

  // Helper function to map form task type to backend use case
  const getUseCase = (taskType) => {
    const mapping = {
      ml_dl: "machine_learning",
      gaming: "gaming",
      hpc: "high_performance_computing",
      data_processing: "data_processing",
      rendering: "rendering",
    };
    return mapping[taskType] || "";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Find Your Ideal GPU
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Task Type Selection - Always shown */}
          <div>
            <label
              htmlFor="taskType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Type <span className="text-red-500">*</span>
            </label>
            <select
              id="taskType"
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ml_dl">Machine Learning and Deep Learning</option>
              <option value="gaming">Gaming</option>
              <option value="hpc">High-Performance Computing (HPC)</option>
              <option value="data_processing">
                Data Processing and Analytics
              </option>
              <option value="rendering">Rendering and Video Processing</option>
            </select>
          </div>

          {/* Machine Learning Specific Fields - Always shown by default */}
          {formData.taskType === "ml_dl" && (
            <>
              <div>
                <label
                  htmlFor="dataset_size"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Dataset Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="dataset_size"
                  name="dataset_size"
                  value={formData.dataset_size}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="model_type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Model Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="model_type"
                  name="model_type"
                  value={formData.model_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="CNN">CNN</option>
                  <option value="RNN">RNN</option>
                  <option value="DNN">DNN</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="training_time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Training Time <span className="text-red-500">*</span>
                </label>
                <select
                  id="training_time"
                  name="training_time"
                  value={formData.training_time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="short">Short</option>
                  <option value="long">Long</option>
                </select>
              </div>
            </>
          )}

          {/* Gaming Specific Fields */}
          {formData.taskType === "gaming" && (
            <>
              <div>
                <label
                  htmlFor="graphics_quality"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Graphics Quality <span className="text-red-500">*</span>
                </label>
                <select
                  id="graphics_quality"
                  name="graphics_quality"
                  value={formData.graphics_quality}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="screen_resolution"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Screen Resolution <span className="text-red-500">*</span>
                </label>
                <select
                  id="screen_resolution"
                  name="screen_resolution"
                  value={formData.screen_resolution}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1080p">1080p</option>
                  <option value="1440p">1440p</option>
                  <option value="4K">4K</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  id="latency_sensitivity"
                  name="latency_sensitivity"
                  type="checkbox"
                  checked={formData.latency_sensitivity}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="latency_sensitivity"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Latency Sensitive (e.g., competitive gaming)
                </label>
              </div>
            </>
          )}

          {/* HPC Specific Fields */}
          {formData.taskType === "hpc" && (
            <>
              <div>
                <label
                  htmlFor="task_complexity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Complexity <span className="text-red-500">*</span>
                </label>
                <select
                  id="task_complexity"
                  name="task_complexity"
                  value={formData.task_complexity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="simple">Simple</option>
                  <option value="moderate">Moderate</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="data_size"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Data Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="data_size"
                  name="data_size"
                  value={formData.data_size}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </>
          )}

          {/* Data Processing & Rendering Fields */}
          {(formData.taskType === "data_processing" ||
            formData.taskType === "rendering") && (
            <>
              <div>
                <label
                  htmlFor="data_size"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Data Size <span className="text-red-500">*</span>
                </label>
                <select
                  id="data_size"
                  name="data_size"
                  value={formData.data_size}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="parallel_workload"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Parallel Workload <span className="text-red-500">*</span>
                </label>
                <select
                  id="parallel_workload"
                  name="parallel_workload"
                  value={formData.parallel_workload}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
            </>
          )}

          {/* Workload Type Selection - Common for all task types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workload Type <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="training"
                  name="workloadType"
                  type="radio"
                  value="training"
                  checked={formData.workloadType === "training"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="training"
                  className="ml-2 text-sm text-gray-700"
                >
                  Training
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inference"
                  name="workloadType"
                  type="radio"
                  value="inference"
                  checked={formData.workloadType === "inference"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label
                  htmlFor="inference"
                  className="ml-2 text-sm text-gray-700"
                >
                  Inference
                </label>
              </div>
            </div>
          </div>

          {/* Budget fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (USD) <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  type="number"
                  id="minBudget"
                  name="minBudget"
                  value={formData.budget[formData.pricing].min}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Minimum"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  id="maxBudget"
                  name="maxBudget"
                  value={formData.budget[formData.pricing].max}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Maximum"
                />
              </div>
            </div>
          </div>

          {/* Pricing options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pricing <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  id="hourly"
                  name="pricing"
                  type="radio"
                  value="hourly"
                  checked={formData.pricing === "hourly"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="hourly" className="ml-2 text-sm text-gray-700">
                  Per Hour
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="monthly"
                  name="pricing"
                  type="radio"
                  value="monthly"
                  checked={formData.pricing === "monthly"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="monthly" className="ml-2 text-sm text-gray-700">
                  Monthly
                </label>
              </div>
            </div>
          </div>

          {/* Region selection */}
          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Region <span className="text-red-500">*</span>
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a region
              </option>
              {availableRegions.map((region) => (
                <option key={region.code} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Operating System */}
          <div>
            <label
              htmlFor="operating_system"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Operating System <span className="text-red-500">*</span>
            </label>
            <select
              id="operating_system"
              name="operating_system"
              value={formData.operating_system}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="windows">Windows</option>
              <option value="linux">Linux</option>
              <option value="macos">macOS</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Find Recommendations
          </button>
        </div>
      </form>
    </div>
  );
}
