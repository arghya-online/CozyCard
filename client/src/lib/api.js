/**
 * API client for communicating with the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Generates a personalized tagline by calling the backend API
 * @param {Object} payload - Request payload
 * @param {string} payload.name - User's name
 * @param {Object} payload.answers - User's answers to personality questions
 * @param {string} [payload.tone] - Desired tone for the tagline
 * @param {number} [payload.maxWords] - Maximum words in tagline
 * @returns {Promise<{tagline: string}>} - Generated tagline
 * @throws {Error} - If the API request fails
 */
export async function generateTagline(payload) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/generate-tagline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to generate tagline');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Checks if the backend server is healthy
 * @returns {Promise<Object>} - Health status
 */
export async function checkHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return await response.json();
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
}
