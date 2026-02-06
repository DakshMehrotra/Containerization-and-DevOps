## Running Python Application Using Docker Volume Mount ( while loop )


## Objective
The objective of this practical is to:
- Build a Docker image using an official Python base image
- Run containerized Python application
- Handle runtime file missing error
- Use Docker Volume Mounting
- Execute application dynamically from host system
- Implement continuous input loop inside container

## Technologies Used
- Docker Desktop
- Docker CLI
- Python 3.10 Slim Image
- NumPy
- VS Code
- macOS Terminal
- Docker Volume Mount

## Project Structure
Docker Codes 6 Feb/
│
├── app.py
└── Dockerfile

## Application Description
This version improves previous lab by:
- Continuous input using while True
- Runtime execution using mounted file
- No rebuild required after code change

### Python Application (app.py)
import numpy as np

stored_sapid = "500125960"

while True:
    user_sapid = input("Enter your SAP ID: ")

    if user_sapid == stored_sapid:
        print("Matched")
    else:
        print("Not Matched")

### Dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN pip install numpy

CMD ["python", "app.py"]

## Steps
### Step 1: Build Docker Image
- docker build -t sapid-checkerdaksh:500125960 .

### Step 2: Verify Image
- docker images
Image present:
- sapid-checkerdaksh:500125960

### Step 4: 
Run container using host file mapping:

- sudo docker run -it \
-v "$(pwd)/app.py:/app/app.py" \
sapid-checkerdaksh:500125960
Fix Using Volume Mount

### Step 5: Running Application Inside Container
Program runs continuously:
- Enter your SAP ID:

### Step 6: Testing Output
Wrong SAP ID
Input:
- 5011212121
Output:
- Not Matched

Correct SAP ID
Input:
- 500125960
Output:
- Matched

## Docker Concepts Demonstrated
- Official Base Image Usage
- Image Build Process
- Runtime Error Debugging
- Volume Mounting
- Host ↔ Container File Sharing
- Interactive Containers
- Continuous Runtime Execution

## Learning Outcomes
After this practical, I learned:
- Difference between COPY and Volume Mount
- How containers can use host files
- Debugging missing file errors
- Running live-updating container apps
- Real-world container development workflow

## Screenshots
Screenshots include:
- Dockerfile
- Python program
- Image build logs
- Docker images list
- Volume mount execution
- Continuous input testing

<img width="1440" height="203" alt="Screenshot 2026-02-06 at 12 34 38 PM" src="https://github.com/user-attachments/assets/b188dec8-7b9a-4bb4-a8a6-18393dbe8665" />
<img width="1440" height="422" alt="Screenshot 2026-02-06 at 12 34 57 PM" src="https://github.com/user-attachments/assets/10645b16-f2c4-411c-8164-9958da3bbd62" />
<img width="1437" height="212" alt="Screenshot 2026-02-06 at 12 35 38 PM" src="https://github.com/user-attachments/assets/832ed960-f440-484c-bd3a-92cacd5e2df1" />
<img width="1440" height="114" alt="Screenshot 2026-02-06 at 12 41 59 PM" src="https://github.com/user-attachments/assets/f4600f23-7275-44ca-afc2-fc1b62d4e402" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 12 42 35 PM" src="https://github.com/user-attachments/assets/abc8206d-546e-4c43-8f2f-0de27bc10d5c" />
<img width="1440" height="900" alt="Screenshot 2026-02-06 at 12 42 39 PM" src="https://github.com/user-attachments/assets/75a4f417-ec8c-489d-8af5-a8c7ba30e86b" />
<img width="1440" height="244" alt="Screenshot 2026-02-06 at 12 43 28 PM" src="https://github.com/user-attachments/assets/faffe101-d31d-4036-8c4a-f4a281407aa7" />




## Result
- Successfully executed Python application inside Docker container using volume mounting and interactive runtime execution.
## Conclusion
- This practical demonstrated advanced Docker usage including runtime file injection using volume mounts, which is widely used in real-world development environments.
