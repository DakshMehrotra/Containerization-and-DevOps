#  Experiment 6: Docker Run vs Docker Compose

##  Objective

To understand and compare the **imperative approach (docker run)** and the **declarative approach (Docker Compose)**, and to deploy both single-container and multi-container applications.

---

##  Prerequisites

- Docker installed (Docker Desktop for Mac M1)
- Docker Compose (comes with Docker)
- Basic knowledge of containers and terminal

---

##  Project Structure
```
Experiment6/
│
├── docker-compose-files/
├── screenshots/
├── answers.txt
└── README.md
```
--- 


---

##  Part A – Theory

###  Docker Run (Imperative)

- Uses command-line flags
- Step-by-step execution
- Example:

```bash
docker run -d -p 8080:80 nginx

```

### Docker Compose (Declarative)
- Uses YAML configuration
- Defines desired system state
- Example:
```
docker compose up -d
```

### Key Differences
| Feature         | Docker Run | Docker Compose |
| --------------- | ---------- | -------------- |
| Approach        | Imperative | Declarative    |
| Configuration   | CLI flags  | YAML file      |
| Multi-container | Difficult  | Easy           |
| Reusability     | Low        | High           |


### Advantages of Docker Compose
- Simplifies multi-container setups
- Easy to maintain and version control
- Single command lifecycle management
- Supports scaling

---

### Part B – Practical Tasks
Task 1: Single Container (Nginx)
Using Docker Run
```
docker run -d --name lab-nginx -p 8081:80 nginx:alpine
```
Using Docker Compose
```
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: lab-nginx
    ports:
      - "8081:80"

```
Task 2: Multi-Container (WordPress + MySQL)
Using Docker Run
- Created custom network
- Connected MySQL and WordPress containers
- Using Docker Compose

```
services:
  db:
    image: mysql:5.7

  wordpress:
    image: wordpress:latest
    depends_on:
      - db
```

### Part C – Conversion Tasks

1. Problem 1: Docker Run → Compose
```
services:
  webapp:
    image: node:18-alpine
    container_name: webapp
    ports:
      - "5000:5000"
    environment:
      APP_ENV: production
      DEBUG: "false"
    restart: unless-stopped
```
2. Problem 2: Volume + Network
Defined:
- Named volume (pgdata)
- Custom network (app-net)
- Multiple services

Task 4 – Resource Limits
```
deploy:
  resources:
    limits:
      memory: 256M
      cpus: '0.5'
```
- Works only in Docker Swarm
- Ignored in normal Docker Compose
- Swarm supports:
- Load balancing
- Auto-healing
- Scaling

Task 5 – Dockerfile + Compose Build
Dockerfile
```
FROM node:18-alpine

WORKDIR /app
COPY app.js .

CMD ["node", "app.js"]
```
Compose
```
services:
  nodeapp:
    build: .
    ports:
      - "3000:3000"
```

---

## image vs build
| Feature     | image         | build            |
| ----------- | ------------- | ---------------- |
| Source      | Docker Hub    | Local Dockerfile |
| Flexibility | Low           | High             |
| Use Case    | Prebuilt apps | Custom apps      |


---

Task 6 – Multi-Stage Build
Example
```
FROM node:18-alpine AS builder

WORKDIR /app
COPY app.js .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app .

CMD ["node", "app.js"]
```

### Benefits
- Smaller image size
- Better performance
- Cleaner production builds

## Experiment 6B – WordPress Deployment
Features
- Multi-container setup
- Persistent volumes
- Internal networking
- Service dependency (depends_on)

### Run Application
``` docker compose up -d ```

### Access
``` http://localhost:8080```

### Volumes
``` docker volume ls```

### Stop
``` docker compose down``` 

---

## Screenshots
- Docker installation verification
- Running containers (docker ps)
- Browser outputs
- Compose outputs
- Volume listings


