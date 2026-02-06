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

<img width="1440" height="900" alt="Screenshot 2026-02-06 at 4 00 22 PM" src="https://github.com/user-attachments/assets/445db13f-6165-45c8-b7e8-3146e70591f2" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 4 00 27 PM" src="https://github.com/user-attachments/assets/8d160cf1-52ee-47a4-aa15-a2fdaffb40ae" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 3 50 57 PM" src="https://github.com/user-attachments/assets/3b4c9feb-0586-47d6-8f37-9593d79208e0" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 3 52 09 PM" src="https://github.com/user-attachments/assets/070b325a-1456-4d71-99e1-d4a8c70f05ff" />
<img width="1440" height="335" alt="Screenshot 2026-02-06 at 3 52 29 PM" src="https://github.com/user-attachments/assets/25ece935-6da5-41fd-9090-54bd07f1d48d" />
<img width="1433" height="213" alt="Screenshot 2026-02-06 at 3 53 17 PM" src="https://github.com/user-attachments/assets/03428880-9602-4186-97a8-b6d10abbdb20" />



## Result
- Successfully executed C application inside Docker container using volume mounting and interactive runtime execution.

## Conclusion
- This practical demonstrated advanced Docker usage including runtime compilation and execution of C programs using volume mounts, which is widely used in development and testing environments.
