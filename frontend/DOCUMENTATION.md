# Frontend Documentation

## Live Link : https://jamesbond-gpu007.onrender.com/

## Overview

This frontend project is a React application built using Vite as the build tool. It serves as a GPU Recommendation Engine that helps users find the ideal GPU for their AI, machine learning, gaming, HPC, data processing, and rendering workloads. The project uses TailwindCSS for styling and Axios for making HTTP requests to the backend API.

## Tech Stack

- React 19.x
- Vite
- TailwindCSS
- Axios
- ESLint with React hooks and refresh plugins

## Project Structure

- `src/` - Contains the source code for the React application.

  - `App.jsx` - Main application component that manages state and renders the form and recommendations.
  - `components/` - Contains React components used in the app:
    - `GpuCard.jsx` - Displays detailed information and pricing for a single GPU instance.
    - `GpuRecommendations.jsx` - Renders a list of GPU recommendations, scores them based on user criteria, and displays scoring details.
    - `WorkLoadForm.jsx` - Form component for users to input workload details and preferences.
  - `utils/` - Utility functions and data (e.g., region mappings, countries, task types).

- `public/` - Static assets like images and icons.
- `package.json` - Project metadata, dependencies, and scripts.
- `README.md` - Basic project information and setup instructions.
- `DOCUMENTATION.md` - This comprehensive documentation file.

## Main Application (`src/App.jsx`)

- Manages application state including GPU recommendations, loading state, pricing preference, and search criteria.
- Handles form submission by sending user input to the backend API to fetch GPU recommendations.
- Renders the `WorkLoadForm` for user input and `GpuRecommendations` to display results.

## Components

### GpuCard.jsx

- Displays GPU instance details such as description, class, availability, specs (vCPUs, RAM, GPU memory, region).
- Shows pricing options with tabs for On-Demand, Spot, and Monthly pricing.
- Includes buttons for "Deploy Now" or "Request Access" based on GPU availability.

### GpuRecommendations.jsx

- Receives GPU recommendations and user search criteria as props.
- Scores each GPU based on criteria including model type, dataset size, workload type, budget fit, and region match.
- Sorts GPUs by score and displays them using the `GpuCard` component.
- Shows a scoring explanation table and messages for no exact matches.
- Displays loading spinner or no recommendations message as appropriate.

### WorkLoadForm.jsx

- Form for collecting user input on workload and budget criteria.
- Supports multiple task types: Machine Learning/Deep Learning, Gaming, HPC, Data Processing, Rendering.
- Dynamically shows task-specific fields based on selected task type.
- Validates budget inputs and region selection.
- Submits flattened data to parent component for processing.

## Utilities (`src/utils/`)

- Contains helper files such as `regionMapping.js`, `countries.js`, and `taskType.js` to support the app with data mappings and constants.

## Running the Project

### Development

Run the following command to start the development server with hot module replacement:

```
npm run dev
```

### Build

To build the project for production, run:

```
npm run build
```

### Preview

To preview the production build locally, run:

```
npm run preview
```

### Linting

To run ESLint and check for code quality issues, run:

```
npm run lint
```

## Additional Notes

- The frontend communicates with the backend API at `http://localhost:3000/api/v1/recommend-gpu` to fetch GPU recommendations.
- TailwindCSS is used for styling with utility-first CSS classes.
- The project uses React hooks for state management and side effects.

---

This documentation provides a comprehensive overview of the frontend folder, its structure, components, and usage instructions.
