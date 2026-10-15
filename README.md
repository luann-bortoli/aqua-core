# Quibenne Panel

A web application for managing treatment groups, subgroups, and treatments, built with Java, Spring Boot, and Next.js.

<img width="1262" height="822" alt="Screenshot_2" src="https://github.com/user-attachments/assets/6f8fda77-e307-4236-aa55-aa72a2185871" />

## Tech Stack

**Backend**
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Maven

**Frontend**
- Next.js
- React
- TypeScript
- Axios

**Infrastructure & Database**
- Docker
- Docker Compose
- MySQL

## Architecture

Quibenne Panel follows a **modular monolithic architecture**, organizing the backend into feature-oriented modules while maintaining a single deployable application.

This approach promotes separation of concerns, maintainability, and clear boundaries between business domains without introducing the operational complexity of a distributed system.

## Key Features

- **Modular Monolithic Architecture:** Feature-oriented package organization and separation of responsibilities.
- **Authentication and Security:** Authentication and access control implemented with Spring Security.
- **Session Management:** Stateful authentication using HTTP sessions and the `JSESSIONID` cookie.
- **Password Recovery:** Password reset flow using time-limited tokens delivered by email.
- **Centralized Exception Handling:** Consistent API error responses through centralized exception handling.
- **Treatment Management:** Hierarchical organization of treatment groups, subgroups, and treatments.
- **Structured Treatment Content:** Treatments contain steps and topics stored as JSON.
- **Pagination:** Paginated resource listing through Spring Data.
- **Containerized Infrastructure:** Docker Compose for running the backend and MySQL database.

## Project Structure

```text
quibenne-panel/
├── backend/
│   └── src/main/java/
│       └── dev/luann/backend/
│           ├── modules/
│           │   ├── product/
│           │   ├── treatment/
│           │   └── ...
│           └── shared/
│               ├── entity/
│               ├── enums/
│               └── ...
├── frontend/
│   └── ...
└── compose.yaml
```

The backend separates domain-specific functionality into modules and shared infrastructure into a common package.

## Getting Started

### Prerequisites

- Java and Maven
- Node.js and npm
- Docker and Docker Compose

### 1. Configure Environment Variables

Configure the environment variables required by the application, including the database connection and email delivery settings.

The frontend API URL can be configured through `NEXT_PUBLIC_API_URL` in the frontend environment file.

### 2. Start the Backend and Database

From the project root, run:

```bash
docker compose up -d --build
```

This builds and starts the services defined in the Docker Compose configuration.

### 3. Start the Frontend

Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Next.js, usually `http://localhost:3000`.

Ensure that `NEXT_PUBLIC_API_URL` points to the backend's accessible URL.

## Authentication and Password Recovery

The backend uses Spring Security to protect application resources and manage authenticated sessions.

Authentication relies on HTTP sessions, with the session identifier maintained through the `JSESSIONID` cookie.

The password recovery flow allows users to request a password reset through email. Reset tokens are time-limited, and passwords are updated after successful token validation.

## Error Handling

The backend uses centralized exception handling to provide consistent HTTP responses for application errors, including:

- Resource not found
- Duplicate email addresses
- Invalid or expired tokens
- Validation failures
- Operations blocked by dependent resources

This approach separates error-handling concerns from business logic and makes API failures more predictable for frontend integration.

## Development Goals

The project emphasizes backend engineering practices, including modular design, security, session management, data persistence, validation, and maintainable REST API development.
