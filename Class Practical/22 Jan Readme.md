## Title
**Docker Version Verification, Container Lifecycle, Image Pulling and Removal on macOS**

---

## Objective of the Experiment

- Verify Docker client and server versions  
- Understand Docker daemon connectivity  
- Execute Docker test container (`hello-world`)  
- List available Docker images  
- Pull Ubuntu image from Docker Hub  
- View running/exited containers  
- Launch Ubuntu containers interactively  
- Manage container lifecycle (start/stop/remove)  
- Remove unused Docker images safely  

---

## Tools & Requirements

| Component | Description |
|----------|-------------|
| Docker Desktop | Container runtime engine |
| Terminal (zsh) | Command-line interface |
| Ubuntu Image | Linux container environment |
| Docker Hub | Public image repository |

---

---

# Execution Steps

---

### Step 1: Checking Docker Version Information**

Docker version was verified using:
- docker version

### Step 2: Docker Daemon Connection Issue & Fix
- Initially, Docker returned:
failed to connect to the Docker API
- dial unix docker.sock: no such file or directory

Cause:
- Docker Desktop daemon was not running.

Then, applied:
- open -a Docker -> After starting Docker Desktop, commands worked correctly.

### Step 3: Viewing Docker System Information
System-wide Docker details were checked using:
- docker info
This shows:
- Running containers
- Installed plugins
- Storage driver
- CPU/Memory allocated
- OS type and architecture

### Step 4: Running Docker Test Container
To confirm successful operation:
- docker run hello-world

Output confirms:
- Docker daemon is running
- Image pulled successfully
- Container executed properly

### Step 5: Listing Docker Images
To view images present locally:
- docker images

### Step 6: Pulling Ubuntu Image from Docker Hub
Ubuntu image was downloaded using:
- docker pull ubuntu

### Step 7: Running Ubuntu Container
To start an Ubuntu container:
- docker run -it ubuntu bash

###Step 8: Viewing Active and Exited Containers
To list running containers:
- docker ps

To list all containers (including stopped ones):
- docker ps -a

### Step 9: Removing Containers
Stopped containers were removed using:
- docker rm <container_id>

### Step 10: Removing Images
Images were removed using:
- docker rmi <image_id>

<img width="1440" height="353" alt="Screenshot 2026-01-22 at 10 47 02 AM" src="https://github.com/user-attachments/assets/9e809d8f-7149-479a-96c1-95a7718af96a" />
<img width="1440" height="900" alt="Screenshot 2026-01-22 at 10 45 37 AM" src="https://github.com/user-attachments/assets/4ae6cc52-cf8a-4f78-8bc7-56ecc8b59f86" />
<img width="1440" height="424" alt="Screenshot 2026-01-22 at 10 37 29 AM" src="https://github.com/user-attachments/assets/cf2d1c3f-efff-4aa8-8f83-9f84380b5ec6" />
<img width="1440" height="343" alt="Screenshot 2026-01-22 at 10 32 41 AM" src="https://github.com/user-attachments/assets/03501007-1e0e-45fa-92ed-e184ee68fbe6" />
<img width="1440" height="447" alt="Screenshot 2026-01-22 at 10 27 39 AM" src="https://github.com/user-attachments/assets/8caf3211-089a-4e6e-a243-29cef8d56192" />
<img width="1440" height="900" alt="Screenshot 2026-01-22 at 10 19 01 AM" src="https://github.com/user-attachments/assets/5ce074b4-39ee-4c69-a6d2-7f6d096f2cfa" />
<img width="1440" height="900" alt="Screenshot 2026-01-22 at 10 16 05 AM" src="https://github.com/user-attachments/assets/4b9cdaa0-97ad-4cb6-a0c8-c403ae1677f0" />
<img width="1440" height="900" alt="Screenshot 2026-01-22 at 10 16 04 AM" src="https://github.com/user-attachments/assets/90c155e0-b964-4e2b-b91a-7d25b18944a5" />

## Results
- Docker client/server setup verified successfully
- Docker daemon connectivity issue resolved
- Ubuntu container executed interactively
- Images and containers were managed correctly
- Docker cleanup commands (rm, rmi) were tested successfully


## Conclusion
- This experiment provided practical exposure to Docker container lifecycle management.
- It covered Docker installation verification, image pulling, container execution, monitoring, and removal.
- Docker proves to be an efficient solution for running lightweight Linux environments on macOS without virtual machines.
