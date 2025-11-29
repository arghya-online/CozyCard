import express from 'express';
import cors from 'cors';
import { generateTagline } from './gemini/generateTagline.js';

const app = express();
const PORT = 5000;
const CLIENT_URL = 'http://localhost:5173';

// Middleware
app.use(cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

/**
 * POST /api/generate-tagline
 * Generates a personalized tagline based on user input
 */
app.post('/api/generate-tagline', (req, res) => {
    try {
        const { name, answers } = req.body;

        // Validate required fields
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ error: 'Answers are required' });
        }

        // Validate all 5 questions are answered
        const requiredQuestions = ['q1', 'q2', 'q3', 'q4', 'q5'];
        const missingQuestions = requiredQuestions.filter(q => !answers[q] || answers[q].trim().length === 0);

        if (missingQuestions.length > 0) {
            return res.status(400).json({
                error: 'All questions must be answered',
                missing: missingQuestions
            });
        }

        // Generate tagline
        const tagline = generateTagline({
            name: name.trim(),
            answers
        });

        res.json({ tagline });

    } catch (error) {
        console.error('Error generating tagline:', error);
        res.status(500).json({
            error: 'Failed to generate tagline',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Aesthetic Card Maker API is running'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Accepting requests from: ${CLIENT_URL}`);
});
