## Running C Application Using Docker Volume Mount (While Loop)

## Objective
The objective of this practical is to:
- Build Docker image using official GCC base image
- Compile and run C program inside container
- Handle runtime missing file scenario
- Use Docker Volume Mounting
- Execute program dynamically from host system
- Implement continuous input loop in container

## Technologies Used
- Docker Desktop
- Docker CLI
- GCC (C Compiler)
- VS Code
- macOS Terminal
- Docker Volume Mount

## Project Structure
Docker Codes 6 Feb/
│
├── app.c
└── Dockerfile

## Application Description
This version improves previous lab by:
- Continuous input using infinite loop
- Runtime execution using mounted host file
- No rebuild required after code change

## C Application (app.c)

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

## Dockerfile (For C Program)
FROM gcc:latest

WORKDIR /app

CMD ["bash", "-c", "gcc app.c -o app && ./app"]

## Steps
### Step 1: Build Docker Image
- docker build -t sapid-checkerc:500125960 .

### Step 2: Verify Image
- docker images

### Step 3: Run Container Using Volume Mount
Same concept as Python — host file mapped inside container
- sudo docker run -it \-v "$(pwd)/app.c:/app/app.c" \sapid-checkerc:500125960

### Step 4: Running Application Inside Container
Program runs continuously:
- Enter your SAP ID:

### Step 5: Testing Output
Wrong Input 
Input:
- 5011212121
Output:
= Not Matched

Correct SAP ID
Input:
- 500125960
Output:
- Matched

## Docker Concepts Demonstrated
- Official Base Image Usage (gcc image)
- Containerized C Compilation
- Runtime File Injection
- Volume Mounting
- Host ↔ Container File Sharing
- Interactive Containers
- Continuous Runtime Execution

## Learning Outcomes
After this practical, I learned:
- How to containerize compiled languages like C
- Difference between build-time compilation vs runtime compilation
- How volume mounts enable live development
- How Docker supports multiple programming ecosystems
- Real-world container development workflow

## Screenshots
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 4 00 27 PM" src="https://github.com/user-attachments/assets/8eb650c2-9e93-4721-8f6a-a44ee85c5e2a" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 4 00 22 PM" src="https://github.com/user-a<img width="1433" height="213" alt="Screenshot 2026-02-06 at 3 53 17 PM" src="https://github.com/user-attachments/assets/6ea1dc59-cf6e-4903-bbd7-3511b17da28a" />
<img width="1440" height="335" alt="Screenshot 2026-02-06 at 3 52 29 PM" src="https://github.com/user-attachments/assets/43bb88bc-1360-4735-83fd-fa40d27186f4" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 3 52 09 PM" src="https://github.com/user-attachments/assets/171d9013-2514-43d4-9245-6c0dc6097736" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 3 50 57 PM" src="https://github.com/user-attachments/assets/b740b98d-e306-4684-b14c-b7fa6426895d" />
ttachments/assets/fd816143-d784-4dc6-9875-d189b65efd2f" />

## Result
- Successfully executed C application inside Docker container using volume mounting and interactive runtime execution.

## Conclusion
- This practical demonstrated advanced Docker usage including runtime compilation and execution of C programs using volume mounts, which is widely used in development and testing environments.
