# Personal Blogging Platform API
A RESTful API backend for a personal blogging platform built with Node.js, Express, TypeScript, and Prisma.

## Features
- User authentication with JWT tokens
- Session management with refresh tokens
- CRUD operations for blog posts
- Categories management
- Comments system
- Post reactions (likes/dislikes)
- Media uploads
- Search and filtering capabilities
- Pagination

## Tech Stack
- Node.js
- TypeScript
- Express.js
- Prisma (MySQL)
- JSON Web Tokens
- Zod (Validation)
- Argon2 (Password hashing)

  ## Prerequisites
- Node.js (>=18.x)
- MySQL
- pnpm (recommended) or npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-blogging-platform
```
2. Install dependencies:
``` pnpm install```
3. Create a .env file in the root directory:
   ``` 
    PORT=3000
    NODE_ENV=development
    DATABASE_URL="mysql://user:password@localhost:3306/blog_db"
    JWT_SECRET="your-jwt-secret"
    JWT_EXPIRES_IN="15m"

4. Set up the database:  `pnpm prisma migrate dev `
5. Start the development server: `pnpm dev`


## API Endpoints

Authentication
```
POST /auth/register - Register a new user
POST /auth/login - User login
POST /auth/logout - User logout
```

Articles
```
POST /articles - Create article
GET /articles/?page=1&limit=10 - Get all articles
GET /articles/filter - Filter articles
GET /articles/:user_id - Get user articles
PUT /articles/:article_id - Update article
DELETE /articles/:article_id - Delete article
```

Categories
```
POST /categories - Create category
GET /categories - Get all categories
```

Comments
```
POST /comments - Add comment
GET /comments/:post_id - Get post comments
PUT /comments/:comment_id - Update comment
DELETE /comments/:comment_id - Delete comment
```

