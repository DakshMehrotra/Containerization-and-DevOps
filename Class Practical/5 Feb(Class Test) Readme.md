## Class Test : Containerizing a Python SAP ID Verification Application
## Objective 
The objective of this practical is to:
- Use an official Docker base image
- Containerize a simple Python application
- Install dependencies inside container
- Build custom Docker image
- Run container interactively
- Verify application execution inside container

## Technologies Used
- Docker Desktop
- Docker CLI
- Python 3.10 Slim Image
- NumPy
- VS Code
- macOS Terminal

## Structure
Docker Codes 5 Feb/
│
├── app.py
├── Dockerfile
└── README.md

## Application Description
This Python application:
- Takes SAP ID input from user
- Compares with stored SAP ID
- Prints result

### Python Application (app.py)

import numpy as np

stored_sapid = "500125960"
user_sapid = input("Enter your SAP ID: ")

if user_sapid == stored_sapid:
    print("Matched")
else:
    print("Not Matched")

### Dockerfile

FROM python:3.10-slim

WORKDIR /app

COPY app.py .

RUN pip install numpy

CMD ["python", "app.py"]

## Steps
### Step 1: Build Docker Image
- docker build -t sapid-checker:500125960 .

### Step 2: Verify Image Creation
- docker images

Image created:
- sapid-checker:500125960

### Step 3: Run Container
- sudo docker run -it sapid-checker:500125960

### Step 4: Test Application
Correct SAP ID
- 500125960
Output:
- Matched

Incorrect SAP ID
- 500232323
Output:
- Not Matched

## Docker Concepts Demonstrated
- Base Image Usage
- Dependency Installation in Container
- Image Build Process
- Container Execution
- Interactive Input Handling
- Application Isolation

## Learning Outcomes
After completing this practical, I understood:
- How Dockerfile instructions work
- How Python apps are containerized
- Difference between image and container
- How dependencies are installed inside container
- How to run interactive containers

## Screenshot
Screenshots include:
- Docker Hub Python image reference
- Python app code
- Dockerfile code
- Image build logs
- Docker images list
- Container run output (Matched / Not Matched)

<img width="1440" height="900" alt="Screenshot 2026-02-05 at 10 32 44 AM" src="https://github.com/user-attachments/assets/d0e71594-f71c-4ced-9ebe-87948f6c51aa" />
<img width="1440" height="900" alt="Screenshot 2026-02-05 at 10 16 02 PM" src="https://github.com/user-attachments/assets/1261d3f6-852e-402d-8b05-255874fb2282" />
<img width="1440" height="900" alt="Screenshot 2026-02-05 at 10 15 59 PM" src="https://github.com/user-attachments/assets/1fb7f205-3324-451f-9b9c-8b4af635f4f0" />
<img width="1440" height="118" alt="Screenshot 2026-02-05 at 10 14 57 PM" src="https://github.com/user-attachments/assets/94dda41c-590f-42d2-8349-99bbc4ebfd28" />
<img width="1440" height="85" alt="Screenshot 2026-02-05 at 10 04 33 PM" src="https://github.com/user-attachments/assets/6b8d0b7c-1dd5-47f3-9da1-f17ac92f7d33" />
<img width="1440" height="205" alt="Screenshot 2026-02-05 at 10 04 00 PM" src="https://github.com/user-attachments/assets/372c80d6-00aa-4c69-888e-7ce2609b3a24" />
<img width="1440" height="431" alt="Screenshot 2026-02-05 at 10 03 45 PM" src="https://github.com/user-attachments/assets/1fd5c599-1785-4bb3-a4a5-6d8a8d9d6a41" />


## Result
Successfully containerized a Python SAP ID verification application using Docker and executed it inside a container.

## Conclusion
- This practical demonstrated real-world containerization workflow using Docker.
- It validated how applications can be packaged with dependencies and run consistently across environments.

