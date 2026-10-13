# Stage 1: Build with Maven
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Copy Maven files
COPY mvnw pom.xml ./
COPY .mvn .mvn

# Ensure mvnw has execution permission
RUN chmod +x ./mvnw

# Download dependencies cache
RUN ./mvnw dependency:go-offline -B || true

# Copy source code and package JAR
COPY src src
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Minimal Runtime Environment
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/FoodRescuePlatform-0.0.1-SNAPSHOT.jar app.jar

# Spring Boot reads PORT from environment variable (handled by server.port=${PORT:8080})
EXPOSE 8080

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
