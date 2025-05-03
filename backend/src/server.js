import { filterGpus, sortGpus } from './api/services/recommendation_service.js';
import app from './app.js';
import axios from 'axios';
import { config } from './config/index.js';



app.post('/recommend-gpu', (req, res) => {
    const { use_case, dataset_size, budget, region, operating_system, resolution, render_time, spot_instance, latency_sensitivity } = req.body;
  
    // Apply filters based on user input
    const filters = {
      use_case,
      dataset_size,
      budget,
      region,
      operating_system,
      resolution,
      render_time,
      latency_sensitivity
    };
    axios.get('https://dev-portal.openstack.acecloudhosting.com/api/v1/pricing?is_gpu=true&resource=instances&region=us-east-at-1') // Replace with actual API endpoint
        .then(response => {
            
        let gpuApiResponse = response.data.data; // Assuming the API returns a list of GPUs
        // Step 1: Filter GPUs based on the request parameters
        let filteredGpus = filterGpus(filters, gpuApiResponse);
  
        // Step 2: Sort filtered GPUs based on price-to-performance ratio
        filteredGpus = sortGpus(filteredGpus, 'price_per_hour');  // Sorting by price_per_hour or another metric
  
        // Step 3: Return the filtered and sorted GPU list
        res.json(filteredGpus);
      })
      .catch(error => {
        console.error('Error fetching GPU data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    // Step 1: Filter GPUs based on the request parameters
  
  
    // Step 3: Return the filtered and sorted GPU list
  });


app.listen(config.port || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})