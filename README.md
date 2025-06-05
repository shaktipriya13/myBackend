
# Chapter Performance API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-0078D4?style=flat-square&logo=github-actions&logoColor=white)](https://docs.github.com/en/actions)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/features/actions)

A RESTful API for managing chapters and chapters in a performance dashboard, built with Node.js, Express, MongoDB, and Redis. This API supports chapter management with filtering, pagination, caching, and secure file uploads, as well as batch operations for grouping chapters.

## Features

- **Chapter Endpoints** :
- `GET /api/v1/chapters`: Retrieve chapters with filters (subject, class, unit, status, isWeakChapter) and pagination.
- `GET /api/v1/chapters/:id`: Get a single chapter by ID.
- `POST /api/v1/chapters`: Upload a JSON file to add chapters (admin-only).
- **Batch Endpoints** :
- `GET /api/v1/chapters`: Retrieve chapters with filters (name, status) and pagination.
- `GET /api/v1/chapters/:id`: Get a single batch by ID.
- `POST /api/v1/chapters`: Create a new batch (admin-only).
- `PUT /api/v1/chapters/:id`: Update an existing batch (admin-only).
- `DELETE /api/v1/chapters/:id`: Delete a batch (admin-only).
- **Caching** : Redis caching for `GET /api/v1/chapters` and `GET /api/v1/chapters` (1-hour TTL).
- **Rate-Limiting** : 30 requests per minute per IP.
- **Authentication** : Admin-only endpoints secured with token-based authentication.
- **File Uploads** : JSON file uploads for chapters using Multer.
- **Deployment** : Deployed on [Render/Railway/Fly.io] with a public Postman collection.
- **CI/CD** : Automated deployment with GitHub Actions (see `.github/workflows/deploy.yml`).

## Project Structure

```
chapter-performance-api/
├── config/                 # Configuration files (e.g., database, Redis)
│   ├── db.js
│   ├── redis.js
│   └── config.js
├── controllers/            # Logic for handling API requests
│   ├── chapterController.js
│   └── batchController.js
├── middlewares/            # Custom middleware (e.g., authentication, rate-limiting)
│   ├── auth.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/                 # Database schemas
│   ├── Chapter.js
│   └── Batch.js
├── routes/                 # API routes
│   ├── chapterRoutes.js
│   └── batchRoutes.js
├── utils/                  # Helper functions (e.g., caching, file parsing)
│   ├── cache.js
│   └── fileParser.js
├── .env                    # Environment variables (sensitive info)
├── .gitignore              # Files to ignore in Git
├── package.json            # Project metadata and dependencies
├── server.js               # Main entry point for the app
├── README.md               # Project documentation
└── .github/workflows/      # GitHub Actions for deployment
    └── deploy.yml
```

## Setup

1. **Clone the repository** :

```bash
   git clone <your-repo-url>
   cd chapter-performance-api
```

1. **Install dependencies** :

```bash
   npm install
```

1. **Create a `.env` file** in the root directory with the following:
   ```
   MONGODB_URI=<your-mongodb-uri>
   REDIS_HOST=<your-redis-host>
   REDIS_PORT=<your-redis-port>
   REDIS_PASSWORD=<your-redis-password>
   PORT=8000
   JWT_SECRET=<your-jwt-secret>
   ```
2. **Start the server** :

```bash
   npm run dev
```

## API Endpoints

### Chapters

- **GET /api/v1/chapters**
  - Query Parameters: `subject`, `class`, `unit`, `status`, `isWeakChapter`, `page`, `limit`
  - Returns: Paginated list of chapters
- **GET /api/v1/chapters/:id**
  - Returns: Single chapter by ID
- **POST /api/v1/chapters**
  - Body: JSON file (multipart/form-data)
  - Headers: `Authorization: Bearer <admin-token>`
  - Returns: Success message and added chapters

### chapters

- **GET /api/v1/chapters**
  - Query Parameters: `name`, `status`, `page`, `limit`
  - Returns: Paginated list of chapters
- **GET /api/v1/chapters/:id**
  - Returns: Single batch by ID
- **POST /api/v1/chapters**
  - Body: `{ name, status, chapters: [chapterIds] }`
  - Headers: `Authorization: Bearer <admin-token>`
  - Returns: Created batch

## Testing

- **Local Testing** : Use Postman to test endpoints.
- **Public Postman Collection** : [Link to your Postman collection]
- **Deployed API** : [Link to your deployed API]

## Deployment

- **Platform** : Deployed on Render at [link].
- **CI/CD** : Automated deployment using GitHub Actions (see `.github/workflows/deploy.yml`).
- **Optional** : Deployed on AWS EC2 for scalability.

## Tech Stack

- **Backend** : Node.js, Express.js
- **Database** : MongoDB (Mongoose)
- **Caching** : Redis (for GET endpoints and rate-limiting)
- **File Uploads** : Multer
- **Deployment** : Render/Railway/Fly.io, AWS EC2 (optional)
- **CI/CD** : GitHub Actions
