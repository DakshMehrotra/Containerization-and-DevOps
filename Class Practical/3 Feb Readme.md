## Docker Installation Verification + Docker Engine API Testing + Nginx Container Deployment


## Aim
The objective of this practical is to:
Start and verify Docker Desktop setup on macOS (Apple Silicon)
Confirm Docker Engine is running correctly
Test Docker daemon connectivity through Unix socket
Inspect Docker containers and images using Docker CLI and REST API
Pull and deploy an Nginx web server container successfully
Understand container lifecycle (create, run, inspect)

## Software and Tools Used
Operating System: macOS (Apple Silicon ARM64)
Docker Desktop Version: 4.57.0
Docker Engine Version: 29.1.3
Docker API Version: v1.52
Base Image Used: Nginx (latest)
Terminal: zsh (macOS)

## Workflow / Procedure
### Step 1: Starting Docker Desktop
Docker Desktop was launched using:
- open -a Docker
This ensured that the Docker daemon started successfully in the background.

### Step 2: Verifying Docker Installation
Docker installation and configuration were verified using:
- docker --version
- docker info

This confirmed:
- Docker Client is installed
- Docker Server is running
- Engine and plugins are active

### Step 3: Checking Running Containers
To list active containers:
- docker ps
Output showed that currently no containers were running.

### Step 4: Verifying Docker Socket Connectivity
Docker communicates through a Unix socket on macOS:
- ls -l /var/run/docker.sock
Then Docker daemon health was tested using:
- curl --unix-socket /var/run/docker.sock http://localhost/_ping
Output:
- OK
This confirmed Docker Engine is responding correctly.

### Step 5: Checking Docker Version via REST API
Docker Engine version was fetched directly through API:
- curl --unix-socket /var/run/docker.sock http://localhost/version
This returned complete JSON version information of Docker Engine and components.

### Step 6: Listing Containers Using Docker REST API
All active containers were fetched using:
- curl --unix-socket /var/run/docker.sock \
- http://localhost/v1.52/containers/json
Then all containers including stopped ones:
- curl --unix-socket /var/run/docker.sock \
= "http://localhost/v1.52/containers/json?all=true"

This displayed detailed metadata including:
- Container IDs
- Image names
- Status (Exited/Running)
- Container names

### Step 7: Pulling Nginx Image from Docker Hub
The Nginx image was downloaded using:
- docker pull nginx
Docker successfully pulled the latest version from Docker Hub.

### Step 8: Pulling Image via Docker API
The same image was pulled using REST API:
- curl --unix-socket /var/run/docker.sock \
- -X POST "http://localhost/v1.52/images/create?fromImage=nginx&tag=latest"
This confirmed Docker Engine API supports image operations.

### Step 9: Creating an Nginx Container
A new container was created using:
- docker create --name mynginx -p 8080:80 nginx
This created the container successfully with port mapping:
- Host Port: 8080
- Container Port: 80

## Observations
- Docker Desktop provides a complete container runtime on macOS.
- Docker Engine can be accessed through CLI as well as REST API.
- Unix socket communication confirms daemon-level connectivity.
- Images can be pulled both via Docker CLI and API.
- Nginx deployment demonstrates container-based web server hosting.

## Screenshots
<img width="1440" height="376" alt="Screenshot 2026-02-03 at 3 44 30 PM" src="https://github.com/user-attachments/assets/6b991a50-4da9-4d64-9eed-03b167cd2c1e" />
<img width="1440" height="900" alt="Screenshot 2026-02-03 at 3 41 58 PM" src="https://github.com/user-attachments/assets/87cd3940-d230-4d6a-887e-481ee2e6eeaa" />
<img width="1440" height="900" alt="Screenshot 2026-02-03 at 3 41 40 PM" src="https://github.com/user-attachments/assets/b70ee0f8-21f1-46ff-a383-d1ab0ca011b3" />
<img width="1437" height="566" alt="Screenshot 2026-02-03 at 3 41 35 PM" src="https://github.com/user-attachments/assets/0aeb0636-5fc1-4f1a-bb18-f3cc19d56851" />
<img width="1440" height="157" alt="Screenshot 2026-02-03 at 3 39 26 PM" src="https://github.com/user-attachments/assets/859bdb9c-2f6c-49d4-a5a4-9450a4852cb3" />
<img width="1440" height="900" alt="Screenshot 2026-02-03 at 3 37 21 PM" src="https://github.com/user-attachments/assets/e9327aef-e422-4fc2-b16a-9b343105810b" />
<img width="1440" height="900" alt="Screenshot 2026-02-03 at 3 37 16 PM" src="https://github.com/user-attachments/assets/1cda4756-ee8f-421b-9b1b-7f4d8857aea5" />
<img width="1440" height="900" alt="Screenshot 2026-02-03 at 3 37 01 PM" src="https://github.com/user-attachments/assets/e4de1ad4-0ba2-4323-a423-b67d108640f4" />

All important screenshots of the practical are attached in this repository, including:
- Docker Desktop startup
- Docker info verification
- Docker daemon socket test
- Docker REST API ping response
- Container listing using curl API
- Pulling Nginx image successfully
- Creating Nginx container with port mapping

## Result
This practical successfully demonstrated:
- Docker installation and verification on macOS ARM64
- Docker Engine communication through Unix socket
- Docker REST API testing using curl
- Pulling and deploying Nginx container
- Basic container management and lifecycle operations

## Conclusion
Docker provides a powerful platform for containerized deployment.
Through this practical, I learned how to:
- Validate Docker setup
- Interact with Docker daemon using CLI and REST API
- Pull and manage images
- Create containers and deploy real applications like Nginx
- This experiment strengthened my understanding of real-world DevOps container workflows.
