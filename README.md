# Aesthetic Card Maker

A production-quality MERN-style web application that creates beautiful personalized cards with AI-generated taglines powered by Google's Gemini API.

## ✨ Features

- **Interactive Multi-Step Form**: Answer 5 personality questions, enter your name, upload a photo, and choose a gradient
- **AI-Powered Taglines**: Gemini API generates unique, aesthetic taglines based on your answers
- **Beautiful Card Design**: Professional card layout with gradient backgrounds and your photo
- **Download as PNG**: Export your card as a high-quality PNG image
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **No Database**: Completely stateless, in-memory application

## 🛠️ Tech Stack

### Backend (`/server`)
- **Node.js + Express**: RESTful API server
- **Google Gemini AI**: AI tagline generation
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend (`/client`)
- **React 18**: UI framework
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **html-to-image**: Card export functionality
- **Google Fonts**: Inter & Space Grotesk typography

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CozyCard
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file from the example:

```bash
cp .env.example .env
```

Edit `server/.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL_NAME=gemini-1.5-pro
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create `.env` file from the example:

```bash
cp .env.example .env
```

The default configuration should work:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🎯 Running the Application

### Start Backend Server

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Start Frontend Dev Server

Open a new terminal:

```bash
cd client
npm run dev
```

The app will open automatically at `http://localhost:5173`

## 📖 Usage

1. **Answer Questions**: Select your answers to 5 personality questions
2. **Enter Name**: Type your name (max 30 characters)
3. **Upload Photo**: Drag and drop or click to upload your photo (JPG, PNG, or WebP, max 5MB)
4. **Choose Gradient**: Select from 6 beautiful gradient presets
5. **Generate Card**: Click "Generate My Card" to create your personalized card
6. **Download**: Click "Download as PNG" to save your card

## 📁 Project Structure

```
CozyCard/
├── server/
│   ├── index.js              # Express server entry point
│   ├── gemini/
│   │   └── generateTagline.js # Gemini API integration
│   ├── .env.example          # Environment variables template
│   ├── .gitignore
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # React entry point
│   │   ├── index.css         # Global styles
│   │   ├── components/
│   │   │   ├── QuestionStepper.jsx
│   │   │   ├── NameInput.jsx
│   │   │   ├── PhotoUploader.jsx
│   │   │   ├── GradientPicker.jsx
│   │   │   ├── CardPreview.jsx
│   │   │   └── LoadingOverlay.jsx
│   │   └── lib/
│   │       └── api.js        # API client
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### `POST /api/generate-tagline`

Generates a personalized tagline based on user input.

**Request Body:**
```json
{
  "name": "Arghya",
  "answers": {
    "q1": "Calm",
    "q2": "Music & headphones",
    "q3": "Soft pastel",
    "q4": "Alone with my thoughts",
    "q5": "Hopeful & curious"
  },
  "tone": "cute, minimal, aesthetic",
  "maxWords": 10
}
```

**Response:**
```json
{
  "tagline": "Soft soul, loud dreams."
}
```

### `GET /api/health`

Health check endpoint to verify server status.

**Response:**
```json
{
  "status": "ok",
  "message": "Aesthetic Card Maker API is running",
  "geminiConfigured": true
}
```

## 🎨 Gradient Presets

- **Cotton Candy**: Pink → Purple → Blue
- **Sunset Glow**: Orange → Pink → Purple
- **Ocean Breeze**: Cyan → Sky → Blue
- **Lavender Smoke**: Purple → Indigo → Slate
- **Minimal Creme**: Light gray tones
- **Night Neon**: Dark slate → Indigo → Fuchsia

## 🔒 Environment Variables

### Backend (`/server/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Gemini API key | ✅ Yes |
| `GEMINI_MODEL_NAME` | Gemini model to use | No (default: gemini-1.5-pro) |
| `PORT` | Server port | No (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS | No (default: http://localhost:5173) |

### Frontend (`/client/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API URL | No (default: http://localhost:5000) |

## 🚢 Production Build

### Build Frontend

```bash
cd client
npm run build
```

The production build will be in `client/dist/`

### Run Backend in Production

```bash
cd server
npm start
```

## 🐛 Troubleshooting

### Backend Issues

- **"Server configuration error"**: Make sure `GEMINI_API_KEY` is set in `server/.env`
- **CORS errors**: Verify `CLIENT_URL` in `server/.env` matches your frontend URL

### Frontend Issues

- **API connection failed**: Ensure backend is running on the correct port
- **Photo upload fails**: Check file size (max 5MB) and format (JPG, PNG, WebP)
- **Download doesn't work**: Try a different browser or check console for errors

## 📝 License

MIT

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

**Made with ❤️ using MERN stack (minus MongoDB)**