# AI-OOTD

A web application that uses AI to generate journal entries based on your outfit of the day.

## Environment Variables

### Backend

- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key

### Frontend

- `BACKEND_URL`: Backend URL (defaults to http://localhost if not specified)

## Running the Application

With Docker:

```bash
docker-compose up
```

Or separately:

```bash
# Backend
npm run start

# Frontend
cd frontend
npm run dev
```
