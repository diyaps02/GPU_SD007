import { fetchAll, filterGpus,sortGpus } from "../services/recommendation_service.js";




const getRecommendations = async (req, res)=> {
    try {
        const { use_case, dataset_size, budget, region, operating_system, resolution, render_time, latency_sensitivity } = req.body;
  
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
        let response = await fetchAll(region); // Fetch all GPUs from the API
        // if (!response || !response.data || !response.data.data) {
        //     return res.status(500).json({ error: 'Failed to fetch GPU data' });
        // }
            console.log(response)
        let gpuApiResponse = response.data.data;
        let filteredGpus = filterGpus(filters, gpuApiResponse);
        console.log("Filtered GPUs: ", filteredGpus);
  
        // Step 2: Sort filtered GPUs based on price-to-performance ratio
        filteredGpus = sortGpus(filteredGpus, 'price_per_hour');  // Sorting by price_per_hour or another metric
  
        // Step 3: Return the filtered and sorted GPU list
        res.json(filteredGpus);
    } catch (error) {
        console.error('Error fetching GPU data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    getRecommendations
}