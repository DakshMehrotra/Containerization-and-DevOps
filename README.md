# Containerization and DevOps Lab Repository

Welcome to my **Containerization and DevOps** laboratory repository.

This repository contains all my **college-related coursework, lab experiments, practical implementations, class activities, documentation, and notes** for the subject **Containerization and DevOps**.

The main objective of this repository is to develop a strong understanding of how modern software applications are:

- Built and deployed efficiently  
- Containerized using Docker  
- Automated through DevOps workflows  
- Managed using industry-standard tools and practices  

This repository is maintained strictly for **academic submission and learning purposes**.

---

## Author Information

- **Name:** Daksh Mehrotra  
- **SAP ID:** 500125960  
- **Roll Number:** R2142231932  
- **Batch:** 2 CCVT  
- **Program:** B.Tech Student  
- **Repository Type:** College Lab + Class Work Submission  

---

## Purpose of This Repository

This repository is created as part of my official college laboratory coursework for:

**Containerization and DevOps**

It includes:

- Lab experiment implementations  
- Class practical activities  
- Teacher-guided command execution  
- Step-by-step documentation  
- Output screenshots  
- Observations and conclusions  
- Notes for concept understanding  

---

## Lab Experiments Included

### Experiment 1 — Virtual Machines vs Containers  
A DevOps-oriented comparison between Virtual Machines and Containers using:

- Ubuntu  
- VirtualBox  
- Vagrant  
- Docker  
- Nginx  

This experiment demonstrates:

- Infrastructure provisioning  
- VM-based deployment workflow  
- Containerized service execution  
- Architectural differences in isolation and performance  

Link: [Experiment 1 — Virtual Machines vs Containers](./Experiment-1/)

---

### Experiment 2 — Docker Installation & Container Lifecycle  
This experiment covers the fundamentals of Docker including:

- Pulling images  
- Running containers with port mapping  
- Verifying services in browser  
- Resolving port conflicts  
- Container start/stop/remove lifecycle commands  

Link: [Experiment 2 — Docker Installation & Container Lifecycle](./Experiment-2/)

### Experiment 3 — Custom Docker Images (Ubuntu & Alpine Based NGINX)
This experiment focuses on building custom Docker images using different Linux base images and deploying NGINX inside containers.
Base Images Used:
- Ubuntu 22.04
- Alpine Linux

This experiment demonstrates:
- Writing Dockerfiles for custom image creation
- Installing services inside containers (NGINX)
- Building Docker images using custom SAP-based tags
- Running multiple containers with different port mappings
- Comparing Ubuntu vs Alpine image size and performance
- Understanding lightweight container optimization

Key Implementation:
- Official NGINX container → Port 8080
- Ubuntu-based custom container → Port 8081
- Alpine-based custom container → Port 8082

Link: [Experiment 3 — Custom Docker Images (Ubuntu & Alpine Based NGINX)](./Experiment-3/)


## Class Practicals Included

### Class Practical — 21 January (DevOps Fundamentals & Setup)
A date-wise practical session focused on understanding and implementing core DevOps foundations through hands-on exercises using:
- Linux Environment
- Basic Shell Commands
- Docker Introduction
- Container Execution
- DevOps Workflow Setup

Link:
[Class Practical 21 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/21%20Jan%20Readme.md)

### Class Practical — 22 January (Docker Basics & Container Management)
A date-wise practical session focused on exploring Docker core concepts and managing containers through hands-on classroom implementation using:
- Docker CLI Commands
- Container Lifecycle Operations
- Image Pulling and Execution
- Basic Container Monitoring
- Practical DevOps Environment Setup

Link:
[Class Practical 22 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/22%20Jan%20Readme.md)

### Class Practical — 23 January (Docker Networking & Multi-Container Basics)
A date-wise practical session focused on understanding Docker networking concepts and working with multiple containers through hands-on classroom exercises using:
- Docker Network Commands
- Bridge Networking Mode
- Container-to-Container Communication
- Port Mapping and Exposure
- Multi-Service Deployment Basics

Link:
[Class Practical 23 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/23%20Jan%20Readme.md)

### Class Practical — 27 January (Docker Volumes & Persistent Storage)
A date-wise practical session focused on understanding Docker data persistence concepts and managing storage using hands-on classroom implementation through:
- Docker Volume Creation
- Persistent Data Handling
- Bind Mounts vs Volumes
- Container Storage Management
- Practical Stateful Container Setup

Link:
[Class Practical 27 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/27%20Jan%20Readme.md)

### Class Practical — 28 January (Docker Compose & Multi-Service Deployment)
A date-wise practical session focused on learning Docker Compose and deploying multi-container applications through structured classroom exercises using:
- Docker Compose YAML Configuration
- Multi-Container Service Setup
- Container Orchestration Basics
- Automated Service Deployment
- DevOps Application Structuring

