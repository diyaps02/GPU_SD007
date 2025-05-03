import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    taskType: "",
    datasetSize: "",
    operationType: "training",
    minBudget: "",
    maxBudget: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that min budget is less than max budget
    if (Number(formData.minBudget) > Number(formData.maxBudget)) {
      alert("Minimum budget cannot be greater than maximum budget");
      return;
    }

    try {
      // API call to backend would go here

      const data = await response.json();
      console.log("Success:", data);
      // Handle success - maybe show a success message or redirect
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error - show error message
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        GPU Requirements
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI/ML Task Type */}
        <div className="space-y-2">
          <label
            htmlFor="taskType"
            className="block text-sm font-medium text-gray-700"
          >
            AI/ML Task Type
          </label>
          <select
            id="taskType"
            name="taskType"
            value={formData.taskType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select a task type
            </option>
            <option value="image_classification">Image Classification</option>
            <option value="object_detection">Object Detection</option>
            <option value="nlp">Natural Language Processing</option>
            <option value="generative_ai">Generative AI</option>
            <option value="reinforcement_learning">
              Reinforcement Learning
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Dataset Size */}
        <div className="space-y-2">
          <label
            htmlFor="datasetSize"
            className="block text-sm font-medium text-gray-700"
          >
            Dataset Size (GB)
          </label>
          <input
            type="number"
            id="datasetSize"
            name="datasetSize"
            value={formData.datasetSize}
            onChange={handleChange}
            min="0"
            step="0.1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter dataset size in GB"
          />
        </div>

        {/* Training or Inference */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Operation Type
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="training"
                name="operationType"
                type="radio"
                value="training"
                checked={formData.operationType === "training"}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="training"
                className="ml-2 block text-sm text-gray-700"
              >
                Training
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="inference"
                name="operationType"
                type="radio"
                value="inference"
                checked={formData.operationType === "inference"}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="inference"
                className="ml-2 block text-sm text-gray-700"
              >
                Inference
              </label>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Budget (USD)
          </label>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="minBudget"
                  name="minBudget"
                  value={formData.minBudget}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Minimum"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="maxBudget"
                  name="maxBudget"
                  value={formData.maxBudget}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Maximum"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preferred Region */}
        <div className="space-y-2">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred Region
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select a region
            </option>
            <option value="us_east">US East</option>
            <option value="us_west">US West</option>
            <option value="europe">Europe</option>
            <option value="asia_pacific">Asia Pacific</option>
            <option value="south_america">South America</option>
            <option value="africa">Africa</option>
            <option value="any">Any Region</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Find GPU Resources
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
