FROM eclipse-temurin:21 AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar

FROM ubuntu/jre:21-24.04_stable AS runtime
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 3000
ENTRYPOINT ["java", "-jar", "app.jar"]
