# MiniStackOverflow

## Overview
MiniStackOverflow is a web-based platform where users can share code snippets and files with a title and description. The system includes authentication, file uploads, notifications, and a user-friendly interface. Initially developed as a monolithic application, the project was later refactored into a microservices architecture for better scalability and maintainability.

## Features
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Post Creation**: Users can create posts containing code snippets or uploaded files.
- **File Storage**: MinIO is used to store uploaded files securely.
- **Notifications**: When a user posts something, a notification is sent to other users.
- **Post Management**: Users can:
  - Create a new post
  - View their own posts
  - View posts from other users
- **Notification Handling**: Once a user views their notifications, they are automatically cleared.

## Technology Stack
### Frontend:
- HTML
- CSS
- JavaScript
- React.js

### Backend:
- Node.js
- Express.js
- MongoDB

### File Storage:
- MinIO

## Architecture
### Monolithic Version
Initially, the project was built using a monolithic architecture, where all functionalities were within a single codebase. The system handled authentication, post creation, notifications, and file storage in a tightly coupled manner.

### Microservices Version
To improve scalability and maintainability, the monolithic architecture was divided into three separate microservices:

1. **UserService**: Manages user authentication and profile information. Uses **userDB**.
2. **PostService**: Handles post creation, retrieval, and file uploads. Uses **postDB**.
3. **NotificationService**: Manages notifications for user interactions. Uses **notificationDB**.

#### Inter-Service Communication
- The **PostService** and **NotificationService** are dependent on each other. When a new post is created, a notification is sent to other users. This dependency was successfully handled using proper event-driven communication.

## Deployment
The entire project has been **Dockerized** to ensure seamless deployment and scaling. Each microservice runs in its own container, making it easier to manage and deploy across different environments.

## Installation & Setup
### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** installed and running
- **MinIO** configured for file storage
- **Docker** installed (for containerized deployment)

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/Juriez/Distributed_MiniStackOverflow.git
   cd MiniStackOverflow
   ```

2. Install dependencies for each service:
   ```sh
   cd Backend/UserService && npm install
   cd ../PostService && npm install
   cd ../NotificationService && npm install
   ```

3. Start MongoDB and MinIO.

4. Run each service separately:
   ```sh
   node server.js # Run UserService
   node server.js # Run PostService
   node server.js # Run NotificationService
   ```

5. Start the frontend:
   ```sh
   cd Frontend && npm install
   npm start
   ```

### Running with Docker
To run the entire project using Docker:
```sh
docker-compose up --build
```

## Future Improvements
- Implementing WebSockets for real-time notifications
- Adding a search feature for posts
- Enhancing security with JWT-based authentication

## Conclusion
MiniStackOverflow is a feature-rich platform that allows users to share and manage code snippets efficiently. The transition from a monolithic structure to microservices has improved scalability and modularity. With Dockerization, deployment is now streamlined and easier to manage.

---
Feel free to knock me 
bsse1316@iit.du.ac.bd
mahirf2577@gmail.com

### Author: Mahir Faisal

