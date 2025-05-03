import { filterGpus, sortGpus } from './api/services/recommendation_service.js';
import app from './app.js';
import axios from 'axios';
import { config } from './config/index.js';




    
app.listen(config.port || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
})