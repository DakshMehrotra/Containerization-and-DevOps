# Experiment 2: Docker Installation, Configuration, and Running Images

## Subject
Containerization and DevOps Lab

## Experiment Title
Docker Installation, Configuration, and Running Images

---

## Objective

The main objective of this experiment is to understand the basics of Docker and to perform essential container lifecycle operations.  
This experiment demonstrates how to:

- Verify Docker installation and configuration  
- Pull Docker images from Docker Hub  
- Run containers with port mapping  
- Verify container execution through browser  
- Stop and remove containers  
- Remove Docker images successfully  

---

## Requirements

### Software Required
- Docker Desktop (Installed and Running)
- Terminal (macOS/Linux) or Command Prompt (Windows)
- Web Browser

---

## Procedure and Implementation

---

### Step 1: Verify Docker Installation

To ensure Docker is installed correctly, the following command was executed:

docker --version

Docker system information was verified using:
docker info

### Step 2: Pull Docker Image (nginx)
The nginx image was downloaded from Docker Hub using:

docker pull nginx
This confirms successful image retrieval from the official repository.

### Step 3: View Downloaded Images
All available Docker images were listed using:

docker images
The nginx image appeared successfully in the local image repository.

### Step 4: Run Container with Port Mapping
A container was launched in detached mode with port mapping:

docker run -d -p 8080:80 nginx
Host Port: 8080
Container Port: 80
This allows nginx to be accessed locally through the browser.

### Step 5: Verify nginx Output in Browser
The container was tested by opening:

http://localhost:8080
The "Welcome to nginx!" page confirmed that the container was running properly.

### Step 6: List Running Containers
To verify the running container, the following command was executed:

docker ps
The nginx container was displayed with active port mapping.

### Step 7: Stop the Running Container
The container was stopped using:

docker stop <container_id>

### Step 8: Remove the Container
After stopping, the container was removed using:

docker rm <container_id>

### Step 9: Remove the Docker Image
The nginx image was deleted from the system using:

## Screenshots and Output
All screenshots captured during the experiment execution are attached below for verification:
Docker Version Check
Docker Info Output
Pull nginx Image
Image Listing
Container Run Command
Browser Output ("Welcome to nginx!")
Running Containers List
Stop and Remove Container
Image Removal Confirmation
docker rmi nginx

<img width="1440" height="753" alt="Screenshot 2026-01-31 at 8 24 08 AM" src="https://github.com/user-attachments/assets/643d66a9-76b6-49db-8e3d-862659551ba4" />
<img width="1440" height="391" alt="Screenshot 2026-01-31 at 8 29 04 AM" src="https://github.com/user-attachments/assets/7f03c600-9ff5-4747-948e-773bd0c86ada" />
<img width="1440" height="457" alt="Screenshot 2026-01-31 at 8 28 00 AM" src="https://github.com/user-attachments/assets/745c0757-ca3c-4220-8d28-7c1c0b24a612" />
<img width="1440" height="818" alt="Screenshot 2026-01-31 at 8 26 40 AM" src="https://github.com/user-attachments/assets/122b8d3a-20c2-40da-8c34-72c404f339f0" />
<img width="1234" height="57" alt="Screenshot 2026-01-31 at 8 27 06 AM" src="https://github.com/user-attachments/assets/7232ab2c-667e-440f-a76a-e5c814ad2164" />
<img width="1440" height="607" alt="Screenshot 2026-01-31 at 8 25 05 AM" src="https://github.com/user-attachments/assets/15331d08-fd84-49d2-a25c-99b8940eece2" />
<img width="1440" height="884" alt="Screenshot 2026-01-31 at 8 24 24 AM" src="https://github.com/user-attachments/assets/f859ebea-9bf1-44cb-8ca6-465aff1ab22b" />
<img width="1440" height="752" alt="Screenshot 2026-01-31 at 8 24 15 AM" src="https://github.com/user-attachments/assets/699c6b2f-e2f8-45ee-9271-65149a9bae28" />

## Result
Docker was successfully installed and verified.
The nginx image was pulled from Docker Hub, executed inside a container with port mapping, verified through browser access, and lifecycle commands such as stop, remove, and image deletion were performed successfully.

## Conclusion
This experiment provided practical understanding of Docker containerization.
It demonstrated how Docker simplifies application deployment by allowing lightweight, fast, and efficient container execution compared to traditional virtual machines.
Docker is highly suitable for modern DevOps workflows, microservices deployment, and scalable application environments.

## References
Docker Official Documentation: https://docs.docker.com/
nginx Docker Hub Image: https://hub.docker.com/_/nginx
Docker CLI Reference: https://docs.docker.com/engine/reference/commandline/docker/

