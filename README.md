# Talk Time

#### _A Real-Time Chat Application_

Welcome to [Talk Time](https://talktimeapp.com/), a real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can engage in conversations with each other seamlessly.
https://github.com/RyuzakiiL23/Talk-Time-Portfolio/blob/jest-test/homepage.png

## Tech Stack

### Backend

- Node.js and Express.js for server-side logic
- MongoDB for database management
- Socket.io for real-time communication
- Bcrypt for password hashing
- Jsonwebtoken for token-based authentication
- Cookie-parser for cookie parsing

### Frontend

- React.js for building the user interface
- Tailwind CSS for styling

### Packages Installed

- Express for server initialization
- Socket.io for real-time chat functionality
- Nodemon for automatic server restarts
- Dotenv for environment variable management
- Bcrypt for password hashing
- Jsonwebtoken for token creation
- Mongoose for MongoDB connection
- Cookie-parser for cookie parsing

## Backend Structure

### Routes Folder

- `auth.routes.js`: Defines authentication routes (signup, login, logout)
- `messages.routes.js`: Defines message routes (`api/messages/send/id`)
- `user.routes.js`: Defines user routes

### Controllers Folder

- `auth.controller.js`: Handles authentication logic (login, signup, logout)
- `messages.controller.js`: Manages message-related functions (sendMessage, getMessage)
- `user.controller.js`: Controls user-related functions

### Database Folder

- `connectToMongoDB.js`: Establishes connection to MongoDB database

### Server.js

Contains all backend routes

### Models Folder

- `user.model.js`: Defines user schema
- `message.model.js`: Defines message schema
- `conversation.model.js`: Defines conversation schema

### Middleware Folder

- `protectRoute.js`: Protects routes from unauthorized access

### Utils Folder

- `generateToken.js`: Generates tokens for authentication and security

## Getting Started

To run the application, follow these steps:

1. Clone the repository
   git clone https://github.com/yourusername/talk-time.git
   cd talk-time

2. Navigate to the frontend and backend directories and install dependencies<br>
   cd frontend
   npm install
   <br>
   cd backend
   npm install

3. Set up environment variables

   - Create a `.env` file in the backend directory and configure your application settings, including MongoDB URI and JWT secret key.

4. Start the server and client<br>
   cd backend
   npm start server
   <br>
   cd frontend
   npm start dev

5. Access the application in your browser at `http://localhost:3000`

### Acknowledgments

We express gratitude to the following resources which greatly contributed to the development of Talk Time:

- Documentation from MongoDB, Express.js, React.js, and Node.js
- Various online tutorials and guides on real-time chat application development
- Stack Overflow community for valuable insights and solutions

Feel free to reach out with any questions or feedback!