<img width="1439" height="696" alt="Screenshot 2026-04-10 at 11 05 14 PM" src="https://github.com/user-attachments/assets/6bf58c6e-f685-4f42-9af2-3481740e9dde" />
<img width="1440" height="385" alt="Screenshot 2026-04-10 at 11 05 21 PM" src="https://github.com/user-attachments/assets/06499e3d-95ca-4f77-98ee-ce68feb84019" />
<img width="1210" height="808" alt="Screenshot 2026-04-10 at 11 05 34 PM" src="https://github.com/user-attachments/assets/d5f66d79-47f5-4bac-bc1d-693d52b64077" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 07 10 PM" src="https://github.com/user-attachments/assets/e82692a6-84d1-4b1a-bb37-ae1dcfac1e9c" />
<img width="1440" height="116" alt="Screenshot 2026-04-10 at 11 07 32 PM" src="https://github.com/user-attachments/assets/9e0d5bd3-96cc-43fb-9042-844cec3410a2" />
<img width="1440" height="349" alt="Screenshot 2026-04-10 at 11 08 36 PM" src="https://github.com/user-attachments/assets/7b80cbb2-89a5-4f59-9212-33fd8588b22a" />
<img width="1059" height="778" alt="Screenshot 2026-04-10 at 11 11 07 PM" src="https://github.com/user-attachments/assets/edb8ace5-ddeb-4c4d-99f6-e797d881978f" />
<img width="982" height="797" alt="Screenshot 2026-04-10 at 11 11 34 PM" src="https://github.com/user-attachments/assets/96a9c8ec-3c12-4886-9b5f-ee375480c6a1" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 14 45 PM" src="https://github.com/user-attachments/assets/833a5b92-cc8f-4ed1-88eb-96b7bda39268" />
<img width="1440" height="536" alt="Screenshot 2026-04-10 at 11 18 26 PM" src="https://github.com/user-attachments/assets/a66fa0e6-0971-4de7-be45-d1c5fe3f003a" />
<img width="1440" height="210" alt="Screenshot 2026-04-10 at 11 20 02 PM" src="https://github.com/user-attachments/assets/d31ad61d-63f0-426c-a1ac-ec4296d2e791" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 21 00 PM" src="https://github.com/user-attachments/assets/491cba37-fdb0-4ce1-aae2-4c495996e3d9" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 25 47 PM" src="https://github.com/user-attachments/assets/12e3366a-676b-4af8-a245-b82a419c929f" />
<img width="1440" height="333" alt="Screenshot 2026-04-10 at 11 26 01 PM" src="https://github.com/user-attachments/assets/4949f291-129e-40b7-b156-eceb2683d826" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 27 34 PM" src="https://github.com/user-attachments/assets/0905206f-1b5e-4e5c-9b0a-f8d3dcd30d89" />
<img width="1439" height="334" alt="Screenshot 2026-04-10 at 11 27 53 PM" src="https://github.com/user-attachments/assets/72626c2f-3f15-4496-be9f-761adcacd211" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 28 22 PM" src="https://github.com/user-attachments/assets/bb09b113-4eb3-4468-bf5b-8be446653ec5" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 29 15 PM" src="https://github.com/user-attachments/assets/0e3f4461-22dd-4d92-947a-4ce929888236" />
<img width="1439" height="687" alt="Screenshot 2026-04-10 at 11 30 46 PM" src="https://github.com/user-attachments/assets/78585238-c320-48d2-837f-aff4a4066315" />
<img width="1210" height="814" alt="Screenshot 2026-04-10 at 11 31 01 PM" src="https://github.com/user-attachments/assets/ad10cc00-ae27-4649-928a-f3aca2375a88" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 33 55 PM" src="https://github.com/user-attachments/assets/5ef3879a-9b61-4955-9655-9cb69cf5916f" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 34 10 PM" src="https://github.com/user-attachments/assets/34001730-5394-4d33-85a2-3b6e97165502" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 34 37 PM" src="https://github.com/user-attachments/assets/153835f8-6179-4eb3-9360-cc0c2268eed0" />
<img width="1440" height="850" alt="Screenshot 2026-04-10 at 11 38 41 PM" src="https://github.com/user-attachments/assets/41c4fcc1-82a5-473e-87cf-cf7f7481ae95" />
<img width="1440" height="675" alt="Screenshot 2026-04-10 at 11 39 43 PM" src="https://github.com/user-attachments/assets/a5cd2592-6bff-464b-8a62-f571aa84f923" />
<img width="1210" height="817" alt="Screenshot 2026-04-10 at 11 40 46 PM" src="https://github.com/user-attachments/assets/6e81070f-c800-4058-9a43-01225c9eb0cb" />
<img width="1431" height="739" alt="Screenshot 2026-04-10 at 11 41 11 PM" src="https://github.com/user-attachments/assets/ecbea0dd-0eee-4ef7-91ff-74b3eb2c94f4" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 42 46 PM" src="https://github.com/user-attachments/assets/035ccf98-bbae-4029-bc44-011b3ef3fcfa" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 43 07 PM" src="https://github.com/user-attachments/assets/8b8ed6bf-0419-4776-84da-557907e83310" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 43 25 PM" src="https://github.com/user-attachments/assets/4483a246-af42-44b5-a7f7-8e05211ff6c0" />
<img width="1210" height="812" alt="Screenshot 2026-04-10 at 11 43 51 PM" src="https://github.com/user-attachments/assets/c1a64457-9af8-4874-a595-e517d69aa6da" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 44 13 PM" src="https://github.com/user-attachments/assets/7a07ac6d-88ae-403e-995c-6ce18e6d2148" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 46 09 PM" src="https://github.com/user-attachments/assets/6dd05474-af31-404b-adf5-3c37a4e35ab6" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 46 37 PM" src="https://github.com/user-attachments/assets/e60e2b35-3694-4e16-bc89-bbd43d01440d" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 46 40 PM" src="https://github.com/user-attachments/assets/51e36890-204d-4f8d-aec2-eaa0e9a6ba17" />
<img width="1141" height="811" alt="Screenshot 2026-04-10 at 11 47 11 PM" src="https://github.com/user-attachments/assets/f6f7d258-344c-45ae-b555-fe9845354682" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 48 02 PM" src="https://github.com/user-attachments/assets/f53952ae-c306-41a0-9e7c-d8d965706b14" />
<img width="1440" height="900" alt="Screenshot 2026-04-10 at 11 48 05 PM" src="https://github.com/user-attachments/assets/f36457e6-601d-4496-b452-1fe423fcb487" />






---

### Common Errors
- Port already in use
- YAML indentation issues
- Container name conflicts
- Not removing old containers

---

## Conclusion
Docker Compose provides a declarative, scalable, and maintainable way to manage containerized applications compared to the imperative docker run approach. It simplifies multi-container deployments and improves reproducibility, making it ideal for development and testing environments.

---

## Learning Outcomes
- Understood Docker Run vs Compose
- Built single and multi-container applications
- Converted commands to Compose
- Used Dockerfile with Compose
- Learned basics of container orchestration

---



