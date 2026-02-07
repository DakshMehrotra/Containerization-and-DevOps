## Experiment 3: Building and Running Custom Docker Images (Ubuntu & Alpine Based NGINX)
## Subject
Containerization and DevOps Lab
## Dated
7th Feb 2026
## Objective
The main objective of this experiment is to understand how to create custom Docker images using different base images and run containers from them.
This experiment demonstrates how to:
- Create custom Docker images using Dockerfile
- Use Ubuntu and Alpine as base images
- Install NGINX inside custom images
- Build Docker images using custom tags
- Run containers with port mapping
- Compare image size and performance differences
- Verify container output through browser

## Requirements
Software Required
- Docker Desktop (Installed and Running)
- Terminal (macOS/Linux) or Command Prompt (Windows)
- Web Browser

## Procedure and Implementation

### Step 1: Verify Docker Installation
To ensure Docker was installed correctly, the following commands were executed:
- docker --version
- docker info

### Step 2: Pull Official NGINX Image
The official nginx image was pulled from Docker Hub:
- docker pull nginx:latest

### Step 3: Tag Image Using SAP Naming Convention
The official image was tagged using SAP ID for identification:
- docker tag nginx:latest nginx-500125960-official

### Step 4: Run Official NGINX Container
- docker run -d -p 8080:80 --name nginx-500125960-official-container nginx-500125960-official
This allows nginx to be accessed locally through the browser.

### Step 5: Verify Output in Browser
Opened in browser:
- http://localhost:8080
The "Welcome to nginx!" page confirmed successful execution.

## Part 2: Custom Ubuntu Based NGINX Image

### Step 6: Create Project Directory
- mkdir nginx-500125960
- cd nginx-500125960
- mkdir ubuntu
- cd ubuntu

### Step 7: Create Dockerfile (Ubuntu Base Image)
- FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

### Step 8: Build Ubuntu Custom Image
- docker build -t nginx-500125960-ubuntu .

### Step 9: Run Ubuntu Container
- docker run -d -p 8081:80 --name nginx-500125960-ubuntu-container nginx-500125960-ubuntu

### Step 10: Verify Ubuntu Container Output
- http://localhost:8081

## Part 3: Custom Alpine Based NGINX Image

### Step 11: Create Alpine Directory
- cd ..
- mkdir alpine
- cd alpine

### Step 12: Create Dockerfile (Alpine Base Image)
- FROM alpine:latest

- RUN apk add --no-cache nginx

- EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

### Step 13: Build Alpine Custom Image
- docker build -t nginx-500125960-alpine .

### Step 14: Run Alpine Container
- docker run -d -p 8082:80 --name nginx-500125960-alpine-container nginx-500125960-alpine

### Step 15: Verify Alpine Container Output
- http://localhost:8082

### Step 16: Verify Running Containers
- docker ps
All three containers were visible with correct port mapping.

## Screenshots and Output
All screenshots captured during experiment execution are attached below:
- Docker Version Check
- Pull Official NGINX Image
- Dockerfile (Ubuntu)
- Docker Build Ubuntu Image
- Dockerfile (Alpine)
- Docker Build Alpine Image
- Container Run Commands
- Browser Output for Ports 8080, 8081, 8082
- Docker PS Output

<img width="1440" height="210" alt="Screenshot 2026-02-07 at 9 34 10 AM" src="https://github.com/user-attachments/assets/4aac78f4-028b-4846-8d1e-c7e6a8115378" />
<img width="1440" height="233" alt="Screenshot 2026-02-07 at 9 42 34 AM" src="https://github.com/user-attachments/assets/b5515dc9-6c2b-483b-99c1-6651a842048b" />
<img width="1440" height="900" alt="Screenshot 2026-02-07 at 9 42 41 AM" src="https://github.com/user-attachments/assets/a3154838-78fd-48ce-98fb-bd71926b0ed1" />
<img width="1440" height="370" alt="Screenshot 2026-02-07 at 9 42 58 AM" src="https://github.com/user-attachments/assets/93d006df-a68c-48b0-9c67-0a7a15ae76e0" />
<img width="1440" height="169" alt="Screenshot 2026-02-07 at 9 43 58 AM" src="https://github.com/user-attachments/assets/b1fd414d-7841-41b1-8b49-d239e3499a7c" />
<img width="1440" height="900" alt="Screenshot 2026-02-07 at 9 44 19 AM" src="https://github.com/user-attachments/assets/e6340d16-ddb7-40df-a1ae-61e77c83debd" />
<img width="1440" height="400" alt="Screenshot 2026-02-07 at 9 45 36 AM" src="https://github.com/user-attachments/assets/e3ba1323-d386-4d74-8e15-2e7afdc1490e" />
<img width="1440" height="900" alt="Screenshot 2026-02-07 at 9 46 27 AM" src="https://github.com/user-attachments/assets/6e407810-248f-4c62-a014-24a3d030c3f9" />
<img width="1438" height="103" alt="Screenshot 2026-02-07 at 9 47 51 AM" src="https://github.com/user-attachments/assets/64396cc8-8518-414a-b0e0-249043383e87" />
<img width="1440" height="900" alt="Screenshot 2026-02-07 at 9 48 05 AM" src="https://github.com/user-attachments/assets/1ddea4c0-ccaf-4aae-9dd3-dc74d8d8236e" />
<img width="1440" height="395" alt="Screenshot 2026-02-07 at 9 53 40 AM" src="https://github.com/user-attachments/assets/ee90aff3-7b39-4639-ba0e-bba20dbf86b1" />
<img width="1440" height="245" alt="Screenshot 2026-02-07 at 9 53 53 AM" src="https://github.com/user-attachments/assets/2803d971-5a9d-456a-b532-6b0d5b38ee8c" />
<img width="1440" height="143" alt="Screenshot 2026-02-07 at 9 54 20 AM" src="https://github.com/user-attachments/assets/5a5dae47-aabd-4bdc-804f-b5439492d1f3" />
<img width="1439" height="70" alt="Screenshot 2026-02-07 at 9 55 35 AM" src="https://github.com/user-attachments/assets/e40eb6e6-be89-477f-b90f-f085bbb57a8b" />
<img width="1440" height="122" alt="Screenshot 2026-02-07 at 9 55 53 AM" src="https://github.com/user-attachments/assets/b79bed5c-8c4c-455d-8f46-97f01b450bb6" />

## Result
- Custom Docker images were successfully created using Ubuntu and Alpine base images.
- NGINX was installed and executed inside both containers.
- Containers were successfully accessed through browser using port mapping.
- SAP-based naming convention was applied to all images and containers.

## Conclusion
- This experiment demonstrated how custom Docker images can be built using different base images.
- Ubuntu-based images provide flexibility and full Linux environment support, while Alpine-based images are lightweight and efficient.
- Docker enables efficient application deployment, faster builds, and better resource utilization, making it essential for modern DevOps and microservices architecture.

## References
Docker Official Documentation:
- https://docs.docker.com/
NGINX Docker Hub Image:
- https://hub.docker.com/_/nginx
Dockerfile Reference:
- https://docs.docker.com/engine/reference/builder/
