FROM gradle:8.0-jdk17 AS build
COPY . /app
WORKDIR /app
RUN gradle build --no-daemon

FROM eclipse-temurin:17-jre
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
