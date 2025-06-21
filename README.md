# Full Stack Project Skeleton

This repository provides a starting point for a Kotlin/Spring Boot microservice backend and an Angular frontend. The services communicate using WebFlux and are orchestrated via Docker Compose.

## Structure
- **backend/** – Kotlin microservices (`user-service`, `tasks-service`)
- **frontend/** – Angular application
- **docker-compose.yml** – starts databases and services

## Requirements
- Java 17
- Node.js 18+
- Docker

## Running
Run all services (including the Angular frontend) using Docker Compose:
```sh
docker-compose up --build
```

## Testing
Run backend and frontend tests before committing code changes:

```sh
./gradlew test      # in each backend service
npm test            # in frontend
```

## Features
- User management and tasks microservices backed by PostgreSQL
- Liquibase migrations for database schema
- Angular UI with login, registration, dashboard and simple routing
- Dark mode toggle and basic i18n support (EN/HU)
- Basic authentication configured on backend services

See `backend/AGENTS.md` and `frontend/AGENTS.md` for environment specific instructions.