Link:
[Class Practical 28 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/28%20Jan%20Readme.md)

### Class Practical — 30 January (Dockerfile Creation & Image Building)
A date-wise practical session focused on understanding Dockerfile instructions and building custom Docker images through hands-on classroom implementation using:
- Dockerfile Syntax and Commands
- Custom Image Creation
- Layer-Based Image Architecture
- Building and Running Containers from Images
- DevOps Application Packaging Workflow

Link:
[Class Practical 30 Jan](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/30%20Jan%20Readme.md)

### Class Practical — 3 Feb (Docker Installation Verification & Nginx Deployment)
A practical session focused on verifying Docker Desktop setup, testing Docker Engine connectivity through CLI and REST API, and deploying a production-ready Nginx container through hands-on implementation using:
- Docker Installation Verification (macOS Apple Silicon)
- Docker Engine & Daemon Connectivity Testing
- Docker CLI and REST API Container Inspection
- Unix Socket Communication with Docker Engine
- Nginx Container Pulling and Deployment
- Container Lifecycle Understanding (Create, Run, Inspect)
- DevOps Container Deployment Workflow

Link:
[Class Practical 3 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/3%20Feb%20Readme.md)

### Class Practical — 4 Feb (Docker Engine Configuration & Remote API Access)
A hands-on practical session focused on configuring Docker Engine, enabling Remote API communication, and validating daemon connectivity through CLI and UNIX socket testing using:
- Docker Engine Configuration using daemon.json
- Docker Remote API Enablement (TCP + UNIX Socket)
- Docker Installation & Engine Status Verification
- Docker CLI and CURL-Based API Testing
- Docker Daemon Connectivity Validation
- Sample Container Deployment (hello-world)
- Docker Client–Server Architecture Understanding
- DevOps Engine-Level Configuration Workflow
  
Link:
[Class Practical 4 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/4%20Feb%20Readme.md)

### Class Practical Test — 5 Feb (Containerizing Python SAP ID Verification Application)
A hands-on class test focused on containerizing a Python-based SAP ID verification application using Docker, demonstrating real-world application packaging and execution inside containers through implementation using:
- Official Docker Base Image (Python 3.10 Slim)
- Python Application Containerization Workflow
- Dependency Installation inside Container (NumPy)
- Custom Docker Image Building
- Interactive Container Execution
- Application Testing inside Container Environment
- Image vs Container Concept Understanding
- DevOps Application Packaging and Deployment Workflow

Link:
[Class Practical Test 5 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/5%20Feb(Class%20Test)%20Readme.md)

### Class Practical — 6 Feb (Running Python Application Using Docker Volume Mount (Continuous Runtime))
A hands-on practical session focused on executing a containerized Python application using Docker volume mounting for dynamic runtime execution, demonstrating real-world development workflow through implementation using:
- Official Docker Base Image (Python 3.10 Slim)
- Docker Volume Mounting (Host ↔ Container File Sharing)
- Runtime File Injection without Image Rebuild
- Continuous Input Execution using While Loop
- Interactive Container Runtime Testing
- Runtime Error Debugging (Missing File Handling)
- COPY vs Volume Mount Concept Understanding
- Real-World Containerized Development Workflow
  
Link:
[Class Practical 6 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Readme.md)

### Class Practical — 6 Feb Assignment (Running C Application Using Docker Volume Mount (Runtime Compilation & Continuous Execution))
A hands-on practical session focused on compiling and running a containerized C application using Docker volume mounting for dynamic runtime execution, demonstrating multi-language container workflows through implementation using:
- Official Docker Base Image (GCC Latest)
- Containerized C Program Compilation and Execution
- Docker Volume Mounting (Host ↔ Container File Sharing)
- Runtime Source Code Injection without Image Rebuild
- Continuous Input Execution using Infinite Loop
- Interactive Container Runtime Testing
- Build-Time vs Runtime Compilation Understanding
- Multi-Language Containerized Development Workflow

Link:
[Class Practical 6 Feb Assignment](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/6%20Feb%20Assignment%20Readme.md)

### Class Practical — 10 Feb (C Application Containerization & Optimization)
A hands-on practical series focused on building, running, and optimizing containerized C applications using Docker. This included runtime execution using volume mounts and production-level image optimization using multi-stage builds and minimal scratch runtime images. The practical demonstrated real-world container development workflows through implementation using:
- Official Docker Base Images (Ubuntu, GCC Toolchain)
- Containerized C Program Compilation and Execution
- Docker Volume Mounting (Host ↔ Container Runtime Source Injection)
- Runtime Compilation and Continuous Execution using Infinite Loop
- Interactive Container Testing using Terminal Input
- Build-Time vs Runtime Execution Understanding
- Multi-Stage Docker Build Optimization
- Static Binary Compilation for Minimal Containers
- Scratch-Based Ultra-Lightweight Production Images
- Multi-Language Containerized Development Workflow (Python + C)

