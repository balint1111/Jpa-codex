# Backend Agent Instructions

This directory contains Kotlin Spring Boot microservices. Each service is independent.

## Building
Run `./gradlew build` inside each service directory or use Docker.

## Testing
Use `./gradlew test` to run unit tests. Ensure services compile before committing.

## Docker
Services can be built with Docker using the provided `Dockerfile`s. The root `docker-compose.yml` starts the databases and services.

