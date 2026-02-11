## Multi-Stage Build for Java Application with Secure Runtime Container

## Objective
The objective of this practical is to:
- Implement Multi-Stage Docker Build for Java application
- Separate build environment from runtime environment
- Reduce final Docker image size
- Improve container security using non-root user
- Use production-ready Java runtime base image
- Optimize container layers using BuildKit
- Understand enterprise-grade container build workflows

## Technologies Used
- Docker Desktop
- Docker CLI
- Maven Build Tool
- OpenJDK 11
- Eclipse Temurin JRE
- Multi-Stage Docker Build
- Linux Container Security
- Java Programming

## Project Structure
java-multistage-exp/
│
├── Dockerfile
├── pom.xml
└── src/
    └── main/
        └── java/
            └── com/
                └── example/
                    └── HelloWorld.java


## Java Application Code
HelloWorld.java
package com.example;

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello from MultiStage Docker Java Container!");
    }
}

## Maven Configuration (pom.xml)
Key Features:
- Java 11 Compilation
- Maven Compiler Plugin
- Maven JAR Plugin
- Manifest Main Class Configuration

Output
- target/helloapp-1.0.jar

## Multi-Stage Dockerfile
# Stage 1: Build
FROM maven:3.8-openjdk-11 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:11-jre-jammy
WORKDIR /app

# Copy only compiled jar
COPY --from=builder /app/target/helloapp-1.0.jar app.jar

# Security: Non-root user
RUN useradd -m myuser
USER myuser

CMD ["java", "-jar", "app.jar"]

## Steps

### Step 1 — Verify Docker Environment
- docker --version
- docker ps
Docker Engine Verified

### Step 2 — Create Project Structure
- mkdir java-multistage-exp
- cd java-multistage-exp
- mkdir -p src/main/java/com/example

### Step 3 — Create Project Files
Created:
HelloWorld.java
pom.xml
Multi-Stage Dockerfile

### Step 4 — Build Multi-Stage Image
- docker build -t javaprogrammulti .
Builder stage compiled JAR
Runtime stage contains only JRE + JAR
Reduced final image size

### Step 5 — Verify Image
- docker images

Observed:
Multi-stage image smaller than full Maven image
Optimized runtime container

### Step 6 — Run Container
- docker run -it javaprogrammulti

Output:
Hello from MultiStage Docker Java Container!

### Step 7 — Analyze Image Layers
- docker history javaprogrammulti
Verified:
Builder layers not included in final image
Only runtime dependencies present
Optimized production container

### Key Docker Concepts Demonstrated
- Multi-Stage Docker Build
- Builder Pattern
- Runtime Image Optimization
- Java Containerization
- Non-Root Container Security
- Production Container Design
- Layer Optimization
- BuildKit Layer Caching
  
## Learning Outcomes
After this practical, I learned:
- How multi-stage builds reduce image size
- How to separate build vs runtime dependencies
- How to implement container security using non-root user
- How production Java containers are optimized
- How enterprise container pipelines work

## Screenshot
Screenshots show:
- Java Source Code
- Maven Configuration
- Multi-Stage Dockerfile
- Docker Build Logs
- Docker Image Size Comparison
- Container Runtime Output
- Docker History Layer Analysis

<img width="1440" height="284" alt="Screenshot 2026-02-12 at 12 38 49 AM" src="https://github.com/user-attachments/assets/08e910bd-d99e-4643-b03e-08859bca1180" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 42 07 AM" src="https://github.com/user-attachments/assets/145bbee5-32fb-4203-9579-ff7ec2160efd" />
<img width="1440" height="382" alt="Screenshot 2026-02-12 at 12 42 47 AM" src="https://github.com/user-attachments/assets/0597b7cc-3cae-4c98-b6ee-a96f732db0cb" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 44 23 AM" src="https://github.com/user-attachments/assets/6cc76347-e409-4376-a424-2056ceea809a" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 44 37 AM" src="https://github.com/user-attachments/assets/6dfbd590-2420-4522-9525-72a60c8baa87" />
<img width="1440" height="381" alt="Screenshot 2026-02-12 at 12 45 55 AM" src="https://github.com/user-attachments/assets/b370bbc5-3efc-42b7-b2ea-b33bc25a4070" />
<img width="1440" height="350" alt="Screenshot 2026-02-12 at 12 46 10 AM" src="https://github.com/user-attachments/assets/58742a5a-0d2d-475d-80e9-fb140e56b440" />
<img width="1440" height="87" alt="Screenshot 2026-02-12 at 12 46 53 AM" src="https://github.com/user-attachments/assets/9346d63a-6152-4b99-88c1-d56948864ea6" />
<img width="1440" height="449" alt="Screenshot 2026-02-12 at 12 47 16 AM" src="https://github.com/user-attachments/assets/aa405750-41f0-4471-b61d-43b2345b5f3b" />
<img width="1440" height="479" alt="Screenshot 2026-02-12 at 12 47 30 AM" src="https://github.com/user-attachments/assets/dfadecd2-66df-4bab-a798-1816969653f4" />
<img width="1440" height="345" alt="Screenshot 2026-02-12 at 12 49 53 AM" src="https://github.com/user-attachments/assets/497f64ca-83fc-4fca-8cab-973c10c01dc2" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 50 52 AM" src="https://github.com/user-attachments/assets/0796a91c-2dbd-41fd-b401-37dd3269c8e9" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 52 58 AM" src="https://github.com/user-attachments/assets/96c49dc3-86c2-426a-af5e-436c90d1a4c1" />
<img width="1440" height="900" alt="Screenshot 2026-02-12 at 12 53 51 AM" src="https://github.com/user-attachments/assets/d1f2657c-7f13-4aba-8894-a1f9c785abb2" />
<img width="1437" height="750" alt="Screenshot 2026-02-12 at 12 54 29 AM" src="https://github.com/user-attachments/assets/9b9566c8-1664-4dba-9032-724455521635" />
<img width="1440" height="352" alt="Screenshot 2026-02-12 at 12 54 42 AM" src="https://github.com/user-attachments/assets/b5f01d7a-32c0-4f89-8048-cd04897deca1" />
<img width="1440" height="395" alt="Screenshot 2026-02-12 at 12 54 59 AM" src="https://github.com/user-attachments/assets/95b040d2-1d4e-4151-a7ed-88bdb80d4644" />

## Result
- Successfully created and executed a production-ready multi-stage Docker container for a Java application with secure runtime configuration and optimized image size.

## Conclusion
- This practical demonstrated enterprise-grade container optimization using multi-stage builds, runtime image separation, and container security best practices, which are widely used in modern microservices and cloud deployments.