Link:
[Class Practical 10 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Readme.md)

### Class Practical — 10 Feb Assignment (Multi-Stage Build for Java Application with Secure Runtime Container)
A hands-on practical session focused on implementing enterprise-grade Docker container build workflows using multi-stage builds for Java applications. This practical demonstrated real-world production container optimization by separating build and runtime environments, reducing image size, and improving container security using non-root user implementation through execution using:
- Docker Engine & Environment Verification (docker --version, docker ps, docker images)
- Java Project Structure Creation Using Maven Standards
- Java Application Compilation Using Maven Build Tool
- Multi-Stage Dockerfile Implementation (Builder Stage + Runtime Stage)
- Builder Environment Using Maven + OpenJDK for Application Compilation
- Runtime Environment Using Production-Ready Eclipse Temurin JRE Base Image
- Copying Only Compiled Application Artifacts (JAR) to Runtime Container
- Secure Container Execution Using Non-Root User Configuration
- Docker Image Build Using Multi-Stage Optimization
- Docker Image Size Verification and Runtime Optimization Comparison 
- Running Java Application Inside Optimized Runtime Container
- Docker Image Layer Analysis Using docker history Command
- Understanding Builder Layer Removal in Final Runtime Image
- BuildKit Layer Caching and Container Layer Optimization Understanding
- Production Container Security and Enterprise Container Design Workflow

Link:
[Class Practical 10 Feb Assignment](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/10%20Feb%20Assignment%20Readme.md)


### Class Practical — 11 Feb (Docker Volume Management & Data Persistence)
A hands-on practical session focused on implementing Docker storage mechanisms using named volumes and bind mounts to enable persistent data management between host and container environments. This practical demonstrated real-world container storage workflows through implementation using:
- Docker Engine & Environment Verification (docker info, docker images)
- Docker Named Volume Creation and Management
- Docker Volume Listing and Inspection
- Running Containers with Named Volumes
- Container ↔ Volume Data Persistence Testing
- Writing and Reading Files Inside Container Storage
- Bind Mount Implementation (Host Directory ↔ Container Directory Mapping)
- Runtime File Creation and Host-Level Verification
- Temporary Container Execution using --rm
- Linux File System Navigation Inside Containers
- Container Data Lifecycle and Persistence Understanding
- Real-World DevOps Storage Workflow Implementation

Link:
[Class Practical 11 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/11%20Feb%20Readme.md)


### Class Practical — 11 Feb Assignment (Volume Backup, Restore & Inspection Using TAR & Named Volumes)
A hands-on practical session focused on implementing advanced Docker storage management by performing volume data backup, restoration, and inspection using TAR-based archival and named Docker volumes. This practical demonstrated real-world container storage backup and disaster recovery workflows through implementation using:
- Docker Engine & Environment Verification (docker --version, docker info, docker volume ls)
- Docker Named Volume Creation and Management
- Running Containers with Named Volumes for Persistent Storage
- Writing and Verifying Data Inside Docker Volume Storage
- Volume Data Backup Using TAR Archive Utility
- Bind Mount Backup Directory Implementation (Host ↔ Container Mapping)
- Volume Deletion to Simulate Production Data Loss Scenario
- Volume Recreation and Data Restoration from Backup Archive
- Restored Data Verification Inside Container Environment
- Docker Volume Metadata Inspection Using docker volume inspect
- Backup Storage Size Verification Using Linux Disk Usage Commands
- Understanding Docker Volume Mountpoints and Storage Locations
- Container Storage Backup and Disaster Recovery Workflow Simulation
- Real-World DevOps Storage Backup and Recovery Implementation
  
Link:
[Class Practical 12 Feb](https://github.com/DakshMehrotra/Containerization-and-DevOps/blob/main/Class%20Practical/12%20Feb%20Readme.md)




---

## Topics Covered

This repository includes both theoretical understanding and hands-on implementation of:

---

### Containerization (Docker)

- Introduction to containerization  
- Virtual Machines vs Containers  
- Docker architecture and components  
- Working with Docker images and containers  
- Writing Dockerfiles  
- Essential Docker commands:

  - `docker build`  
  - `docker run`  
  - `docker ps`  
  - `docker exec`  
  - `docker logs`  
  - `docker stop`  

- Docker networking and storage volumes  
- Introduction to Docker Compose  

---

## Academic Declaration
This repository is maintained as part of my official college coursework submission.
All practical work has been performed, documented, and organized according to university laboratory requirements under the subject:
Containerization and DevOps

## Submission Note
Each experiment folder contains:
- Objective
- Procedure and commands
- Output screenshots
- Observations
- Conclusion
This repository serves as a complete academic record of my practical learning.
