const config = {
    // Development
    development: {
        apiUrl: 'http://localhost:5000'
    },
    // Production
    production: {
        apiUrl: 'https://your-backend-url.com' // Replace with your actual deployed backend URL
    }
};

// Use the appropriate configuration based on the environment
const environment = process.env.NODE_ENV || 'development';
export const apiUrl = config[environment].apiUrl; 