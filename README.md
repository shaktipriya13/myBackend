# Chapter Performance API

A RESTful API for managing chapters and batches in a performance dashboard, built with Node.js, Express, MongoDB, and Redis. This API supports chapter management with filtering, pagination, caching, and secure file uploads, as well as batch operations for grouping chapters.

## Features

- **Chapter Endpoints** :
- `GET /api/v1/chapters`: Retrieve chapters with filters (subject, class, unit, status, isWeakChapter) and pagination.
- `GET /api/v1/chapters/:id`: Get a single chapter by ID.
- `POST /api/v1/chapters`: Upload a JSON file to add chapters (admin-only).
- **Batch Endpoints** :
- `GET /api/v1/batches`: Retrieve batches with filters (name, status) and pagination.
- `GET /api/v1/batches/:id`: Get a single batch by ID.
- `POST /api/v1/batches`: Create a new batch (admin-only).
- `PUT /api/v1/batches/:id`: Update an existing batch (admin-only).
- `DELETE /api/v1/batches/:id`: Delete a batch (admin-only).
- **Caching** : Redis caching for `GET /api/v1/chapters` and `GET /api/v1/batches` (1-hour TTL).
- **Rate-Limiting** : 30 requests per minute per IP.
- **Authentication** : Admin-only endpoints secured with token-based authentication.
- **File Uploads** : JSON file uploads for chapters using Multer.
- **Deployment** : Deployed on [Render/Railway/Fly.io] with a public Postman collection.
- **CI/CD** : Automated deployment with GitHub Actions (see `.github/workflows/deploy.yml`).

## Project Structure

```
math/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   ├── db.js
│   │   └── redisClient.js
│   ├── controllers/
│   │   ├── authController.js    # New
│   │   └── chapterController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── rateLimit.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Chapter.js
│   │   └── User.js             # New
│   ├── routes/
│   │   ├── authRoutes.js       # New
│   │   └── chapterRoutes.js
│   ├── utils/
│   │   └── cache.js
│   └── index.js
├── test-data/
│   └── chapters.json
├── .env
├── .gitignore
├── package.json
├── README.md
├── postman_collection.json
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
   PORT=3000
   ADMIN_TOKEN=<your-admin-token>
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

### Batches

- **GET /api/v1/batches**
  - Query Parameters: `name`, `status`, `page`, `limit`
  - Returns: Paginated list of batches
- **GET /api/v1/batches/:id**
  - Returns: Single batch by ID
- **POST /api/v1/batches**
  - Body: `{ name, status, chapters: [chapterIds] }`
  - Headers: `Authorization: Bearer <admin-token>`
  - Returns: Created batch
- **PUT /api/v1/batches/:id**
  - Body: `{ name, status, chapters: [chapterIds] }`
  - Headers: `Authorization: Bearer <admin-token>`
  - Returns: Updated batch
- **DELETE /api/v1/batches/:id**
  - Headers: `Authorization: Bearer <admin-token>`
  - Returns: Success message

## Testing

- **Local Testing** : Use Postman to test endpoints.
- **Public Postman Collection** : [Link to your Postman collection]
- **Deployed API** : [Link to your deployed API]

## Deployment

- **Platform** : Deployed on [Render/Railway/Fly.io].
- **CI/CD** : Automated deployment using GitHub Actions (see `.github/workflows/deploy.yml`).
- **Optional** : Deployed on AWS EC2 for scalability.

## Tech Stack

- **Backend** : Node.js, Express.js
- **Database** : MongoDB (Mongoose)
- **Caching** : Redis (for GET endpoints and rate-limiting)
- **File Uploads** : Multer
- **Deployment** : Render/Railway/Fly.io, AWS EC2 (optional)
- **CI/CD** : GitHub Actions

---

by default cjs is used

| Feature           | CommonJS (CJS)               | ES Modules (ESM)                                       |
| ----------------- | ---------------------------- | ------------------------------------------------------ |
| File extension    | `.js`(default in Node.js)    | `.mjs`or `.js`with `"type": "module"`in `package.json` |
| Export syntax     | `module.exports`or `exports` | `export`,`export default`                              |
| Import syntax     | `require()`                  | `import`                                               |
| Synchronous       | ✅ Yes                       | ❌ No (import is async)                                |
| Works in Node.js  | ✅ Native                    | ✅ (with config)                                       |
| Works in browsers | ❌ No (needs bundling)       | ✅ Yes (modern browsers)                               |
