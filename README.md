# OAuth 2.0 Backend Server

This project implements an OAuth 2.0 backend server using **TypeScript**, **NestJS**, **AuthGuard**, **Passport**, and **MongoDB**. The server provides authentication and authorization services with endpoints for user registration, login, logout, token refresh, and user management.

## Features
- **Secure Authentication:** Implements OAuth 2.0 flows for secure access.
- **Refresh Token Mechanism:** Ensures long-term session management.
- **JWT Integration:** JSON Web Tokens for token-based authentication.
- **Role-based Authorization:** Enables access control based on user roles.
- **MongoDB Integration:** For storing user credentials and session data.
- **Modular Architecture:** Built with NestJS for easy scalability and maintainability.

## Prerequisites
Ensure you have the following installed:
- **Node.js**: `v16.x` or higher
- **npm** or **yarn**
- **MongoDB**: Running instance

## Installation
1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Environment Variables:** Create a `.env` file in the root directory and configure the following:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/oauth
    JWT_SECRET=your-secret-key
    JWT_EXPIRES_IN=3600s
    REFRESH_TOKEN_SECRET=your-refresh-token-secret
    REFRESH_TOKEN_EXPIRES_IN=7d
    ```

4. **Run the development server:**
    ```bash
    npm run start:dev
    ```

5. **API Documentation:** Once the server is running, access API documentation at `http://localhost:3000/api` (if Swagger is enabled).

## Endpoints
### Authentication Routes
#### **Register**
- **POST** `/auth/register`
- **Request Body:**
    ```json
    {
      "username": "exampleUser",
      "password": "examplePassword",
      "email": "example@example.com"
    }
    ```
- **Response:**
    ```json
    {
      "message": "User registered successfully."
    }
    ```

#### **Login**
- **POST** `/auth/login`
- **Request Body:**
    ```json
    {
      "username": "exampleUser",
      "password": "examplePassword"
    }
    ```
- **Response:**
    ```json
    {
      "accessToken": "<JWT_TOKEN>",
      "refreshToken": "<REFRESH_TOKEN>"
    }
    ```

#### **Logout**
- **POST** `/auth/logout`
- **Request Body:**
    ```json
    {
      "refreshToken": "<REFRESH_TOKEN>"
    }
    ```
- **Response:**
    ```json
    {
      "message": "Logged out successfully."
    }
    ```

#### **Refresh Token**
- **POST** `/auth/refresh`
- **Request Body:**
    ```json
    {
      "refreshToken": "<REFRESH_TOKEN>"
    }
    ```
- **Response:**
    ```json
    {
      "accessToken": "<NEW_JWT_TOKEN>",
      "refreshToken": "<NEW_REFRESH_TOKEN>"
    }
    ```

## Project Structure
```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── local.strategy.ts
├── users/
│   ├── user.controller.ts
│   ├── user.module.ts
│   ├── user.schema.ts
│   ├── user.service.ts
├── app.module.ts
├── main.ts
```

## Scripts
- **Start Development Server:**
    ```bash
    npm run start:dev
    ```
- **Build for Production:**
    ```bash
    npm run build
    ```
- **Run Tests:**
    ```bash
    npm run test
    ```

## Dependencies
Key dependencies used in the project:
- **NestJS**: Framework for building server-side applications.
- **Passport**: Middleware for authentication.
- **Passport-JWT**: Strategy for JWT authentication.
- **Mongoose**: ODM for MongoDB.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License
This project is licensed under the MIT License.

