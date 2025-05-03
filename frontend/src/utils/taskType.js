// Task type definitions for GPU recommendations
const taskTypes = {
  machineLearning: {
    use_case: "machine_learning",
    dataset_size: "large", // "small", "medium", "large"
    model_type: "CNN", // "CNN", "RNN", "DNN", "other"
    training_time: "long", // "short", "long"
    budget: {
      monthly: 100000,
      hourly: 50,
    },
    region: "atlanta",
    operating_system: "windows",
  },

  gaming: {
    use_case: "gaming",
    graphics_quality: "high", // "low", "medium", "high"
    screen_resolution: "4K", // "1080p", "1440p", "4K"
    latency_sensitivity: true, // true or false
    budget: {
      monthly: 50000,
      hourly: 20,
    },
    region: "new-york",
    operating_system: "linux",
  },

  highPerformanceComputing: {
    use_case: "high_performance_computing",
    task_complexity: "complex", // "simple", "moderate", "complex"
    data_size: "large", // "small", "medium", "large"
    budget: {
      monthly: 200000,
      hourly: 100,
    },
    region: "atlanta",
    operating_system: "windows",
  },

  dataProcessing: {
    use_case: "data_processing",
    data_size: "medium", // "small", "medium", "large"
    parallel_workload: "moderate", // "light", "moderate", "heavy"
    budget: {
      monthly: 60000,
      hourly: 30,
    },
    region: "new-york",
    operating_system: "linux",
  },

  rendering: {
    use_case: "rendering", // Fixed the use_case which was incorrectly set to data_processing
    data_size: "medium", // "small", "medium", "large"
    parallel_workload: "moderate", // "light", "moderate", "heavy"
    budget: {
      monthly: 60000,
      hourly: 30,
    },
    region: "new-york",
    operating_system: "linux",
  },
};

export default taskTypes;
