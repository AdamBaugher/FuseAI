# Fuse AI Assessment


## 1. Setup Instructions

### a. MongoDB Database
1. Create a database named fuseai (backend/.env).
2. Import data from the provided dump:
```bash
mongorestore --uri mongodb://localhost:27017/fuseai ./database
```
3. Import the ```free_company_dataset.json``` file into the ```companies``` collection of the database.

### b. Backend
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Start the backend server:
```bash
npm start
```

### c. Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend server:
```bash
npm start
```

### d. Browser
Visit the app at: http://localhost:5173


## 2. System Architecture Overview

### Core Concepts
The application is designed as a responsive, AI-augmented platform for exploring and enriching company data at scale. The architecture balances performance, extensibility, and real-world applicability.

### Key Components
#### a. Modular Backend (Node + Express + MongoDB)
The backend is designed as a modular API layer:
- Endpoint validation using schema-driven input sanitization
- MongoDB query builder that dynamically handles structured and AI-translated queries
- Error boundaries and retries for external LLM services

#### b. Frontend (React + Vite + Context API)
The frontend is lightweight and optimized for rapid prototyping:
- Search filters tied to MongoDB-backed autocomplete collections
- Real-time enrichment summaries displayed per company
- State management via Context API (swap-in ready for Redux or Zustand)

#### c. AI Integration with Gemini (LLM-as-a-Service)
LLM is treated as a first-class subsystem, not an afterthought:
- Gemini is used for both semantic query transformation and summarization
- Implemented fault-tolerant retries with JSON schema enforcement
- Responses are streamed or chunked for progressive rendering (future-ready)

### End-to-End Flow
#### Compnay Search
```
User Query → Frontend → Gemini (Query Rewriting) → Backend → MongoDB → Result Set → Frontend
```
- LLM rewrites vague queries into structured MongoDB-compatible filters
- Example: “Fintech companies in United States” → { industry: /fintech/i, country: /United States/i }
#### Enrichment Workflow
```
Company Selection → Backend → Company URL → Gemini (Summarization) → Summary → Frontend
```
- Enrichment is pull-based: generated on-demand per request
- Designed to be cached and stored for future reuse if needed
#### CRM-style List
- Client-side CRM functionality using React Context
- Optimized for rapid filtering, tagging, and note-taking
- Backend-ready for user authentication and persistence when needed


## 3. Key Architectural Decisions

### 1. Scalable Pagination via Customized Cursor Strategy
- Traditional skip/limit causes full scans on large datasets (24.1M records).
- Cursor-based pagination using _id provides consistent performance.
- Enhanced to support jumping to arbitrary pages with hybrid cursor/index tracking.

### 2. LLM Request Pipeline Resilience
- Gemini sometimes fails to return valid JSON or times out.
- Implemented middleware for:
  - Schema validation and repair
  - Token-based rate limiting
  - Retry queue with exponential backoff

### 3. Zero-Scraping Content Strategy
- Leveraged Gemini's web access capabilities to avoid scraping/parsing boilerplate.
- Focused effort on prompt design and prompt templating.


## 4. Assumptions Made

#### 1. Users are anonymous and have uniform access rights (no RBAC or auth required).
#### 2. The dataset in MongoDB is static during the prototype phase—no real-time ingestion.
#### 3. The external LLM (Gemini) has a stable API and predictable latency.
#### 4. Company URLs are assumed to be safe and represent the true online presence of the business.
#### 5. The autocomplete collections (countries, industries, regions) can be derived and updated periodically.


## 5. Improvements If Given More Time

### AI & Query Enhancements
- Add vector search support for natural language queries using hybrid semantic+metadata filtering.
- Add feedback loop to learn from query success/failure and improve prompts over time.

### UX and Personalization
- Add authentication and user profiles to persist CRM data, saved searches, and enrichment history.
- Improve accessibility, responsiveness, and styling of the frontend for a more polished experience.

### Caching and Optimization
- Introduce LLM response caching at API gateway level to reduce cost and latency.
- Use Redis or MongoDB Atlas Search for faster filtered lookups.

### Developer Experience
- Add unit and integration tests with coverage reporting.
- CI/CD pipeline for deployment.
