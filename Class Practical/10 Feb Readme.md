## Multi-Stage Build for C Application Using Minimal Scratch Image

The objective of this practical is to:
- Containerize a C application using Docker
- Use Multi-Stage Docker Build
- Compile binary in builder stage
- Create ultra-small runtime image using scratch
- Reduce final Docker image size
- Execute compiled binary inside container

## Technologies Used
- Docker Desktop
- Docker CLI
- Ubuntu 22.04 Base Image
- GCC Compiler
- Multi-Stage Docker Build
- Scratch Minimal Image
- C Programming

## Project Structure
Container Codes 10 Feb/
│
├── hello.c
└── Dockerfile

## Application Description
This C program:
- Continuously takes SAP ID input
- Compares with stored SAP ID
- Prints Matched / Not Matched

## C Application (hello.c)
#include <stdio.h>
#include <string.h>

int main() {
    char stored_sapid[] = "500125960";
    char user_sapid[50];

    while (1) {
        printf("Enter your SAP ID: ");
        scanf("%s", user_sapid);

        if (strcmp(user_sapid, stored_sapid) == 0) {
            printf("Matched\n");
        } else {
            printf("Not Matched\n");
        }
    }

    return 0;
}

## Multi-Stage Dockerfile
# Stage 1: Builder
FROM ubuntu:22.04 AS builder
RUN apt-get update && apt-get install -y gcc
COPY hello.c .
RUN gcc -static -o hello hello.c

# Stage 2: Minimal Runtime
FROM scratch
COPY --from=builder /hello /hello
CMD ["/hello"]

## Steps:
### Step 1: Build Docker Image
- docker build -t sapid-checkercsmall:500125960 .
Build successful using multi-stage process.

### Step 2: Verify Image
- docker images
Observed:
- sapid-checkercsmall:500125960   ~1MB (Very Small)
This proves multi-stage optimization worked.

### Step 3: Run Container
- docker run -it sapid-checkercsmall:500125960

## Key Docker Concepts Demonstrated
- Multi-Stage Build
- Builder Pattern
- Static Binary Compilation
- Minimal Runtime Containers
- Scratch Base Image
- Image Size Optimization
- Production-Level Containerization

## Learning Outcomes
After this practical, I learned:
- How multi-stage Docker builds reduce image size
- Difference between build environment and runtime environment
- Importance of static linking for scratch images
- How production containers are optimized
- Real-world container performance optimization techniques

## Screenshots show:
- C program code
- Multi-stage Dockerfile
- Docker build logs
- Docker image size comparison
- Successful container execution

<img width="1440" height="900" alt="Screenshot 2026-02-10 at 3 32 56 PM" src="https://github.com/user-attachments/assets/00036518-a7b0-493a-abc8-ffc1600923c9" />
<img width="1440" height="900" alt="Screenshot 2026-02-10 at 3 32 59 PM" src="https://github.com/user-attachments/assets/59199809-b29a-4a1c-8903-1df20f68c1bc" />
<img width="1440" height="56" alt="Screenshot 2026-02-10 at 3 35 28 PM" src="https://github.com/user-attachments/assets/14ec2ec1-1520-4e25-a28f-81b44b708cb1" />
<img width="1440" height="798" alt="Screenshot 2026-02-10 at 7 53 28 PM" src="https://github.com/user-attachments/assets/3e2a9fc5-9d12-4f02-8ddf-b8b1371d7896" />
<img width="1437" height="314" alt="Screenshot 2026-02-10 at 7 53 58 PM" src="https://github.com/user-attachments/assets/4bc09608-a019-4053-bea1-207b92a050d2" />
<img width="597" height="50" alt="Screenshot 2026-02-10 at 7 54 17 PM" src="https://github.com/user-attachments/assets/19eb4c7d-8e4e-4fac-bb97-e63d51024339" />

## Result
- Successfully created and executed an optimized Docker container for a C application using multi-stage build and scratch runtime image.

## Conclusion
- This practical demonstrated advanced container optimization using multi-stage builds and scratch images, which are commonly used in production-grade microservices and high-performance deployments.
