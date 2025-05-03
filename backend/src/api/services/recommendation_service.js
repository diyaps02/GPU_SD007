// Helper function to map dataset size to GPU memory (VRAM requirement)
function mapDatasetSizeToMemory(datasetSize) {
    switch (datasetSize) {
      case 'small':
        return 16; // GB (Low dataset size)
      case 'medium':
        return 32; // GB (Medium dataset size)
      case 'large':
        return 80; // GB (Large dataset size)
      default:
        return 0;
    }
  }
  
  // Helper function to filter GPUs based on user input
function filterGpus(filters, gpuApiResponse) {
    console.log("GPU API Response: ", Array(gpuApiResponse));
    return gpuApiResponse.filter(gpu => {
      // Filter by region
      if (filters.region && gpu.region !== filters.region) return false;
  
      // Filter by operating system compatibility
      if (filters.operating_system && gpu.operating_system !== filters.operating_system) return false;
  
      // Filter by dataset size for ML (if applicable)
      if (filters.use_case === 'machine_learning' && gpu.ram < mapDatasetSizeToMemory(filters.dataset_size)) return false;
  
      // Filter by resolution for rendering (if applicable)
      if (filters.use_case === 'rendering' && gpu.ram < mapDatasetSizeToMemory(filters.resolution)) return false;
  
      // Filter by latency sensitivity (e.g., gaming)
      if (filters.latency_sensitivity && gpu.region !== filters.region) return false;
  
      // Filter by price (monthly or hourly budget)
      if (filters.budget && gpu.price_per_month > filters.budget.monthly) return false;
  
      return true;
    });
  }
  
  // Helper function to sort GPUs by price-to-performance ratio
  function sortGpus(gpus, sortBy = 'price_per_hour') {
    return gpus.sort((a, b) => {
      const pricePerformanceA = a[sortBy] / a.ram;  // Price-to-performance ratio (simplified)
      const pricePerformanceB = b[sortBy] / b.ram;
      return pricePerformanceA - pricePerformanceB;
    });
  }
  
  
export {
    filterGpus,
    sortGpus,
    mapDatasetSizeToMemory
    
}