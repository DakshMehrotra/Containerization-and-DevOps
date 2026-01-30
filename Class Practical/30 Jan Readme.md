## Docker Java Application Build, Export, and Push to Docker Hub

---

## Aim

The objective is : 

- Verify Docker installation and working environment
- Run basic Docker containers successfully
- Create a custom Java application inside a Docker container
- Build Docker images using Dockerfile automation
- Tag, push, export, load, and manage Docker images
- Upload the final image to Docker Hub repository

---

## Software and Tools Used

- Operating System: macOS (Apple Silicon ARM64)
- Docker Desktop Version: 4.57.0
- Docker Engine Version: 29.1.3
- Base Image Used: Ubuntu 22.04
- Programming Language: Java
- Java Version Installed: OpenJDK 17
- Repository Platform: Docker Hub

---

## Workflow

---

## Step 1: Starting Docker Desktop and Verifying Setup

Docker Desktop was launched using:

open -a Docker

Docker installation was verified using:

docker version
docker info

This confirmed that both client and server were running correctly.

## Step 2: Running a Sample Docker Container
A sample container was executed to ensure Docker works properly:
docker run hello-world
The successful output confirmed that Docker can pull and run images correctly.

## Step 3: Pulling and Running Ubuntu Container
Ubuntu was pulled from Docker Hub:
docker pull ubuntu

A container was started interactively:

docker run -it ubuntu bash
This created a working Linux environment inside Docker.

## Step 4: Installing Java Inside Ubuntu Container
Inside the running container, system packages were updated:
apt update

OpenJDK 17 was installed:
apt install -y openjdk-17-jdk
This prepared the container for running Java applications.

## Step 5: Creating and Running Java Program
A Java file HelloWorld.java was created inside the container:

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World from Java in Docker on WSL!");
    }
}

The program was compiled and executed:

javac HelloWorld.java
java HelloWorld
Output was successfully displayed inside the container.

## Step 6: Building Custom Docker Image Using Dockerfile
A Dockerfile was created for automation:

FROM ubuntu:22.04

RUN apt update && apt install -y openjdk-17-jdk

WORKDIR /home/app

COPY Hello.java .

RUN javac Hello.java

CMD ["java", "Hello"]

The Docker image was built using:

docker build -t java-app:1.0 .
The image was listed using:
docker images

## Step 7: Managing Docker Images and Containers
All running and stopped containers were checked:
docker ps -a

Unused images were removed using:
docker rmi <image-id>

Stopped containers were removed using:
docker rm <container-id>

## Step 8: Exporting Image as TAR File
The Docker image was saved as a tar archive:
docker save -o java-app.tar myrepo/java-img

File size and details were verified:
stat java-app.tar
du -h java-app.tar

## Step 9: Loading Image Back from TAR Archive
The image was loaded back using:
docker load -i java-app.tar

This confirmed portability of Docker images.

## Step 10: Docker Hub Authentication and Token Setup
Docker Hub Personal Access Token was generated from:
Docker Hub Dashboard
Settings → Personal Access Tokens

Docker login was performed:
docker login -u daksh24

Authentication succeeded using token-based login.

## Step 11: Tagging and Pushing Image to Docker Hub
The image was tagged before pushing:
docker tag java-app:1.0 daksh24/java-app:1.0

The image was pushed successfully:
docker push daksh24/java-app:1.0

Docker Hub repository upload was confirmed.

## Observations
- Docker containers provide isolated environments for development.
- Java applications can be fully containerized using Dockerfiles.
- Docker images can be exported and transferred using tar archives.
- Docker Hub allows cloud storage and sharing of container images.
- Personal Access Tokens are required for secure authentication.

## Screenshots : 
All important screenshots of the following steps are attached in the repository:
- Docker installation verification
- Running hello-world container
- Ubuntu container execution
- Java installation inside container
- Java program compilation and output
- Dockerfile creation in VS Code
- Image build and versioning
- Exporting and importing tar archive
- Docker Hub login and token creation
- Successful image push to Docker Hub

<img width="1440" height="900" alt="Screenshot 2026-01-30 at 12 19 41 PM" src="https://github.com/user-attachments/assets/d4a30f83-741a-4964-9dee-62c2ad79ee69" />
<img width="1440" height="900" alt="Screenshot 2026-01-30 at 12 19 45 PM" src="https://github.com/user-attachments/assets/8ed7ea0c-6c90-4a5d-850e-f30d8f6fa3b7" />
<img width="1440" height="514" alt="Screenshot 2026-01-30 at 12 33 08 PM" src="https://github.com/user-attachments/assets/eb4c0bb6-31bb-4af3-bc4d-21bd78f66b9e" />
<img width="1440" height="817" alt="Screenshot 2026-01-30 at 12 38 43 PM" src="https://github.com/user-attachments/assets/411fcbb8-39b9-438b-8f9f-6701dc6395ac" />
<img width="1440" height="900" alt="Screenshot 2026-01-30 at 12 38 56 PM" src="https://github.com/user-attachments/assets/03c3b6f2-c56d-4bfe-84b7-0b225959cf51" />
<img width="1440" height="826" alt="Screenshot 2026-01-30 at 12 39 44 PM" src="https://github.com/user-attachments/assets/bb727008-7cba-4afc-927a-64b3cd6bffba" />
<img width="1437" height="821" alt="Screenshot 2026-01-30 at 12 40 59 PM" src="https://github.com/user-attachments/assets/8b13a40a-c9e3-4290-af83-ec8e0df26862" />
<img width="1440" height="624" alt="Screenshot 2026-01-30 at 12 58 44 PM" src="https://github.com/user-attachments/assets/8fc83557-4f0f-4782-93c0-1c4ce04e8a06" />
<img width="1440" height="185" alt="Screenshot 2026-01-30 at 2 39 29 PM" src="https://github.com/user-attachments/assets/5d48f69c-dd79-42f4-9b60-8459eee9286a" />

## Result
This successfully demonstrated:
Docker setup and execution on macOS
Running containers and managing images
Containerizing Java applications using Dockerfile
Exporting and importing Docker images
Uploading custom Docker image to Docker Hub

## Conclusion
Docker provides an efficient and scalable solution for application deployment.
Through this work, I learned the complete lifecycle of Docker containers including building, running, saving, loading, tagging, and pushing images to Docker Hub. This experiment helped me understand real-world DevOps and containerization practices.


