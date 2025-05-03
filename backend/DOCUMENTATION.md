# Backend Documentation

## .env{

PORT=3000

API_URL="https://customer.acecloudhosting.com//api/v1/pricing?is_gpu=true&resource=instances"
}

## Backend live link : https://gpu-sd007.onrender.com

## Overview

This backend is built using Express.js and provides an API for GPU recommendations based on user input filters. It fetches GPU data from an external API, filters and sorts the GPUs, and returns the results.

## Setup and Running the Server

- The main Express app is defined in `src/app.js`.
- The server is started in `src/server.js` and listens on the port specified in environment variables or defaults to 3000.
- Environment variables are loaded from a `.env` file using the `dotenv` package.

To run the server:

```bash
npm install
npm start
```

## API Endpoints

### POST /api/v1/recommend-gpu

- Accepts a JSON body with filters such as:
  - `use_case`
  - `dataset_size`
  - `budget`
  - `region`
  - `operating_system`
  - `resolution`
  - `render_time`
  - `latency_sensitivity`
- Returns a filtered and sorted list of GPUs matching the criteria.

## Controllers

- `src/api/controllers/recommendation.controller.js` contains the controller function `getRecommendations`.
- It extracts filter parameters from the request body.
- Calls service functions to fetch, filter, and sort GPU data.
- Sends the filtered GPU list as JSON response.
- Handles errors and sends appropriate HTTP status codes.

## Services

- `src/api/services/recommendation_service.js` contains:
  - `fetchAll(region)`: Fetches GPU data from an external API.
  - `filterGpus(filters, gpuApiResponse)`: Filters GPUs based on user criteria.
  - `sortGpus(gpus, sortBy)`: Sorts GPUs by price-to-performance ratio.
  - `mapDatasetSizeToMemory(datasetSize)`: Helper to map dataset size to VRAM requirements.

## Configuration

- `src/config/index.js` loads environment variables from `.env`.
- Exports a `config` object with:
  - `port`: Server port.
  - `api_url`: External API URL for fetching GPU data.

## Utilities

- `src/utils/logger.js` provides a simple logger with methods:
  - `info(message)`
  - `error(message)`
  - `warn(message)`
  - `debug(message)` (logs only if `DEBUG` env variable is set)
- Logs include timestamps and log levels.

## Example Usage of the API

Request:

```http
POST /api/v1/recommend-gpu
Content-Type: application/json

{
  "use_case": "machine_learning",
  "dataset_size": "medium",
  "budget": { "monthly": 1000, "hourly": 5 },
  "region": "us-west-1",
  "operating_system": "linux",
  "resolution": "medium",
  "render_time": 10,
  "latency_sensitivity": false
}
```

Response:

```json
[
  {
    "name": "GPU Model A",
    "price_per_hour": 3.5,
    "ram": 32,
    "operating_system": "linux",
    ...
  },
  ...
]
```

---

This documentation provides an overview of the backend structure, setup, and API usage. For any questions or further details, please refer to the source code or contact the development team.
