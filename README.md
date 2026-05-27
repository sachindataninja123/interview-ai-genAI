# Interview AI 🤖

An AI-powered interview preparation platform that analyzes your resume, self-description, and job description to generate personalized technical questions, behavioral questions, skill gap analysis, and a day-wise preparation plan.

---

## Features

- Upload resume (PDF) and get a full interview report powered by AI
- AI-generated technical and behavioral interview questions with answers
- Skill gap analysis with severity levels
- Day-wise preparation plan tailored to the job
- Match score between candidate profile and job description
- JWT-based authentication with refresh token support
- Download generated resume as PDF

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (Access + Refresh Tokens) |
| AI Model | LLaMA 3.3 70B (via Groq) |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| Frontend | React.js |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/interview-ai.git
cd interview-ai/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm run dev
```

---

## Environment Variables

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
GROQ_API_KEY=your_groq_api_key
```

---

## API Documentation

Base URL: `http://localhost:8000`

Protected routes require a valid JWT token in the `Authorization: Bearer <token>` header.

---

### User Routes

**Base path:** `/users`

---

#### POST `/users/register`

Register a new user.

**Request Body**

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response `201`**

```json
{
  "message": "User registered successfully",
  "success": true,
  "user": {
    "name" : "name",
    "_id": "user_id",
    "email": "john@example.com"
  },
```

---

#### POST `/users/login`

Authenticate an existing user.

**Request Body**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response `200`**

```json
{
  "message": "Login successful",
  "success": true,
  "accessToken": "jwt_access_token",
}
```

---

#### GET `/users/profile`

🔒 Protected — Get the authenticated user's profile.

**Response `200`**

```json
{
  "message": "Profile fetched successfully",
  "success": true,
  "user": {
    "_id": "user_id",
    "name": "John",
    "email": "john@example.com"
  }
}
```

---

#### POST `/users/logout`

🔒 Protected — Logout and invalidate tokens.

**Response `200`**

```json
{
  "message": "Logged out successfully",
  "success": true
}
```

---

#### POST `/users/refresh-token`

Get a new access token using a refresh token.

**Request Body**

```json
{
  "refreshToken": "your_refresh_token"
}
```

**Response `200`**

```json
{
  "accessToken": "new_jwt_access_token"
}
```

---

### Interview Routes

**Base path:** `/interview`

---

#### POST `/interview`

🔒 Protected — Generate an AI-powered interview report by uploading a resume PDF.

**Request** — `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `resume` | File (PDF) | ✅ | Candidate's resume in PDF format |
| `selfDescription` | string | ✅ | A short description about yourself |
| `jobDescription` | string | ✅ | The job description you are applying for |

**Response `200`**

```json
{
  "message": "Interview generated successfully",
  "interviewReport": {
    "_id": "report_id",
    "title": "Full Stack Developer",
    "matchScore": 78,
    "technicalQuestions": [
      {
        "question": "Explain the difference between REST and GraphQL.",
        "intention": "To assess API design knowledge.",
        "answer": "REST uses multiple endpoints while GraphQL uses a single endpoint..."
      }
    ],
    "behavioralQuestions": [
      {
        "question": "Tell me about a time you worked in a team.",
        "intention": "To assess collaboration skills.",
        "answer": "Use the STAR method — Situation, Task, Action, Result..."
      }
    ],
    "skillGaps": [
      {
        "skill": "System Design",
        "severity": "medium"
      }
    ],
    "preparationPlan": [
      {
        "day": 1,
        "focus": "JavaScript fundamentals",
        "tasks": [
          "Revise closures, promises, and async/await",
          "Solve 5 JS problems on LeetCode"
        ]
      }
    ],
    "createdAt": "2026-05-26T04:50:53.922Z"
  }
}
```

---

#### GET `/interview/report/all`

🔒 Protected — Get all interview reports for the authenticated user (summary only, no questions).

**Response `200`**

```json
{
  "message": "Interview report fetched successfully",
  "success": true,
  "interviewReports": [
    {
      "_id": "report_id",
      "title": "Full Stack Developer",
      "matchScore": 78,
      "createdAt": "2026-05-26T04:50:53.922Z"
    }
  ]
}
```

---

#### GET `/interview/report/:interviewId`

🔒 Protected — Get a single interview report with full details.

**URL Params**

| Param | Type | Description |
|---|---|---|
| `interviewId` | string | MongoDB ObjectId of the interview report |

**Response `200`**

```json
{
  "message": "Interview report fetched successfully",
  "success": true,
  "interviewReport": {
    "_id": "report_id",
    "title": "Full Stack Developer",
    "matchScore": 78,
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGaps": [...],
    "preparationPlan": [...]
  }
}
```

---

#### POST `/interview/resume/pdf/:interviewReportId`

🔒 Protected — Generate and download a resume PDF based on an interview report.

**URL Params**

| Param | Type | Description |
|---|---|---|
| `interviewReportId` | string | MongoDB ObjectId of the interview report |

**Response `200`**

Returns a downloadable PDF file.

---

## AI Model

This project uses **LLaMA 3.3 70B Versatile** via [Groq](https://console.groq.com) for ultra-fast AI inference.

The model generates:
- Matched job title and score
- 5–10 technical interview questions with answers
- 5 behavioral questions with answers
- Skill gap analysis
- 7-day preparation plan

---

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── interview.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── interviewReport.model.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── interview.routes.js
│   ├── middlewares/
│   │   ├── isAuth.middleware.js
│   │   └── file.middleware.js
│   └── services/
│       └── ai.service.js
├── server.js
└── .env
```

---

## License

MIT © Interview AI
