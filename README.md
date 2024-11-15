# Graphlung Virtual Lab

Graphlung Virtual Lab is an interactive platform for learning and simulating mathematical graphs. This project includes both a frontend and a backend, built with React, TypeScript, Vite, Hono, and Prisma.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Bun](https://bun.sh/) (v1.1.34 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

## Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/your-username/Graphlung_Virtual_Lab.git
    cd Graphlung_Virtual_Lab

2. **Install dependencies for the client**
    cd client
    bun install

3. **Install dependencies for the server**
    cd ../server
    bun install

## Running the Project

1. **Set up the database**
    DATABASE_URL="postgresql://username:password@localhost:5432/graphlung_db?schema=public"
    JWT_SECRET="your-super-secret-key"
    JWT_EXPIRES_IN="7d"

2. **Run Prisma migrations**
    bunx prisma migrate dev --name init

3. **Start the backend server**
    bun run dev

4. **Start the frontend development server**
    cd client
    bun run dev

5. **Open the application**
    http://localhost:3000.

## Scripts

1. **Client**
- bun run dev: Starts the development server.
- bun run build: Builds the project for production.
- bun run lint: Runs ESLint to check for linting errors.
- bun run preview: Previews the production build.

2. **Server**
- bun run dev: Starts the backend server with hot reloading.
- bun run build: Builds the backend server.
- bun run db:migrate: Runs Prisma migrations.
- bun run db:generate: Generates Prisma client.
- bun run db:studio: Opens Prisma Studio.

## Environment Variables

1. **Client**
    No environment variables are required for the client.

2. **Server**
    Create a .env file in the server directory with the following content:
    DATABASE_URL="postgresql://username:password@localhost:5432/graphlung_db?schema=public"
    JWT_SECRET="your-super-secret-key"
    JWT_EXPIRES_IN="7d"