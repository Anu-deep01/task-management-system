### Task Management System Backend

This repository contains the backend implementation for a task management system developed using Node.js, Express, MongoDB, and WebSocket for real-time updates.

## Setup Instructions

Follow these steps to set up and run the backend on your local machine:

### Prerequisites

- Node.js installed on your machine
- MongoDB server running locally or accessible via a URL

### Installation

1. Clone this repository to your local machine:

git clone https://github.com/your-username/task-management-backend.git

2. Navigate to the project directory:

cd task-management-backend

3. Install dependencies:

npm install

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

PORT=3000 # Port for the server to listen on
MONGODB_URI=mongodb://localhost:27017/task_manager # MongoDB connection URI
JWT_SECRET=your_jwt_secret_key_here # Secret key for JWT authentication

Replace `your_jwt_secret_key_here` with your preferred secret key for JWT token generation.

### Running the Server

To start the server, run the following command:

npm start

The server will start listening on the specified port (default: 3000) and connect to the MongoDB database.

## API Endpoint Documentation

### Task Endpoints

#### GET /api/task

Retrieve all tasks associated with the authenticated user.

#### POST /api/task

Create a new task.

- Request Body:

```json
{
    "title": "Task Title",
    "description": "Task Description",
    "status": "active"
}
PUT /api/task/:id
Update a task's status.

Request Parameters: id (Task ID)
Request Body:
{
    "status": "completed"
}
DELETE /api/task/:id
Delete a task.

Request Parameters: id (Task ID)
Authentication Endpoints
POST /api/auth/signup
Create a new user account.

Request Body:
{
    "username": "Your Username",
    "email": "user@example.com",
    "password": "your_password"
}
POST /api/auth/signin
Sign in with an existing user account.

Request Body:
{
    "email": "user@example.com",
    "password": "your_password"
}
Real-time Update Mechanism
The server utilizes WebSocket for real-time updates. Clients are notified in real-time when a task is added, updated, or deleted. WebSocket events are triggered when changes occur, and connected clients receive these updates instantly.

Rate Limiting
The server implements a simple rate-limiting mechanism to prevent abuse of the API. Requests are limited based on IP address to ensure fair usage and protect against potential attacks.

Environment Variables
PORT: Port number for the server to listen on.
MONGODB_URI: MongoDB connection URI.
JWT_SECRET: Secret key for JWT token generation.
Authors
Anudeep
License
This project is licensed under the MIT License - see the LICENSE file for details.