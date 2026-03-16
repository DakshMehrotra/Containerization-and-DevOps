# Containerized Web Application with PostgreSQL using Docker Compose and IPVLAN

## Overview

This project demonstrates a **containerized full-stack web application** using Docker.
It includes a **frontend, backend API, and PostgreSQL database**, orchestrated with **Docker Compose** and connected through an **IPVLAN network with static IP addresses**.

The project demonstrates **Docker image optimization techniques**, comparing:

* Optimized build (Alpine + Multi-stage)
* Non-optimized build (Standard images) -> Just for backend image 

This project fulfills the requirements of the **Containerization and DevOps assignment**.

---

# Architecture

```
Client Browser
      │
      ▼
Frontend Container (Nginx)
172.24.10.30
      │
      ▼
Backend API Container (Node.js + Express)
172.24.10.20
      │
      ▼
PostgreSQL Container
172.24.10.10
```

All services communicate through a custom **IPVLAN network**.

---

# Project Structure

```
containerized-webapp
│
├── backend
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── .dockerignore
│
├── database
│   ├── Dockerfile
│   └── init.sql
│
├── frontend
│   ├── Dockerfile
│   └── index.html
│
├── docker-compose.yml
├── docker-compose-unoptimized.yml
├── README.md
└── DELIVERABLES.md
```

---

# Technology Stack

| Component        | Technology        |
| ---------------- | ----------------- |
| Frontend         | HTML + Nginx      |
| Backend          | Node.js + Express |
| Database         | PostgreSQL        |
| Containerization | Docker            |
| Orchestration    | Docker Compose    |
| Networking       | IPVLAN            |

---

# Docker Image Optimization

The project demonstrates Docker optimization techniques:

### Optimized Build

* Alpine base images
* Multi-stage builds
* Non-root user
* Minimal layers

### Non-Optimized Build

* Standard images
* Single stage builds
* Larger image sizes

---

# Create Network (Required)

Create IPVLAN network manually:

```bash
docker network create -d ipvlan \
--subnet=172.24.0.0/16 \
--gateway=172.24.0.1 \
-o parent=eth0 \
mynet
```

Verify:

```bash
docker network inspect mynet
```
![net](images/net.png)

---

# Build and Run the Application

### Build Containers

```
docker compose build
```

### Start Containers

```
docker compose up -d
```

### Check Running Containers

```
docker ps
```
![dockerPs](images/dockerPs.png)

---

# Container IP Addresses

| Service    | IP           |
| ---------- | ------------ |
| PostgreSQL | 172.24.10.10 |
| Backend    | 172.24.10.20 |
| Frontend   | 172.24.10.30 |

---

# API Endpoints

### Health Check

```
GET /health
```

Example:

```
http://localhost:5000/health
```

Response

```json
{
"status":"OK"
}
```

---

### Insert Task

```
POST /tasks
```

Example request:

```json
{
  "title": "Finish DevOps assignment",
  "priority": "medium"
}
```

---

### Fetch Tasks

```
GET /tasks
```

Response

```json
GET /tasks[
  {
    "id": 1,
    "title": "Finish DevOps assignment",
    "priority": "medium",
    "status": "todo",
    "created_at": "2026-03-15T10:30:00.000Z"
  }
]
```

---

# Testing API using curl

# Application Usage

The application can be accessed through the frontend interface.

Open the frontend in a browser:

http://172.24.10.30

The interface provides a **Kanban-style task management board** that allows users to manage tasks visually.

Users can:

• Create new tasks  
• Assign task priority (Low, Medium, High)  
• View tasks organized in a Kanban board  
• Move tasks between **Todo, In Progress, and Done**  
• Delete tasks  
• Search tasks  
• Filter tasks by **priority or status**  
• View real-time task statistics and completion rate  

---

# Creating a Task

Steps:

1. Open the frontend page.
2. Enter a task description in the **task input field**.
3. Select a **priority level**:
   - Low
   - Medium
   - High
4. Click the **+ ADD** button.
5. The frontend sends a **POST request** to the backend API.
6. The backend stores the task in the PostgreSQL database.
7. The task appears in the **Todo column**.

---

# Updating Task Status

Tasks can move through three workflow stages:

• Todo  
• In Progress  
• Done  

Steps:

1. Locate a task card on the board.
2. Use the **status buttons on the card**.
3. Select the desired status.
4. The frontend sends a **PATCH request** to the backend API.
5. The backend updates the task status in PostgreSQL.
6. The UI refreshes and moves the task to the corresponding column.

---

# Deleting a Task

Steps:

1. Locate the task card.
2. Click the **delete (×) button**.
3. The frontend sends a **DELETE request** to the backend API.
4. The backend removes the task from PostgreSQL.
5. The task disappears from the board.

---

# Searching and Filtering Tasks

The interface supports dynamic filtering.

Users can:

• Search tasks using the **search bar**  
• Filter tasks by **priority**:
  - High
  - Medium
  - Low

• Filter tasks by **status**:
  - Todo
  - In Progress
  - Done

The frontend sends filtered requests to the backend API and updates the board dynamically.

---

# Task Statistics Dashboard

The sidebar provides real-time task statistics including:

• Total tasks  
• High priority tasks  
• Pending tasks  
• Completed tasks  

A **completion ring** visually displays the percentage of tasks completed.

# Health Check

The frontend also provides a **Health Check button**.

When clicked:

Frontend → sends request to backend `/health` endpoint.

Expected response:

{
  "status": "OK"
}

This confirms the backend service is operational.

![web](images/web.png)

---

# Volume Persistence Test

Check volume:

```
docker volume ls
```
![vol](images/vol.png)


Enter data to volume through frontend:

![BeforeDown](images/BeforeDown.png)

Stop containers:

```
docker compose down
```

Restart:

```
docker compose up -d
```
![down](images/down.png)

Verify previously inserted data still exists.

![AfterDown](images/AfterDown.png)

---

# Image Size Comparison

Check image sizes:

Create one stack with Alpine and multi-stage dockerfile named as opimizedsize_backend and other with no Alpine and single-stage named as normal_backend.

```
docker images
```

![size](images/size.png)

We can see that opimizedsize_backend has less size than normal_backend.

---

# macvlan vs ipvlan Comparison

| Feature            | Macvlan               | Ipvlan                   |
| ------------------ | --------------------- | ------------------------ |
| MAC Address        | Unique per container  | Shared                   |
| Host communication | Not allowed           | Allowed                  |
| Performance        | Good                  | Better                   |
| Use case           | LAN device simulation | Virtualized environments |

IPVLAN was selected due to compatibility with virtualized environments like **WSL2**.

---

# Screenshots

## Network Inspect

![Network Inspect](images/net.png)

## Running Containers

![Docker PS](images/dockerPs.png)

## Frontend UI

![Frontend UI](images/web.png)


---

# Key Concepts Demonstrated

* Docker multi-stage builds
* Container networking with IPVLAN
* Static IP assignment
* Docker Compose orchestration
* Persistent storage using volumes
* Image optimization techniques

---

# Author

- Daksh Mehrotra 
- 500125960
- Batch 2 CCVT
